/*
  Warnings:

  - The primary key for the `Favoritos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `direccion_favoritos` on the `Favoritos` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `Favoritos` table. All the data in the column will be lost.
  - Added the required column `direccion_favorita` to the `Favoritos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `direccion_usuario` to the `Favoritos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario` to the `Favoritos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favoritos" DROP CONSTRAINT "Favoritos_pkey",
DROP COLUMN "direccion_favoritos",
DROP COLUMN "usuario_id",
ADD COLUMN     "direccion_favorita" TEXT NOT NULL,
ADD COLUMN     "direccion_usuario" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "usuario" INTEGER NOT NULL,
ADD CONSTRAINT "Favoritos_pkey" PRIMARY KEY ("id");
