import prismaClient from "../db/prisma";
import { Router } from "express";

const purchaseRouter = Router();

purchaseRouter.post("/buy", async (req, res) => {
    console.log("Step 1: Received /buy request");
    console.log("Request body:", req.body);

    const { username, quantity, buyPrice, symbol, name } = req.body;
    const qty = parseInt(quantity);
    const price = parseFloat(buyPrice);
    const totalAmount = qty * price;

    console.log("Step 2: Parsed values - qty:", qty, "price:", price, "totalAmount:", totalAmount);

    try {
        console.log("Step 3: Finding user:", username);
        const user = await prismaClient.user.findFirst({
            where: { username },
            include: { stocks: { where: { symbol } } }
        });
        console.log("Step 4: User found:", user ? "Yes" : "No", user?.balance);

        if (!user) return res.status(401).json({ message: "User not found" });
        if (totalAmount > user.balance) {
            console.log("Step 5: Insufficient balance - needed:", totalAmount, "have:", user.balance);
            return res.status(402).json({ message: "Insufficient Balance" });
        }

        console.log("Step 5: Starting transaction");
        await prismaClient.$transaction(async (prisma) => {
            console.log("Step 6: Deducting balance");
            await prisma.user.update({
                where: { username },
                data: { balance: user.balance - totalAmount }
            });

            if (user.stocks.length > 0) {
                const stock = user.stocks[0];
                console.log("Step 7: Updating existing stock holding");
                if (stock) await prisma.stocks.update({
                    where: { id: stock.id },
                    data: {
                        quantity: stock.quantity + qty,
                        avgprice: (stock.quantity * stock.avgprice + totalAmount) / (stock.quantity + qty)
                    }
                });
            } else {
                console.log("Step 7: Creating new stock holding");
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

            // Create order record for transaction history
            console.log("Step 8: Creating order record");
            await prisma.orders.create({
                data: {
                    userId: username,
                    symbol,
                    name,
                    quantity: qty,
                    price,
                    type: "BUY"
                }
            });
        });

        console.log("Step 8: Transaction completed successfully");
        return res.json({ message: "Stock purchased successfully!" });
    } catch (err) {
        console.error("Error at some step:", err);
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

            // Create order record for transaction history
            await prisma.orders.create({
                data: {
                    userId: username,
                    symbol,
                    name: stock.name,
                    quantity: qty,
                    price,
                    type: "SELL"
                }
            });
        });

        return res.json({ message: "Stock sold successfully!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

// Get user's order history
purchaseRouter.post("/orders", async (req, res) => {
    const { username } = req.body;

    try {
        const orders = await prismaClient.orders.findMany({
            where: { userId: username },
            orderBy: { createdAt: "desc" }
        });

        return res.json({ orders });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to fetch orders" });
    }
});


export default purchaseRouter;
