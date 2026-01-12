import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Skills from "@/components/portfolio/Skills";
import Education from "@/components/portfolio/Education";
import Achievements from "@/components/portfolio/Achievements";
import Contact from "@/components/portfolio/Contact";
import ScrollToTop from "@/components/portfolio/ScrollToTop";
import CursorFollower from "@/components/portfolio/CursorFollower";
import Preloader from "@/components/portfolio/Preloader";

const Index = () => {
  return (
    <>
      <Preloader />
      <CursorFollower />
      <main className="bg-background text-foreground overflow-x-hidden cursor-none md:cursor-none">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Achievements />
        <Contact />
        <ScrollToTop />
      </main>
    </>
  );
};

export default Index;
