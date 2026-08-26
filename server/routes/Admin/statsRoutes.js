import express from "express";
import Doctor from "../../models/Admin/Doctor.js";
import Inventory from "../../models/Admin/Inventory.js";
import Roles from "../../models/Admin/Roles.js";
import Maintenance from "../../models/Admin/maintenance.js";
import FixAppointment from "../../models/Doctor/FixAppointment.js";
import Patient from "../../models/Patient/Register.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const [doctors, inventory, maintenance, user, appointments, patients] =
            await Promise.all([
                Doctor.countDocuments(),
                Inventory.countDocuments(),
                Maintenance.countDocuments(),
                Roles.countDocuments(),
                FixAppointment.countDocuments(),
                Patient.countDocuments(),
            ]);

        res.status(200).json({ doctors, inventory, maintenance, user, appointments, patients });
    } catch (error) {
        res.status(500).json({ message: "Error fetching stats", error: error.message });
    }
});

router.get("/weekly-appointments", async (req, res) => {
    try {
        const startOfWeek = new Date();
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 5);

        const results = await FixAppointment.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfWeek, $lt: endOfWeek },
                },
            },
            {
                $group: {
                    _id: { $dayOfWeek: "$createdAt" },
                    count: { $sum: 1 },
                },
            },
        ]);

        const dayMap = { 2: "Monday", 3: "Tuesday", 4: "Wednesday", 5: "Thursday", 6: "Friday" };
        const weeklyData = Object.values(dayMap).map((day) => ({ date: day, value: 0 }));

        results.forEach((r) => {
            const dayName = dayMap[r._id];
            if (dayName) {
                const entry = weeklyData.find((d) => d.date === dayName);
                if (entry) entry.value = r.count;
            }
        });

        res.status(200).json(weeklyData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching weekly appointments", error: error.message });
    }
});

export default router;