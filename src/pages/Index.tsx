import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Skills from "@/components/portfolio/Skills";
import Education from "@/components/portfolio/Education";
import Achievements from "@/components/portfolio/Achievements";
import Contact from "@/components/portfolio/Contact";

const Index = () => {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Achievements />
      <Contact />
    </main>
  );
};

export default Index;
