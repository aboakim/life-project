-- CreateTable
CREATE TABLE "DecisionReminderSubscriber" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "locale" TEXT,
    "nextNudgeAt" TIMESTAMP(3),

    CONSTRAINT "DecisionReminderSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DecisionReminderSubscriber_email_key" ON "DecisionReminderSubscriber"("email");

-- CreateIndex
CREATE INDEX "DecisionReminderSubscriber_nextNudgeAt_idx" ON "DecisionReminderSubscriber"("nextNudgeAt");
