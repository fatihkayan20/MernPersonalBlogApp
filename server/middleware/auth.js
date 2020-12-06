import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ error: "No token" });
  }

  try {
    const decoded = jwt.verify(token, "sl_myJwtSecret");
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).json({ error: "Token is not valid" });
  }
}
