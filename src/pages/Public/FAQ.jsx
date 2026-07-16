import FAQHero from "../../components/faq/FAQHero";
import FAQSearch from "../../components/faq/FAQSearch";
import FAQCategories from "../../components/faq/FAQCategories";
import FAQAccordion from "../../components/faq/FAQAccordion";
import SupportBanner from "../../components/faq/SupportBanner";
import CTA from "../../components/faq/CTA";

function FAQ() {
  return (
    <>
      <FAQHero />
      <FAQSearch />
      <FAQCategories />
      <FAQAccordion />
      <SupportBanner />
      <CTA />
    </>
  );
}

export default FAQ;