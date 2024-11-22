-- CreateTable
CREATE TABLE "Filiais" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,

    CONSTRAINT "Filiais_pkey" PRIMARY KEY ("id")
);
