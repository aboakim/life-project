-- CreateTable
CREATE TABLE "ReferralOwner" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "code" VARCHAR(32) NOT NULL,
    "freeUnlockedAt" TIMESTAMP(3),
    "premiumUnlockedAt" TIMESTAMP(3),

    CONSTRAINT "ReferralOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralHit" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" VARCHAR(32) NOT NULL,
    "visitorKey" VARCHAR(64) NOT NULL,

    CONSTRAINT "ReferralHit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReferralOwner_code_key" ON "ReferralOwner"("code");

-- CreateIndex
CREATE INDEX "ReferralHit_code_idx" ON "ReferralHit"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralHit_code_visitorKey_key" ON "ReferralHit"("code", "visitorKey");

-- AddForeignKey
ALTER TABLE "ReferralHit" ADD CONSTRAINT "ReferralHit_code_fkey" FOREIGN KEY ("code") REFERENCES "ReferralOwner"("code") ON DELETE CASCADE ON UPDATE CASCADE;
