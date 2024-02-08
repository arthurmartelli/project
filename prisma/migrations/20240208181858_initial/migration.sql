-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "address_line1" TEXT NOT NULL,
    "address_line2" TEXT,
    "address_city" TEXT NOT NULL,
    "address_state" TEXT NOT NULL,
    "address_country" TEXT NOT NULL,
    "address_zip" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Receipt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientId" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "discount" REAL NOT NULL,
    "discount_type" TEXT NOT NULL,
    "taxes" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Receipt_clientId_clientEmail_fkey" FOREIGN KEY ("clientId", "clientEmail") REFERENCES "Client" ("id", "email") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "receiptId" INTEGER,
    "category" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "discount" REAL NOT NULL,
    "discountType" TEXT NOT NULL,
    CONSTRAINT "Items_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "Receipt" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE INDEX "Client_name_idx" ON "Client"("name");

-- CreateIndex
CREATE INDEX "Client_phone_idx" ON "Client"("phone");

-- CreateIndex
CREATE INDEX "Client_email_idx" ON "Client"("email");

-- CreateIndex
CREATE INDEX "Client_address_line1_idx" ON "Client"("address_line1");

-- CreateIndex
CREATE INDEX "Client_address_zip_idx" ON "Client"("address_zip");

-- CreateIndex
CREATE UNIQUE INDEX "Client_id_email_key" ON "Client"("id", "email");

-- CreateIndex
CREATE INDEX "Receipt_notes_idx" ON "Receipt"("notes");

-- CreateIndex
CREATE INDEX "Receipt_discount_idx" ON "Receipt"("discount");
