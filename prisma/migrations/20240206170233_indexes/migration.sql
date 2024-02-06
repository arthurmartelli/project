/*
  Warnings:

  - The `receiptId` column on the `Items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Receipt` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Receipt` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_receiptId_fkey";

-- AlterTable
ALTER TABLE "Items" DROP COLUMN "receiptId",
ADD COLUMN     "receiptId" INTEGER;

-- AlterTable
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "Receipt"("id") ON DELETE SET NULL ON UPDATE CASCADE;
