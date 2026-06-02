"use client";

import { motion, useReducedMotion } from "motion/react";
import QRCode from "react-qr-code";

const APP_URL = "https://app.bunkly.co/fr";
const DEMO_LIVRET = "https://app.bunkly.co/b/1zdIjGyTTW";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100dvh] flex flex-col overflow-hidden">
      {/* Image de fond */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay léger */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.42)" }}
        aria-hidden
      />

      <div className="relative z-10 flex-1 flex max-w-7xl mx-auto px-8 w-full py-24 lg:py-0">

        {/* Gauche : texte minimaliste */}
        <div className="flex flex-col justify-center gap-8 w-full lg:w-1/2">

          <motion.div
            className="flex flex-col gap-5"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-sm font-medium"
              style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em" }}
            >
              Livrets d&apos;accueil digitaux
            </p>

            <h1
              className="text-white font-black leading-none"
              style={{
                fontSize: "clamp(5rem, 10vw, 8rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Bunkly.
            </h1>

            <p
              className="text-xl leading-relaxed"
              style={{ color: "rgba(255,255,255,0.62)", maxWidth: "28ch" }}
            >
              Creez le livret d&apos;accueil de votre location en quelques minutes.
            </p>
          </motion.div>

          <motion.a
            href={APP_URL}
            className="inline-flex items-center justify-center font-semibold text-white w-fit px-8 py-4 rounded-full text-base transition-all active:scale-[0.97]"
            style={{ backgroundColor: "#f97316", boxShadow: "0 8px 32px rgba(249,115,22,0.4)" }}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Commencer gratuitement
          </motion.a>
        </div>

        {/* Droite : phone + QR */}
        <motion.div
          className="hidden lg:flex items-center justify-end gap-5 flex-1"
          initial={reduce ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
            {/* Label Scroll à gauche du phone */}
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
          <div
            className="hidden xl:flex flex-col items-center gap-3 rounded-3xl p-4 shrink-0"
            style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)" }}
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
          </div>
        </motion.div>

      </div>
    </section>
  );
}
