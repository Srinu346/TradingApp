import prismaClient from "../db/prisma";
import { Router } from "express";

const purchaseRouter = Router();

purchaseRouter.post("/buy", async (req, res) => {
    const { username, quantity, currentPrice, symbol, name } = req.body;
    const qty = parseInt(quantity);
    const price = parseFloat(currentPrice);
    const totalAmount = qty * price;

    try {
        const user = await prismaClient.user.findFirst({
            where: { username },
            include: { stocks: { where: { symbol } } }
        });

        if (!user) return res.status(401).json({ message: "User not found" });
        if (totalAmount > user.balance) return res.status(402).json({ message: "Insufficient Balance" });

        await prismaClient.$transaction(async (prisma) => {
            // Deduct balance
            await prisma.user.update({
                where: { username },
                data: { balance: user.balance - totalAmount }
            });

            if (user.stocks.length > 0) {
                const stock = user.stocks[0];
                if (stock) await prisma.stocks.update({
                    where: { id: stock.id },
                    data: {
                        quantity: stock.quantity + qty,
                        avgprice: (stock.quantity * stock.avgprice + totalAmount) / (stock.quantity + qty)
                    }
                });
            } else {
                await prisma.stocks.create({
                    data: {
                        userId: user.username,
                        symbol,
                        name,
                        quantity: qty,
                        avgprice: price
                    }
                });
            }
        });

        return res.json({ message: "Stock purchased successfully!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

purchaseRouter.post("/sell", async (req, res) => {
    const { username, quantity, sellPrice, symbol } = req.body;
    const qty = parseFloat(quantity);
    const price = parseFloat(sellPrice);
    const totalAmount: number = qty * price;

    try {
        const user = await prismaClient.user.findUnique({
            where: { username },
            include: {
                stocks: {
                    where: { symbol }
                }
            }
        });

        if (!user) return res.status(401).json({ message: "User not found" });

        const stock = user.stocks[0];
        if (!stock || stock.quantity < qty) {
            return res.status(402).json({ message: "Insufficient Stocks" });
        }

        await prismaClient.$transaction(async (prisma) => {
            // Update user's balance
            await prisma.user.update({
                where: { username },
                data: { balance: user.balance + totalAmount }
            });

            if (qty === stock.quantity) {
                // Sold all stocks → delete record
                await prisma.stocks.delete({
                    where: { id: stock.id }
                });
            } else {
                // Sold partial → update quantity
                await prisma.stocks.update({
                    where: { id: stock.id },
                    data: { quantity: stock.quantity - qty }
                });
            }
        });

        return res.json({ message: "Stock sold successfully!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});


export default purchaseRouter;
