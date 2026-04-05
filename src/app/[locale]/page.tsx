import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Plans } from "@/components/sections/Plans";
import { Gallery } from "@/components/sections/Gallery";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { Access } from "@/components/sections/Access";
import { TripAdvisor } from "@/components/sections/TripAdvisor";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Plans />
      <Gallery />
      <BookingCTA />
      <Access />
      <TripAdvisor />
    </>
  );
}
