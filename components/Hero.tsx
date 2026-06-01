"use client";

import { motion, useReducedMotion } from "motion/react";

const APP_URL = "https://app.bunkly.co/fr";

const phoneScreens = [
  {
    label: "Arrivee & Depart",
    arrival: "16h00",
    departure: "11h00",
    color: "bg-orange-500",
  },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="min-h-[100dvh] bg-stone-50 flex items-center pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

        {/* Left */}
        <div className="flex flex-col gap-8">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <p className="text-sm font-medium text-orange-500 tracking-wide">
              Pour les hotes Airbnb, gites &amp; campings
            </p>

            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-zinc-900">
              Le livret qui fait
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-orange-500">bonne impression</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] bg-orange-200 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden
                />
              </span>
              <br />
              des le premier jour.
            </h1>

            <p className="text-lg text-zinc-500 leading-relaxed max-w-[38ch]">
              Creez un livret d&apos;accueil digital pour votre location en quelques minutes. QR code inclus, lisible sur mobile, zero papier.
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href={`${APP_URL}`}
              className="inline-flex items-center justify-center font-semibold bg-orange-500 text-white px-7 py-3.5 rounded-2xl hover:bg-orange-600 active:scale-[0.97] transition-all text-sm shadow-lg shadow-orange-200"
            >
              Creer mon livret gratuitement
            </a>
            <a
              href="#comment-ca-marche"
              className="inline-flex items-center justify-center font-medium text-zinc-600 px-7 py-3.5 rounded-2xl hover:text-zinc-900 hover:bg-zinc-100 active:scale-[0.97] transition-all text-sm"
            >
              Voir la demo
            </a>
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xs text-zinc-400"
          >
            Gratuit jusqu&apos;a 3 livrets - aucune carte bancaire
          </motion.p>
        </div>

        {/* Right: phone stack */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Background blob */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-400/15 rounded-full blur-3xl"
            aria-hidden
          />

          {/* Main phone */}
          <div className="relative z-10 w-[248px] md:w-[272px]">
            <div className="bg-zinc-900 rounded-[2.75rem] p-[10px] shadow-2xl shadow-zinc-400/30 ring-1 ring-white/10">
              <div className="bg-white rounded-[2.25rem] overflow-hidden">
                {/* Notch */}
                <div className="bg-zinc-900 h-8 flex items-center justify-center">
                  <div className="w-24 h-[18px] bg-zinc-800 rounded-full" />
                </div>

                {/* Hero image */}
                <div className="relative h-44 bg-zinc-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://picsum.photos/seed/villa-mediterranean/600/500"
                    alt="Photo de la villa"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-white/60 text-[10px] font-medium">Votre sejour</p>
                    <p className="text-white text-sm font-semibold leading-tight">Villa Les Palmiers</p>
                    <p className="text-white/60 text-[10px] mt-0.5">06160 Juan-les-Pins</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div className="bg-stone-50 rounded-2xl p-3">
                    <p className="text-[9px] font-semibold text-zinc-400 uppercase tracking-widest">Bienvenue</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="w-6 h-6 rounded-full bg-zinc-200 shrink-0" />
                      <div>
                        <p className="text-[10px] font-semibold text-zinc-700">Sophie &amp; Marc</p>
                        <p className="text-[9px] text-zinc-400">Vos hotes</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-orange-500 rounded-2xl p-3">
                      <p className="text-[9px] font-semibold text-orange-100 uppercase tracking-widest">Arrivee</p>
                      <p className="text-xl font-bold text-white mt-1">16h00</p>
                    </div>
                    <div className="bg-zinc-100 rounded-2xl p-3">
                      <p className="text-[9px] font-semibold text-zinc-400 uppercase tracking-widest">Depart</p>
                      <p className="text-xl font-bold text-zinc-700 mt-1">11h00</p>
                    </div>
                  </div>

                  <div className="bg-stone-50 rounded-2xl p-3 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-semibold text-zinc-400 uppercase tracking-widest">WiFi</p>
                      <p className="text-[11px] font-semibold text-zinc-700 mt-0.5">VillaNetwork_5G</p>
                    </div>
                    <div className="bg-orange-100 rounded-lg px-2 py-1">
                      <p className="text-[10px] font-bold text-orange-600">Voir</p>
                    </div>
                  </div>
                </div>

                {/* Bottom nav */}
                <div className="border-t border-zinc-100 py-2 px-3 grid grid-cols-5">
                  {[
                    { label: "Accueil", active: true },
                    { label: "Sejour", active: false },
                    { label: "Activites", active: false },
                    { label: "Urgences", active: false },
                    { label: "Depart", active: false },
                  ].map((tab) => (
                    <div key={tab.label} className={`flex flex-col items-center gap-0.5 ${tab.active ? "text-orange-500" : "text-zinc-300"}`}>
                      <div className={`w-4 h-3.5 rounded-md ${tab.active ? "bg-orange-100" : "bg-zinc-100"}`} />
                      <span className="text-[7px] font-medium">{tab.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -left-14 top-24 bg-white rounded-2xl shadow-lg shadow-zinc-200/80 px-3.5 py-2.5 flex items-center gap-2.5 ring-1 ring-zinc-100"
            >
              <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
              <span className="text-[11px] font-semibold text-zinc-700 whitespace-nowrap">Publie en ligne</span>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -right-10 bottom-28 bg-orange-500 rounded-2xl shadow-lg shadow-orange-300/50 px-3.5 py-2.5 ring-1 ring-orange-400"
            >
              <p className="text-[9px] font-semibold text-orange-100">QR CODE</p>
              <p className="text-[11px] font-bold text-white">Genere</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
