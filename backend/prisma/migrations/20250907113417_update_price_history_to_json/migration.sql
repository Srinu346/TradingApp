/*
  Warnings:

  - You are about to drop the column `priceHistoryJson` on the `MasterStocks` table. All the data in the column will be lost.
  - The `priceHistory` column on the `MasterStocks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."MasterStocks" DROP COLUMN "priceHistoryJson",
DROP COLUMN "priceHistory",
ADD COLUMN     "priceHistory" JSONB DEFAULT '[]';
