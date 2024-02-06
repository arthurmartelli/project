/*
  Warnings:

  - You are about to drop the column `addressId` on the `Client` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clientId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_addressId_fkey";

-- DropIndex
DROP INDEX "Address_line1_city_state_country_zip_idx";

-- DropIndex
DROP INDEX "Client_addressId_key";

-- DropIndex
DROP INDEX "Client_name_email_phone_idx";

-- DropIndex
DROP INDEX "Receipt_id_notes_createdAt_idx";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "clientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "addressId";

-- CreateIndex
CREATE UNIQUE INDEX "Address_clientId_key" ON "Address"("clientId");

-- CreateIndex
CREATE INDEX "Address_line1_idx" ON "Address"("line1");

-- CreateIndex
CREATE INDEX "Address_city_idx" ON "Address"("city");

-- CreateIndex
CREATE INDEX "Address_state_idx" ON "Address"("state");

-- CreateIndex
CREATE INDEX "Address_country_idx" ON "Address"("country");

-- CreateIndex
CREATE INDEX "Address_zip_idx" ON "Address"("zip");

-- CreateIndex
CREATE INDEX "Client_name_idx" ON "Client"("name");

-- CreateIndex
CREATE INDEX "Client_phone_idx" ON "Client"("phone");

-- CreateIndex
CREATE INDEX "Client_email_idx" ON "Client"("email");

-- CreateIndex
CREATE INDEX "Receipt_notes_idx" ON "Receipt"("notes");

-- CreateIndex
CREATE INDEX "Receipt_discount_idx" ON "Receipt"("discount");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
