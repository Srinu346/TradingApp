-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT 'User',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT 'User';
