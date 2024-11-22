-- AlterTable
ALTER TABLE "Filiais" ADD COLUMN     "bairro" TEXT,
ADD COLUMN     "cidade" TEXT,
ADD COLUMN     "estado" TEXT,
ADD COLUMN     "nomeDoLogradouro" TEXT,
ADD COLUMN     "pais" TEXT DEFAULT 'Brasil';
