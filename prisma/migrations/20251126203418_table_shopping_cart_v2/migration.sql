/*
  Warnings:

  - You are about to drop the column `condition` on the `shopping_cart` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `shopping_cart` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `shopping_cart` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `shopping_cart` table. All the data in the column will be lost.
  - You are about to drop the column `seller` on the `shopping_cart` table. All the data in the column will be lost.
  - Added the required column `productId` to the `shopping_cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE shopping_cart_id_seq;
ALTER TABLE "shopping_cart" DROP COLUMN "condition",
DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "seller",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "id" SET DEFAULT nextval('shopping_cart_id_seq');
ALTER SEQUENCE shopping_cart_id_seq OWNED BY "shopping_cart"."id";

-- AddForeignKey
ALTER TABLE "shopping_cart" ADD CONSTRAINT "shopping_cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
