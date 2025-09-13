"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    // NSE/BSE sample stocks (10 each per sector)
    const stocks = [
        // Pharma
        { symbol: "SUNPHARMA", name: "Sun Pharmaceutical", currentPrice: 1250, type: "Pharma" },
        { symbol: "CIPLA", name: "Cipla Ltd", currentPrice: 1250, type: "Pharma" },
        { symbol: "DRREDDY", name: "Dr. Reddy's Labs", currentPrice: 6400, type: "Pharma" },
        { symbol: "AUROPHARMA", name: "Aurobindo Pharma", currentPrice: 1000, type: "Pharma" },
        { symbol: "DIVISLAB", name: "Divi's Laboratories", currentPrice: 3600, type: "Pharma" },
        { symbol: "LUPIN", name: "Lupin Ltd", currentPrice: 1150, type: "Pharma" },
        { symbol: "ALKEM", name: "Alkem Laboratories", currentPrice: 3700, type: "Pharma" },
        { symbol: "BIOCON", name: "Biocon Ltd", currentPrice: 285, type: "Pharma" },
        { symbol: "ZYDUSLIFE", name: "Zydus Lifesciences", currentPrice: 650, type: "Pharma" },
        { symbol: "GLENMARK", name: "Glenmark Pharma", currentPrice: 900, type: "Pharma" },
        // Tech
        { symbol: "TCS", name: "Tata Consultancy Services", currentPrice: 3800, type: "Tech" },
        { symbol: "INFY", name: "Infosys Ltd", currentPrice: 1500, type: "Tech" },
        { symbol: "WIPRO", name: "Wipro Ltd", currentPrice: 470, type: "Tech" },
        { symbol: "HCLTECH", name: "HCL Technologies", currentPrice: 1600, type: "Tech" },
        { symbol: "TECHM", name: "Tech Mahindra", currentPrice: 1450, type: "Tech" },
        { symbol: "LTIM", name: "LTIMindtree", currentPrice: 5800, type: "Tech" },
        { symbol: "MPHASIS", name: "Mphasis Ltd", currentPrice: 2500, type: "Tech" },
        { symbol: "COFORGE", name: "Coforge Ltd", currentPrice: 6200, type: "Tech" },
        { symbol: "PERSISTENT", name: "Persistent Systems", currentPrice: 5600, type: "Tech" },
        { symbol: "KPITTECH", name: "KPIT Technologies", currentPrice: 1500, type: "Tech" },
        // Infra
        { symbol: "L&T", name: "Larsen & Toubro", currentPrice: 3600, type: "Infra" },
        { symbol: "ADANIPORTS", name: "Adani Ports", currentPrice: 1300, type: "Infra" },
        { symbol: "GMRINFRA", name: "GMR Airports Infra", currentPrice: 70, type: "Infra" },
        { symbol: "IRB", name: "IRB Infrastructure", currentPrice: 80, type: "Infra" },
        { symbol: "NBCC", name: "NBCC (India)", currentPrice: 130, type: "Infra" },
        { symbol: "NCC", name: "NCC Ltd", currentPrice: 200, type: "Infra" },
        { symbol: "PNCINFRA", name: "PNC Infratech", currentPrice: 400, type: "Infra" },
        { symbol: "DILIPBUILD", name: "Dilip Buildcon", currentPrice: 300, type: "Infra" },
        { symbol: "JKIL", name: "J Kumar Infraprojects", currentPrice: 500, type: "Infra" },
        { symbol: "GRINFRA", name: "G R Infraprojects", currentPrice: 1300, type: "Infra" },
        // Finance
        { symbol: "HDFCBANK", name: "HDFC Bank", currentPrice: 1700, type: "Finance" },
        { symbol: "ICICIBANK", name: "ICICI Bank", currentPrice: 1100, type: "Finance" },
        { symbol: "SBIN", name: "State Bank of India", currentPrice: 800, type: "Finance" },
        { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", currentPrice: 1900, type: "Finance" },
        { symbol: "AXISBANK", name: "Axis Bank", currentPrice: 1200, type: "Finance" },
        { symbol: "BAJFINANCE", name: "Bajaj Finance", currentPrice: 7500, type: "Finance" },
        { symbol: "HDFCLIFE", name: "HDFC Life Insurance", currentPrice: 600, type: "Finance" },
        { symbol: "ICICIPRULI", name: "ICICI Prudential Life", currentPrice: 550, type: "Finance" },
        { symbol: "MUTHOOTFIN", name: "Muthoot Finance", currentPrice: 1300, type: "Finance" },
        { symbol: "PFC", name: "Power Finance Corp", currentPrice: 400, type: "Finance" },
    ];
    for (const stock of stocks) {
        await prisma.masterStocks.upsert({
            where: { symbol: stock.symbol },
            update: {}, // skip update if exists
            create: {
                ...stock,
                priceHistory: [stock.currentPrice],
            },
        });
    }
    console.log("✅ NSE/BSE stocks seeded successfully!");
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map