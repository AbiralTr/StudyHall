import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

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


app.get("/home", requirePageUser, (req, res) => res.render("home"));

app.get("/register", (req, res) => res.render("register"));

app.get("/login", (req, res) => res.render("login"));


app.listen(PORT, () => console.log("StudyHall listening on", PORT));