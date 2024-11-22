/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Filiais` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Filiais" ADD COLUMN     "dataCadastro" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Filiais_codigo_key" ON "Filiais"("codigo");
