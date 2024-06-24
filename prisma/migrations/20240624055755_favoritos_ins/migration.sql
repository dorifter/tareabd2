/*
  Warnings:

  - Changed the type of `direccion_favoritos` on the `Favoritos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Favoritos" DROP COLUMN "direccion_favoritos",
ADD COLUMN     "direccion_favoritos" INTEGER NOT NULL;
