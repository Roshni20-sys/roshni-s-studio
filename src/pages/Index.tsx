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
import SectionDivider from "@/components/portfolio/SectionDivider";
import ScrollReveal from "@/components/portfolio/ScrollReveal";

const Index = () => {
  return (
    <>
      <Preloader />
      <CursorFollower />
      <main className="bg-background text-foreground overflow-x-hidden cursor-none md:cursor-none">
        <Navbar />
        <Hero />

        <SectionDivider label="About" />
        <ScrollReveal>
          <About />
        </ScrollReveal>

        <SectionDivider label="Experience" />
        <ScrollReveal direction="left">
          <Experience />
        </ScrollReveal>

        <SectionDivider label="Projects" />
        <ScrollReveal>
          <Projects />
        </ScrollReveal>

        <SectionDivider label="Skills" />
        <ScrollReveal direction="right">
          <Skills />
        </ScrollReveal>

        <SectionDivider label="Education" />
        <ScrollReveal>
          <Education />
        </ScrollReveal>

        <SectionDivider label="Recognition" />
        <ScrollReveal direction="left">
          <Achievements />
        </ScrollReveal>

        <SectionDivider label="Contact" />
        <ScrollReveal>
          <Contact />
        </ScrollReveal>

        <ScrollToTop />
      </main>
    </>
  );
};

export default Index;
