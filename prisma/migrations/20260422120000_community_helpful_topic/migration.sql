-- AlterTable
ALTER TABLE "CommunityQuestion" ADD COLUMN "topic" TEXT;
ALTER TABLE "CommunityQuestion" ADD COLUMN "helpfulCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "CommunityQuestion_topic_idx" ON "CommunityQuestion"("topic");
