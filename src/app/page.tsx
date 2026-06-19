import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { QuickFacts } from "@/components/sections/QuickFacts";
import { RaceIntro } from "@/components/sections/RaceIntro";
import { Countdown } from "@/components/sections/Countdown";
import { Stories } from "@/components/sections/Stories";
import { Packages } from "@/components/sections/Packages";
import { Gallery } from "@/components/sections/Gallery";
import { Sponsors } from "@/components/sections/Sponsors";
import { Newsletter } from "@/components/sections/Newsletter";

/** Single-page composition — order is the contract (blueprint §6). */
export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <QuickFacts />
        <RaceIntro />
        <Countdown />
        <Stories />
        <Packages />
        <Gallery />
        <Sponsors />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
