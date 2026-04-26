-- AlterTable: one-click unsubscribe + opt-out timestamp
ALTER TABLE "DecisionReminderSubscriber" ADD COLUMN "unsubscribeToken" TEXT;
UPDATE "DecisionReminderSubscriber"
SET "unsubscribeToken" = gen_random_uuid()::text
WHERE "unsubscribeToken" IS NULL;
ALTER TABLE "DecisionReminderSubscriber" ALTER COLUMN "unsubscribeToken" SET NOT NULL;

CREATE UNIQUE INDEX "DecisionReminderSubscriber_unsubscribeToken_key"
  ON "DecisionReminderSubscriber"("unsubscribeToken");

ALTER TABLE "DecisionReminderSubscriber" ADD COLUMN "emailOptOutAt" TIMESTAMP(3);
