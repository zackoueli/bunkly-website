"use client";

import { motion, useReducedMotion } from "motion/react";
import QRCode from "react-qr-code";

const APP_URL = "https://app.bunkly.co/fr";
const DEMO_LIVRET = "https://app.bunkly.co/b/1zdIjGyTTW";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
      style={{}}
    >
      {/* Image de fond plein écran */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://picsum.photos/seed/aerial-villa-pool-nature/1600/900"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay gradient — plus sombre à gauche pour lisibilité texte */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.40) 55%, rgba(0,0,0,0.15) 100%)",
        }}
        aria-hidden
      />
      {/* Overlay bas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 40%)",
        }}
        aria-hidden
      />

      {/* Contenu */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-6 w-full py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* Gauche : texte */}
          <div className="flex flex-col gap-7">
            <motion.p
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "rgba(251,146,60,0.9)" }}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Pour hotes Airbnb, gites &amp; campings
            </motion.p>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-semibold tracking-tight leading-[1.07] text-white"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.25)" }}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Le livret d&apos;accueil
              <br />
              que vos voyageurs
              <br />
              <span style={{ color: "#fb923c" }}>consultent vraiment.</span>
            </motion.h1>

            <motion.p
              className="text-base leading-relaxed max-w-[38ch]"
              style={{ color: "rgba(255,255,255,0.75)" }}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Creez un livret digital pour votre location en quelques minutes. QR code inclus, accessible sur mobile sans telechargement.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-1"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={APP_URL}
                className="inline-flex items-center justify-center font-semibold text-white px-7 py-3.5 rounded-2xl active:scale-[0.97] transition-all text-sm shadow-lg"
                style={{ backgroundColor: "#f97316" }}
              >
                Creer mon livret gratuitement
              </a>
            </motion.div>

            <motion.p
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.45)" }}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Gratuit jusqu&apos;a 3 livrets - sans carte bancaire
            </motion.p>
          </div>

          {/* Droite : phone mockup + QR */}
          <motion.div
            className="flex items-center justify-center lg:justify-end gap-4"
            initial={reduce ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Phone mockup */}
            <div className="relative shrink-0" style={{ width: "240px" }}>
              {/* Halo */}
              <div
                className="absolute -inset-8 rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: "rgba(249,115,22,0.20)" }}
                aria-hidden
              />

              <div className="relative bg-zinc-900 rounded-[2.75rem] p-[9px] shadow-2xl ring-1 ring-white/20">
                <div
                  className="relative bg-white rounded-[2.3rem] overflow-hidden"
                  style={{ height: "500px" }}
                >
                  {/* Dynamic island */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 w-24 h-5 bg-zinc-900 rounded-full" />

                  {/* iframe — 390px iPhone width, scalé pour tenir dans 224px */}
                  <div className="absolute inset-0 overflow-hidden" style={{ top: "26px" }}>
                    <iframe
                      src={DEMO_LIVRET}
                      className="border-0"
                      style={{
                        width: "390px",
                        height: "844px",
                        transform: "scale(0.574)",
                        transformOrigin: "top left",
                      }}
                      title="Livret d'accueil demo Bunkly"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>

                  {/* Masque top */}
                  <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />

                </div>
              </div>
              {/* Label sous le phone */}
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-[11px] font-medium text-white/60">Livret interactif - scrollez !</span>
              </div>
            </div>

            {/* QR code — visible seulement sur desktop */}
            <div
              className="hidden xl:flex flex-col items-center gap-3 rounded-3xl p-4 shrink-0"
              style={{
                backgroundColor: "rgba(255,255,255,0.90)",
                backdropFilter: "blur(16px)",
              }}
            >
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest text-center">
                Scannez pour<br />tester
              </p>
              <a
                href={DEMO_LIVRET}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
              >
                <QRCode
                  value={DEMO_LIVRET}
                  size={110}
                  bgColor="#ffffff"
                  fgColor="#18181b"
                  level="M"
                />
              </a>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[10px] text-zinc-500 font-medium">En ligne</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
