/*
  Warnings:

  - A unique constraint covering the columns `[nim]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `passwordHash` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `nim` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "passwordHash" TEXT NOT NULL,
ALTER COLUMN "nim" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_nim_key" ON "users"("nim");
