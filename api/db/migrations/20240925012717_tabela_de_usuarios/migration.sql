-- CreateTable
CREATE TABLE "Usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "ativo" BOOLEAN DEFAULT true,
    "endereco" TEXT,
    "foto" BYTEA,
    "cabecalhoBase64Foto" TEXT,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);
