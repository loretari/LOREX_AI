import { Header } from "../sections/Header";
import { Hero } from "../sections/Hero";
import { Companies } from "../sections/Companies";
import { Features } from "../sections/Features";
import { Pricing } from "../sections/Pricing";
import { Testimonials } from "../sections/Testimonials";
import { CallToAction } from "../sections/CallToAction";
import { Footer } from "../sections/Footer";
import { HeaderServer } from "../components/server/HeaderServer";


export default function Home() {
  return <div>
    <HeaderServer />
    <Hero />
    <Companies />
    <Features />
    <Pricing />
    <Testimonials />
    <CallToAction />
    <Footer />
  </div>;
}
