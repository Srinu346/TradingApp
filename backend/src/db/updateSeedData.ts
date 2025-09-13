import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Same helper function for generating 7-day OHLC history
function generatePriceHistory(currentPrice: number) {
  const history = [];
  let prevClose = currentPrice;

  for (let i = 0; i < 7; i++) {
    const open = +(prevClose + (Math.random() - 0.5) * 20).toFixed(2);
    const high = +(open + Math.random() * 10).toFixed(2);
    const low = +(open - Math.random() * 10).toFixed(2);
    const close = +(low + Math.random() * (high - low)).toFixed(2);

    const day = new Date();
    day.setDate(day.getDate() - (6 - i));
    const time = day.toISOString().split("T")[0];

    history.push({ time, open, high, low, close });
    prevClose = close;
  }

  return history;
}

async function main() {
  const stocks = await prisma.masterStocks.findMany();

  for (const stock of stocks) {
    await prisma.masterStocks.update({
      where: { id: stock.id },
      data: {
        priceHistory: generatePriceHistory(stock.currentPrice),
      },
    });
    console.log(`✅ Updated priceHistory for ${stock.symbol}`);
  }

  console.log("All stocks updated!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
