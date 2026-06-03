"use client";

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef } from "react";
import QRCode from "react-qr-code";

const APP_URL = "https://app.bunkly.co/fr";
const DEMO_LIVRET = "https://app.bunkly.co/b/1zdIjGyTTW";

const TITLE = "Bunkly.";

const titleVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 48, rotateX: -40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const wordVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.85 } },
};

const wordChildVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallaxe : l'image monte plus lentement que le scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const subtitle = "Creez le livret d'accueil de votre location en quelques minutes.".split(" ");

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex flex-col overflow-hidden">

      {/* Image de fond avec parallaxe */}
      <motion.img
        src="/hero.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        style={{ y: imageY, scale: 1.1 }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.42)" }}
        aria-hidden
      />

      <div className="relative z-10 flex-1 flex max-w-7xl mx-auto px-8 w-full py-24 lg:py-0">

        {/* Gauche */}
        <div className="flex flex-col justify-center gap-8 w-full lg:w-1/2">

          {/* Eyebrow */}
          <motion.p
            className="text-sm font-medium"
            style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em" }}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Livrets d&apos;accueil digitaux
          </motion.p>

          {/* Titre lettre par lettre */}
          <motion.h1
            className="text-white font-black leading-none"
            style={{
              fontSize: "clamp(5rem, 10vw, 8rem)",
              letterSpacing: "-0.03em",
              perspective: "600px",
            }}
            variants={reduce ? undefined : titleVariants}
            initial={reduce ? false : "hidden"}
            animate={reduce ? { opacity: 1 } : "visible"}
          >
            {TITLE.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={reduce ? undefined : letterVariants}
                className="inline-block"
                style={{ display: "inline-block" }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Sous-titre mot par mot */}
          <motion.p
            className="text-xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.62)", maxWidth: "28ch" }}
            variants={reduce ? undefined : wordVariants}
            initial={reduce ? false : "hidden"}
            animate={reduce ? { opacity: 1 } : "visible"}
          >
            {subtitle.map((word, i) => (
              <motion.span
                key={i}
                variants={reduce ? undefined : wordChildVariants}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* CTA avec effet pulse sur le glow */}
          <motion.a
            href={APP_URL}
            className="inline-flex items-center justify-center font-semibold text-white w-fit px-8 py-4 rounded-full text-base transition-all active:scale-[0.97]"
            style={{ backgroundColor: "#f97316" }}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04, boxShadow: "0 12px 48px rgba(249,115,22,0.6)" }}
            whileTap={{ scale: 0.97 }}
            transition={{
              opacity: { delay: 1.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              y: { delay: 1.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 0.15, ease: "easeOut" },
              boxShadow: { duration: 0.15, ease: "easeOut" },
            }}
          >
            Commencer gratuitement
          </motion.a>
        </div>

        {/* Droite : phone + QR */}
        <motion.div
          className="hidden lg:flex items-center justify-end gap-5 flex-1"
          initial={reduce ? false : { opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Phone mockup */}
          <div className="relative shrink-0" style={{ width: "260px" }}>
            <div
              className="absolute -inset-10 rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: "rgba(249,115,22,0.18)" }}
              aria-hidden
            />

            <div
              className="relative shadow-2xl ring-1 ring-white/20"
              style={{ backgroundColor: "#1a1a1a", borderRadius: "3.2rem", padding: "10px" }}
            >
              <div
                className="relative bg-white overflow-hidden"
                style={{ borderRadius: "2.8rem", height: "560px" }}
              >
                <div
                  className="absolute left-1/2 -translate-x-1/2 z-20 bg-zinc-900"
                  style={{ top: "10px", width: "110px", height: "30px", borderRadius: "999px" }}
                />

                <div className="absolute inset-0 overflow-hidden" style={{ top: "0px" }}>
                  <iframe
                    src={DEMO_LIVRET}
                    className="border-0"
                    style={{
                      width: "390px",
                      height: "844px",
                      transform: "scale(0.615)",
                      transformOrigin: "top left",
                    }}
                    title="Livret d'accueil demo Bunkly"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
              <div className="w-px h-14 bg-white/30" />
              <span
                className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]"
                style={{ writingMode: "vertical-rl" }}
              >
                Scroll
              </span>
              <div className="w-px h-14 bg-white/30" />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </div>
          </div>

          {/* QR code */}
          <motion.div
            className="hidden xl:flex flex-col items-center gap-3 rounded-3xl p-4 shrink-0"
            style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)" }}
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest text-center">
              Scannez<br />pour tester
            </p>
            <a
              href={DEMO_LIVRET}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
            >
              <QRCode value={DEMO_LIVRET} size={110} bgColor="#ffffff" fgColor="#18181b" level="M" />
            </a>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] text-zinc-500 font-medium">En ligne</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
