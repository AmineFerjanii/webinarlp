import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import SpeakerSection from "@/components/SpeakerSection";
import Footer from "@/components/Footer";
import { translations } from "@/lib/translations";
import type { Lang } from "@/lib/translations";

const WebinarPage = ({ lang }: { lang: Lang }) => {
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-background">
      <HeroSection t={t} />
      <BenefitsSection t={t} />
      <SpeakerSection t={t} />
      <Footer t={t} />
    </div>
  );
};

export default WebinarPage;
