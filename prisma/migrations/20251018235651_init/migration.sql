-- CreateTable
CREATE TABLE "GasExchange" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" REAL NOT NULL,
    "local_compra" TEXT NOT NULL,
    "telefone_contato" TEXT NOT NULL,
    "observacao" TEXT,
    "custo_total" REAL NOT NULL DEFAULT 0
);
