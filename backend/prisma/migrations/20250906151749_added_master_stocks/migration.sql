-- CreateTable
CREATE TABLE "public"."Stocks" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avgprice" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MasterStocks" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "currentPrice" DOUBLE PRECISION NOT NULL,
    "priceHistory" DOUBLE PRECISION[],
    "type" TEXT NOT NULL,

    CONSTRAINT "MasterStocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MasterStocks_symbol_key" ON "public"."MasterStocks"("symbol");

-- AddForeignKey
ALTER TABLE "public"."Stocks" ADD CONSTRAINT "Stocks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("username") ON DELETE CASCADE ON UPDATE CASCADE;
