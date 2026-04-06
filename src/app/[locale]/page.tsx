import { Hero } from "@/components/sections/Hero";
import { TripAdvisor } from "@/components/sections/TripAdvisor";
import { Experience } from "@/components/sections/Experience";
import { WhatToPrepare } from "@/components/sections/WhatToPrepare";
import { Gallery } from "@/components/sections/Gallery";
import { Host } from "@/components/sections/Host";
import { Plans } from "@/components/sections/Plans";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { Access } from "@/components/sections/Access";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TripAdvisor />
      <Experience />
      <WhatToPrepare />
      <Gallery />
      <Host />
      <Plans />
      <BookingCTA />
      <Access />
    </>
  );
}
