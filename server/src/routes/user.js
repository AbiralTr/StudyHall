import express from "express";
import { prisma } from "../db.js";
import { requireUser } from "../middleware/requireUser.js";

const router = express.Router();

router.get("/me", requireUser, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: {
      id: true,
      email: true,
      username: true
    },
  });

  if (!user) return res.status(401).json({ error: "Not logged in" });


  return res.json({ user: { ...user,} });
});


export default router;