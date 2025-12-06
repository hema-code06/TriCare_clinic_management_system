import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import config from "../config/dotenv.js";

const users = [
  {
    username: "admin",
    password: bcrypt.hashSync("password", 10),
    role: "admin",
  },
  {
    username: "doctor",
    password: bcrypt.hashSync("password", 10),
    role: "doctor",
  },
];

export const initializeUsers = async () => {
  const count = await User.countDocuments();
  if (count === 0) {
    await User.insertMany(users);
    console.log("Default admin and doctor initialized.");
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token, role: user.role });
};
