import FeatureHero from "../../components/features/FeatureHero";
import CoreModules from "../../components/features/CoreModules";
import AIFeatures from "../../components/features/AIFeatures";
import Workflow from "../../components/features/Workflow";
import Benefits from "../../components/features/Benefits";
import CTA from "../../components/features/CTA";

function Features() {
  return (
    <>
      <FeatureHero />
      <CoreModules />
      <AIFeatures />
      <Workflow />
      <Benefits />
      <CTA />
    </>
  );
}

export default Features;