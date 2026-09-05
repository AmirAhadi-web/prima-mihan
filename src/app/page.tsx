import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Collection from "@/components/Collection";
import Ingredients from "@/components/Ingredients";
import Finale from "@/components/Finale";
import Footer from "@/components/Footer";
import DeveloperFooter from '@/components/DeveloperFooter';

export default function Home() {
  return (
    <main id="top" className="relative">
      <Preloader />
      <Navbar />
      <Hero />
      <Manifesto />
      <Collection />
      <Ingredients />
      <Finale />
      <Footer />
      <DeveloperFooter />
    </main>
  );
}
