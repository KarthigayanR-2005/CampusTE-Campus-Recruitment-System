import Hero from "../../components/home/Hero";
import TrustedBy from "../../components/home/TrustedBy";
import PlatformOverview from "../../components/home/PlatformOverview";
import WhyChoose from "../../components/home/WhyChoose";
import AIWorkflow from "../../components/home/AIWorkflow";
import Statistics from "../../components/home/Statistics";
import Testimonials from "../../components/home/Testimonials";
import CTA from "../../components/home/CTA";

function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <PlatformOverview />
      <WhyChoose />
      <AIWorkflow />
      <Statistics />
      <Testimonials />
      <CTA />
    </>
  );
}

export default Home;