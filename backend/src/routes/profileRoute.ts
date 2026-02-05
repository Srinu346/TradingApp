import { Router } from "express";
import prismaClient from "../db/prisma";

const router = Router();

router.get("/balance", async (req, res) => {
    const username = req.query.username as string;
    if (!username) return res.status(400).json({ message: "Username is required" });

    const user = await prismaClient.user.findUnique({
        where: { username },
    });
    if (!user) return res.status(401).json({ message: "User not found" });
    return res.json({ balance: user.balance });
});

export default router;