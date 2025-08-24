import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  try {
    // Get token from either cookie or Authorization header
    let token = req.cookies?.token;

    if (!token && req.headers.authorization) {
      // Example: "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user id to request
    req.userId = decoded.id;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
