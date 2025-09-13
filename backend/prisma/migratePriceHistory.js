"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../src/db/prisma")); // adjust path to your prisma client
async function migratePriceHistory() {
    const stocks = await prisma_1.default.masterStocks.findMany();
    for (const stock of stocks) {
        const oldPrices = stock.priceHistory;
        if (!oldPrices || oldPrices.length === 0)
            continue;
        const priceHistoryJson = oldPrices.map((price, index) => ({
            time: `2025-08-${22 + index}`, // adjust date logic as needed
            open: price,
            high: price + 2,
            low: price - 2,
            close: price,
        }));
        await prisma_1.default.masterStocks.update({
            where: { id: stock.id },
            data: { priceHistoryJson },
        });
    }
    console.log("Migration done!");
    process.exit(0);
}
migratePriceHistory().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=migratePriceHistory.js.map