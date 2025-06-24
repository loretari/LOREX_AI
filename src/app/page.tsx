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
    <main>
    <Hero />
    <Companies />
      <section id= "paslaugos" className= "scroll-mt-20">
        <Features />
      </section>
      <section id= "kainodara" className= "scroll-mt-20">
        <Pricing />
      </section>
      <section id= "atsiliepimai" className= "scroll-mt-20">
        <Testimonials />
      </section>
      <section id= "susisiekite" className= "scroll-mt-20">
        <CallToAction />
      </section>
       <Footer />
    </main>
  </div>;
}
