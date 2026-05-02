"use client";

import SocialShareModal from "@/components/sharing/SocialShareModal";
import type { PricingCopy } from "@/lib/i18n/pricing-page";

type Props = {
  t: PricingCopy;
  open: boolean;
  onClose: () => void;
  elevated?: boolean;
};

export default function PremiumShareRow({ t, open, onClose, elevated }: Props) {
  return (
    <SocialShareModal t={t} open={open} onClose={onClose} elevated={elevated} />
  );
}
