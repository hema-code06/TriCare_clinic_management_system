import jwt from "jsonwebtoken";
import config from "../config/dotenv.js";

export const authenticatePatient = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    if (decoded.role !== "patient") {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.patient = decoded; // { patientId, role }
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};