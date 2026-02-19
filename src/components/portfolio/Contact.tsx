import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Send, CheckCircle, ArrowUpRight } from "lucide-react";

const FloatingInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  maxLength,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  maxLength?: number;
  required?: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <motion.div
      className="relative group"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <label
        htmlFor={id}
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          isActive
            ? "text-xs text-primary -top-5 tracking-widest uppercase"
            : "text-muted-foreground top-3 text-base"
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent border-b-2 border-border/30 focus:border-primary text-foreground py-3 outline-none transition-all duration-300"
      />
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-primary"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
};

const FloatingTextarea = ({
  id,
  label,
  value,
  onChange,
  maxLength,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  maxLength?: number;
  required?: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <motion.div
      className="relative group"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <label
        htmlFor={id}
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          isActive
            ? "text-xs text-primary -top-5 tracking-widest uppercase"
            : "text-muted-foreground top-3 text-base"
        }`}
      >
        {label}
      </label>
      <textarea
        id={id}
        required={required}
        maxLength={maxLength}
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent border-b-2 border-border/30 focus:border-primary text-foreground py-3 outline-none transition-all duration-300 resize-none"
      />
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-primary"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0 }}
      />
      {maxLength && (
        <motion.span
          className="absolute right-0 -bottom-6 text-xs text-muted-foreground/50"
          animate={{ opacity: focused ? 1 : 0 }}
        >
          {value.length}/{maxLength}
        </motion.span>
      )}
    </motion.div>
  );
};

const ContactLink = ({
  href,
  label,
  value,
  index,
}: {
  href: string;
  label: string;
  value: string;
  index: number;
}) => (
  <motion.a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
    whileHover={{ x: 8, backgroundColor: "hsl(var(--primary) / 0.05)" }}
    className="group flex items-center justify-between py-5 px-4 -mx-4 rounded-lg transition-colors duration-300 border border-transparent hover:border-border/30"
  >
    <div>
      <span className="block text-xs text-muted-foreground uppercase tracking-widest mb-1">
        {label}
      </span>
      <span className="text-lg md:text-xl text-foreground group-hover:text-primary transition-colors duration-300">
        {value}
      </span>
    </div>
    <ArrowUpRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-primary group-hover:rotate-45 transition-all duration-300" />
  </motion.a>
);

const SocialLink = ({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -4, scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center gap-2 px-5 py-3 rounded-full border border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors duration-300"
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </motion.a>
);

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

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
        <div className="max-w-5xl mx-auto">
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block text-sm text-primary uppercase tracking-[0.3em] mb-6"
            >
              Get in Touch
            </motion.span>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-8">
              Let's build something{" "}
              <motion.span
                className="text-primary inline-block"
                whileHover={{ scale: 1.05, rotate: -1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                meaningful
              </motion.span>
              .
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects,
              or ways we can work together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Contact Form */}
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-10"
            >
              <FloatingInput
                id="name"
                label="Your name"
                value={form.name}
                onChange={(val) => setForm({ ...form, name: val })}
                maxLength={100}
                required
              />
              <FloatingInput
                id="email"
                label="Your email"
                type="email"
                value={form.email}
                onChange={(val) => setForm({ ...form, email: val })}
                maxLength={255}
                required
              />
              <FloatingTextarea
                id="message"
                label="Tell me about your project..."
                value={form.message}
                onChange={(val) => setForm({ ...form, message: val })}
                maxLength={1000}
                required
              />

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg overflow-hidden transition-all duration-300 disabled:opacity-50"
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent -skew-x-12"
                  initial={{ x: "-200%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.6 }}
                />

                <AnimatePresence mode="wait">
                  {status === "sent" ? (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 relative z-10"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Sent!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="default"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 relative z-10"
                    >
                      {status === "sending" ? "Opening..." : "Send Message"}
                      <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.form>

            {/* Contact Info */}
            <div className="space-y-2">
              <ContactLink
                href="mailto:hembromramo145@gmail.com"
                label="Email"
                value="hembromramo145@gmail.com"
                index={0}
              />
              <ContactLink
                href="tel:+919932108347"
                label="Phone"
                value="+91 9932108347"
                index={1}
              />

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="pt-6"
              >
                <span className="block text-xs text-muted-foreground uppercase tracking-widest mb-4 px-4">
                  Socials
                </span>
                <div className="flex gap-3 px-4">
                  <SocialLink
                    href="https://linkedin.com/in/roshnihembrom"
                    label="LinkedIn"
                    icon={
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    }
                  />
                  <SocialLink
                    href="https://github.com/roshnihembrom"
                    label="GitHub"
                    icon={
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    }
                  />
                </div>
              </motion.div>
            </div>
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
