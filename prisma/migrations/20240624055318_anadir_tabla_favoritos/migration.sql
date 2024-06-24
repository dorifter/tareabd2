-- CreateTable
CREATE TABLE "Favoritos" (
    "usuario_id" SERIAL NOT NULL,
    "direccion_favoritos" TEXT NOT NULL,

    CONSTRAINT "Favoritos_pkey" PRIMARY KEY ("usuario_id")
);
