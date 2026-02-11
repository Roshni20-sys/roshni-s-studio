import { motion } from "framer-motion";
import { useState } from "react";
import { Send } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setStatus("sending");

    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:hembromramo145@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 500);
  };

  return (
    <section id="contact" className="py-32 md:py-40 relative grain-overlay">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-8">
              Let's build something{" "}
              <span className="text-primary">meaningful</span>.
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects,
              or ways we can work together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-sm text-muted-foreground uppercase tracking-widest mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border-b border-border/50 focus:border-primary text-foreground py-3 outline-none transition-colors duration-300 placeholder:text-muted-foreground/40"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-muted-foreground uppercase tracking-widest mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border-b border-border/50 focus:border-primary text-foreground py-3 outline-none transition-colors duration-300 placeholder:text-muted-foreground/40"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-muted-foreground uppercase tracking-widest mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  maxLength={1000}
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-transparent border-b border-border/50 focus:border-primary text-foreground py-3 outline-none transition-colors duration-300 resize-none placeholder:text-muted-foreground/40"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center gap-3 px-8 py-3 bg-primary text-primary-foreground font-medium rounded transition-all duration-300 hover:opacity-90 disabled:opacity-50"
              >
                <span>{status === "sent" ? "Sent!" : status === "sending" ? "Opening..." : "Send Message"}</span>
                <Send className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.form>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-10 lg:pl-8"
            >
              <div>
                <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-4">Email</h3>
                <a
                  href="mailto:hembromramo145@gmail.com"
                  className="text-xl md:text-2xl text-foreground hover:text-primary transition-colors duration-300 underline-animation"
                >
                  hembromramo145@gmail.com
                </a>
              </div>

              <div>
                <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-4">Phone</h3>
                <a
                  href="tel:+919932108347"
                  className="text-xl md:text-2xl text-foreground hover:text-primary transition-colors duration-300"
                >
                  +91 9932108347
                </a>
              </div>

              <div>
                <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-4">Socials</h3>
                <div className="flex gap-6">
                  <a
                    href="https://linkedin.com/in/roshnihembrom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="underline-animation">LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/roshnihembrom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="underline-animation">GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-32 pt-8 border-t border-border/30"
      >
        <div className="section-container flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Roshni Hembrom
          </p>
          <a
            href="#"
            className="font-serif text-lg text-foreground/80 hover:text-primary transition-colors duration-300"
          >
            RH
          </a>
          <p className="text-muted-foreground text-sm">
            Designed with precision
          </p>
        </div>
      </motion.footer>
    </section>
  );
};

export default Contact;
