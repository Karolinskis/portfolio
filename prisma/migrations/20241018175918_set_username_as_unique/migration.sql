/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Leaderboard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Leaderboard_username_key" ON "Leaderboard"("username");
