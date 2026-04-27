"use client";

import LabMomentsStrip from "@/components/home/LabMomentsStrip";
import StayMomentsStrip from "@/components/home/StayMomentsStrip";

type Five = readonly [string, string, string, string, string];

type Props = {
  stayEyebrow: string;
  stayMoments: Five;
  labEyebrow: string;
  labMoments: Five;
};

/** Single mount boundary for hero strips — avoids two parallel lazy chunks on TBT-critical path. */
export default function HeroMomentStrips({
  stayEyebrow,
  stayMoments,
  labEyebrow,
  labMoments,
}: Props) {
  return (
    <>
      <StayMomentsStrip eyebrow={stayEyebrow} moments={stayMoments} />
      <LabMomentsStrip eyebrow={labEyebrow} moments={labMoments} />
    </>
  );
}
