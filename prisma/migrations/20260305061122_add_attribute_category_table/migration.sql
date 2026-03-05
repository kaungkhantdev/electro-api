/*
  Warnings:

  - You are about to drop the column `is_active` on the `categories` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CategoryStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DRAFT');

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "is_active",
ADD COLUMN     "is_featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "CategoryStatus" NOT NULL DEFAULT 'ACTIVE';
