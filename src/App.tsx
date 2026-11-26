import { HeroSection } from "./components/sections/HeroSection";
import { PlayerSection } from "./components/sections/PlayerSection";
import { AudioExperienceSection } from "./components/sections/AudioExperienceSection";
import { LiveRadioSection } from "./components/sections/LiveRadioSection";
import { MomentsGridSection } from "./components/sections/MomentsGridSection";
import { AppEcosystemSection } from "./components/sections/AppEcosystemSection";
import { ConversionBannerSection } from "./components/sections/ConversionBannerSection";
import { FooterSection } from "./components/sections/FooterSection";
import { CopyrightBar } from "./components/sections/CopyrightBar";
import { Navbar } from "@/components/sections/Navbar";

export function App() {
  return (
    <div className="bg-coffee-dark text-cream">
      <Navbar />
      <main>
        <HeroSection />
        <PlayerSection />
        <AudioExperienceSection />
        <LiveRadioSection />
        <MomentsGridSection />
        <AppEcosystemSection />
        <ConversionBannerSection />
      </main>
      <FooterSection />
      <CopyrightBar />
    </div>
  );
}
