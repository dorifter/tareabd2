/*
  Warnings:

  - The primary key for the `Bloqueados` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `usuario_id` on the `Bloqueados` table. All the data in the column will be lost.
  - Added the required column `direccion_usuario` to the `Bloqueados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario` to the `Bloqueados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bloqueados" DROP CONSTRAINT "Bloqueados_pkey",
DROP COLUMN "usuario_id",
ADD COLUMN     "direccion_usuario" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "usuario" INTEGER NOT NULL,
ADD CONSTRAINT "Bloqueados_pkey" PRIMARY KEY ("id");
