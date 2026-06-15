import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Cities from "@/components/Cities";
import Gamification from "@/components/Gamification";
import LocalGuide from "@/components/LocalGuide";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ModalsHost from "@/components/ModalsHost";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <HowItWorks />
        <Features />
        <Cities />
        <Gamification />
        <LocalGuide />
        <FinalCTA />
      </main>
      <Footer />
      <ModalsHost />
    </>
  );
}
