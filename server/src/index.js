import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { prisma } from "./db.js";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import {requirePageUser} from "./middleware/requirePageUser.js";
import friendsRouter from "./routes/friends.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(process.cwd(), "views"));

app.use(express.static("public"));
app.use(express.json()); 
app.use(cookieParser()); 

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use(friendsRouter);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to StudyHall API, please use the /home endpoint to access the web app.");
});

app.get("/home", requirePageUser, async (req, res) => { 
  const meId = req.userId;
  const users = await prisma.friendship.findMany({
    where: {
      status: "ACCEPTED",
      OR: [{ requesterId: meId }, { addresseeId: meId }],
    },
    include: {
      requester: { select: { id: true, username: true } },
      addressee: { select: { id: true, username: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  const friendships = users.map(f => ({
    ...f,
    otherUser: f.requesterId === meId ? f.addressee : f.requester,
  }));

  res.render("home", { friendships });
});

app.get("/register", (req, res) => {
  res.render("register", { hideNav: true });
});

app.get("/login", (req, res) => {
  res.render("login", { hideNav: true });
});



app.listen(PORT, () => console.log("StudyHall listening on", PORT));