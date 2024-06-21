-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "clave" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email" (
    "id" SERIAL NOT NULL,
    "remitente_id" INTEGER NOT NULL,
    "destinatario_id" INTEGER NOT NULL,
    "asunto" TEXT NOT NULL,
    "cuerpo" TEXT NOT NULL,
    "es_favorita" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bloqueados" (
    "usuario_id" SERIAL NOT NULL,
    "direccion_bloqueada" TEXT NOT NULL,

    CONSTRAINT "Bloqueados_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
