-- AlterTable
ALTER TABLE "public"."MasterStocks" ADD COLUMN     "priceHistoryJson" JSONB DEFAULT '[]';
