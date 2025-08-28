import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signCookie = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  const isProd = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd ? true : false,
    // Use None for cross-site requests from frontend (different port)
    sameSite: isProd ? "none" : "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  return token;
};

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already in use" });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });
  const token = signCookie(res, user._id);
  res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });

  const token = signCookie(res, user._id);
  res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
};

export const me = async (req, res) => {
  const user = await User.findById(req.userId).select("name email");
  res.json({ user });
};

export const logout = async (_req, res) => {
  const isProd = process.env.NODE_ENV === "production";
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: isProd ? "none" : "none",
    secure: isProd ? true : false
  });
  res.json({ message: "Logged out" });
};
