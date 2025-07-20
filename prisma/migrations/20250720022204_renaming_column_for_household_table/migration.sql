/*
  Warnings:

  - You are about to drop the column `family_name` on the `households` table. All the data in the column will be lost.
  - Added the required column `household_name` to the `households` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "households" DROP COLUMN "family_name",
ADD COLUMN     "household_name" TEXT NOT NULL;
