import ContactHero from "../../components/contact/ContactHero";
import ContactInfo from "../../components/contact/ContactInfo";
import ContactForm from "../../components/contact/ContactForm";
import OfficeLocation from "../../components/contact/OfficeLocation";
import FAQPreview from "../../components/contact/FAQPreview";
import CTA from "../../components/contact/CTA";

function Contact() {
  return (
    <>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <OfficeLocation />
      <FAQPreview />
      <CTA />
    </>
  );
}

export default Contact;