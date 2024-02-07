/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address_city` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_country` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_line1` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_state` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_zip` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_clientId_fkey";

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "address_city" VARCHAR(255) NOT NULL,
ADD COLUMN     "address_country" VARCHAR(255) NOT NULL,
ADD COLUMN     "address_line1" VARCHAR(255) NOT NULL,
ADD COLUMN     "address_line2" TEXT,
ADD COLUMN     "address_state" VARCHAR(255) NOT NULL,
ADD COLUMN     "address_zip" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "Address";

-- CreateIndex
CREATE INDEX "Client_address_line1_idx" ON "Client"("address_line1");

-- CreateIndex
CREATE INDEX "Client_address_zip_idx" ON "Client"("address_zip");
