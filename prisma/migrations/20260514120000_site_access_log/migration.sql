-- Server-side access log for admin overview (middleware → internal API).
CREATE TABLE "SiteAccessLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "method" VARCHAR(8) NOT NULL DEFAULT 'GET',
    "path" VARCHAR(512) NOT NULL,
    "country" VARCHAR(8),
    "referer" VARCHAR(512),
    "ua" VARCHAR(240),

    CONSTRAINT "SiteAccessLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "SiteAccessLog_createdAt_idx" ON "SiteAccessLog"("createdAt");
