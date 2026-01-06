import jwt from "jsonwebtoken";

export function requirePageUser(req, res, next) {
  const token = req.cookies?.studyhall_token;
  if (!token) {
    return res.redirect("/login");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    return next();
  } catch {

    res.clearCookie("studyhall_token");
    return res.redirect("/login");
  }
}