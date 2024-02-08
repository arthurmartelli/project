-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Receipt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientId" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "notes" TEXT,
    "discount" REAL NOT NULL,
    "discount_type" TEXT NOT NULL,
    "taxes" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Receipt_clientId_clientEmail_fkey" FOREIGN KEY ("clientId", "clientEmail") REFERENCES "Client" ("id", "email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Receipt" ("clientEmail", "clientId", "createdAt", "discount", "discount_type", "id", "notes", "taxes", "updatedAt") SELECT "clientEmail", "clientId", "createdAt", "discount", "discount_type", "id", "notes", "taxes", "updatedAt" FROM "Receipt";
DROP TABLE "Receipt";
ALTER TABLE "new_Receipt" RENAME TO "Receipt";
CREATE INDEX "Receipt_notes_idx" ON "Receipt"("notes");
CREATE INDEX "Receipt_discount_idx" ON "Receipt"("discount");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
