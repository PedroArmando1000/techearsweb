-- CreateTable
CREATE TABLE "Funcionarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "altura" DOUBLE PRECISION NOT NULL,
    "sexo" TEXT NOT NULL,

    CONSTRAINT "Funcionarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Funcionarios_rg_key" ON "Funcionarios"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionarios_cpf_key" ON "Funcionarios"("cpf");
