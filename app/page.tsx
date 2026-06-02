import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ScrollStory } from "@/components/ScrollStory";
import { HowItWorks } from "@/components/HowItWorks";
import { PhotosSouvenirs } from "@/components/PhotosSouvenirs";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ScrollStory />
        <HowItWorks />
        <PhotosSouvenirs />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
