"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import {
  QrCode,
  DeviceMobile,
  PencilSimple,
  Lock,
} from "@phosphor-icons/react";
import QRCode from "react-qr-code";

const DEMO_URL = "https://app.bunkly.co/b/1zdIjGyTTW";

const steps = [
  {
    icon: PencilSimple,
    title: "Un editeur guide, pas une page blanche",
    desc: "Les modules sont preconfigurees : arrivee, regles du sejour, WiFi, cuisine, activites, urgences. Vous remplissez, Bunkly structure.",
    screenTitle: "Arrivee & Depart",
    screenDesc: "Check-in/out, codes d'acces, cles, horaires",
    accent: "bg-orange-500",
    preview: "editor",
  },
  {
    icon: DeviceMobile,
    title: "Beau sur tous les telephones",
    desc: "Vos voyageurs consultent le livret depuis Safari ou Chrome, sans rien telecharger. Le design s'adapte a tous les ecrans.",
    screenTitle: "Apercu mobile",
    screenDesc: "Rendu en temps reel sur iOS et Android",
    accent: "bg-zinc-900",
    preview: "mobile",
  },
  {
    icon: QrCode,
    title: "Partage en une seconde",
    desc: "Un QR code unique est genere a la publication. Imprimez-le, placez-le dans le logement. Vos voyageurs scannent et c'est fait.",
    screenTitle: "QR Code pret",
    screenDesc: "Telecharger en PNG ou SVG",
    accent: "bg-green-500",
    preview: "qr",
  },
  {
    icon: Lock,
    title: "Vos donnees restent privees",
    desc: "Codes WiFi, digicodes, adresses — rien n'est indexe par Google. Le livret est accessible uniquement via votre lien ou QR code.",
    screenTitle: "Acces protege",
    screenDesc: "Jamais indexe, toujours accessible",
    accent: "bg-zinc-700",
    preview: "lock",
  },
];

function PhonePreview({ step, stepIndex }: { step: typeof steps[0]; stepIndex: number }) {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Editor preview */}
      {step.preview === "editor" && (
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-40 border-r border-zinc-100 p-3 flex flex-col gap-1 bg-zinc-50/80">
            {["Arrivee & Depart", "Le logement", "Regles du sejour", "Cuisine & Menage", "Activites", "Urgences", "Depart"].map((item, i) => (
              <div
                key={item}
                className={`px-2 py-1.5 rounded-lg text-[9px] font-medium ${i === 0 ? "bg-orange-50 text-orange-600" : "text-zinc-400"}`}
              >
                {item}
              </div>
            ))}
          </div>
          {/* Content */}
          <div className="flex-1 p-4 space-y-3 overflow-hidden">
            <div>
              <p className="text-xs font-semibold text-zinc-700">Heure d&apos;arrivee</p>
              <div className="mt-1.5 border border-zinc-200 rounded-lg px-3 py-2 flex items-center gap-2">
                <span className="text-sm font-medium text-zinc-900">16:00</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-700">Code d&apos;acces</p>
              <div className="mt-1.5 border border-zinc-200 rounded-lg px-3 py-2">
                <span className="text-sm font-mono text-zinc-900">4782</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-700">Message de bienvenue</p>
              <div className="mt-1.5 border border-zinc-200 rounded-lg px-3 py-2 h-14">
                <span className="text-[10px] text-zinc-500">Bienvenue ! Nous sommes ravis...</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile preview */}
      {step.preview === "mobile" && (
        <div className="flex-1 flex items-center justify-center p-4">
          {/* Phone shell */}
          <div className="w-[190px] bg-zinc-900 rounded-[2rem] p-[7px] shadow-2xl shadow-zinc-400/30 ring-1 ring-white/10">
            <div className="bg-[#0f172a] rounded-[1.6rem] overflow-hidden">
              {/* Notch */}
              <div className="h-6 flex items-center justify-center">
                <div className="w-16 h-3.5 bg-zinc-800 rounded-full" />
              </div>

              {/* Hero image */}
              <div className="relative h-28">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://picsum.photos/seed/villa-mediterranean/400/300"
                  alt="Villa Les Palmiers"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/30 to-transparent" />
                {/* Badge */}
                <div className="absolute top-2 left-2 bg-white/15 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-orange-400" />
                  <span className="text-[7px] text-white font-medium">Votre sejour</span>
                </div>
                <div className="absolute bottom-2 left-2.5">
                  <p className="text-white text-[11px] font-bold leading-tight">Villa Les Palmiers</p>
                  <p className="text-white/60 text-[8px] mt-0.5">12 chemin des Oliviers, Juan-les-Pins</p>
                </div>
              </div>

              {/* Content */}
              <div className="bg-zinc-50 px-2.5 py-2.5 space-y-2">
                {/* Horaires */}
                <p className="text-[7px] font-bold text-zinc-400 uppercase tracking-widest">Horaires</p>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="bg-white rounded-xl p-2 shadow-sm">
                    <div className="w-4 h-4 rounded-md bg-green-100 flex items-center justify-center mb-1">
                      <div className="w-2 h-2 rounded-sm bg-green-500" />
                    </div>
                    <p className="text-[7px] text-zinc-400 uppercase tracking-wider">Arrivee</p>
                    <p className="text-[13px] font-bold text-orange-500 leading-none mt-0.5">16h00</p>
                  </div>
                  <div className="bg-white rounded-xl p-2 shadow-sm">
                    <div className="w-4 h-4 rounded-md bg-orange-100 flex items-center justify-center mb-1">
                      <div className="w-2 h-2 rounded-sm bg-orange-400" />
                    </div>
                    <p className="text-[7px] text-zinc-400 uppercase tracking-wider">Depart</p>
                    <p className="text-[13px] font-bold text-orange-500 leading-none mt-0.5">11h00</p>
                  </div>
                </div>

                {/* Acces & cles */}
                <p className="text-[7px] font-bold text-zinc-400 uppercase tracking-widest pt-0.5">Acces &amp; cles</p>
                <div className="bg-white rounded-xl p-2.5 shadow-sm space-y-1.5">
                  <p className="text-[7px] font-bold text-zinc-500 uppercase tracking-wider">Code d&apos;acces</p>
                  <div className="flex items-center gap-1">
                    {["4","7","8","2"].map((d) => (
                      <div key={d} className="w-5 h-5 bg-zinc-100 rounded-md flex items-center justify-center">
                        <span className="text-[10px] font-bold text-orange-500">{d}</span>
                      </div>
                    ))}
                    <div className="ml-auto bg-orange-50 rounded-md px-1.5 py-0.5">
                      <span className="text-[7px] font-semibold text-orange-500">Copier</span>
                    </div>
                  </div>
                  <p className="text-[7px] text-zinc-400 leading-tight">Boite a cles fixee au portail, code 4782.</p>
                </div>
              </div>

              {/* Bottom nav */}
              <div className="bg-white border-t border-zinc-100 py-1.5 px-2 grid grid-cols-5">
                {[
                  { label: "Accueil", active: true },
                  { label: "Sejour", active: false },
                  { label: "Activites", active: false },
                  { label: "Urgences", active: false },
                  { label: "Depart", active: false },
                ].map((tab) => (
                  <div key={tab.label} className={`flex flex-col items-center gap-0.5 ${tab.active ? "text-orange-500" : "text-zinc-300"}`}>
                    <div className={`w-3.5 h-3 rounded ${tab.active ? "bg-orange-100" : "bg-zinc-100"}`} />
                    <span className="text-[6px] font-medium">{tab.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR preview */}
      {step.preview === "qr" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-5 p-8">
          {/* Card QR */}
          <div className="bg-white rounded-3xl shadow-lg shadow-zinc-200/60 ring-1 ring-zinc-100 p-5 flex flex-col items-center gap-4 w-56">
            {/* Logo above QR */}
            <div className="flex items-center gap-1.5">
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#f97316"/>
                <path d="M9 8h7.5c2 0 3.5.5 4.5 1.5S22.5 12 22.5 13.5c0 1-.3 1.8-.9 2.5-.4.4-.9.8-1.6 1 .9.2 1.6.7 2.2 1.3.7.8 1 1.8 1 3C23.2 23 21.3 24 18 24H9V8zm3 7h4c.8 0 1.4-.2 1.8-.5.4-.4.7-.9.7-1.5s-.2-1.1-.6-1.5c-.4-.4-1-.5-1.8-.5H12v4zm0 6.5h4.5c.9 0 1.6-.2 2.1-.6.5-.4.7-1 .7-1.7 0-.8-.3-1.3-.8-1.7-.5-.4-1.2-.5-2.1-.5H12v4.5z" fill="white"/>
              </svg>
              <span className="text-xs font-semibold text-zinc-700">Bunkly</span>
            </div>

            {/* Real QR code */}
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
              title="Voir le livret de demo"
            >
              <QRCode
                value={DEMO_URL}
                size={140}
                bgColor="#ffffff"
                fgColor="#18181b"
                level="M"
              />
            </a>

            <div className="text-center">
              <p className="text-[11px] font-semibold text-zinc-800">Villa Les Palmiers</p>
              <p className="text-[10px] text-zinc-400 mt-0.5 font-mono">Scannez pour voir la demo</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-2">
            <span className="bg-green-50 text-green-700 border border-green-100 text-[10px] font-semibold px-2.5 py-1 rounded-full">
              Lien reel
            </span>
            <span className="bg-orange-50 text-orange-700 border border-orange-100 text-[10px] font-semibold px-2.5 py-1 rounded-full">
              Telechargeable PNG/SVG
            </span>
          </div>
        </div>
      )}

      {/* Lock preview */}
      {step.preview === "lock" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6">
          <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center">
            <Lock size={24} weight="fill" className="text-white" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-xs font-semibold text-zinc-700">Acces protege</p>
            <p className="text-[10px] text-zinc-400">Non indexe par Google</p>
          </div>
          <div className="w-full space-y-1.5 mt-2">
            {["WiFi: ••••••••", "Digicode: ••••", "Adresse: ••••••••"].map((item) => (
              <div key={item} className="bg-zinc-50 border border-zinc-100 rounded-lg px-3 py-2 text-[10px] text-zinc-500 font-mono">
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ScrollStory() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (reduce) return;

    const observers: IntersectionObserver[] = [];
    const triggers = containerRef.current?.querySelectorAll("[data-step]");

    triggers?.forEach((el, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(i);
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [reduce]);

  return (
    <section id="fonctionnalites" className="bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="pt-24 pb-16 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
            Tout ce qu&apos;il faut,{" "}
            <span className="text-orange-500">rien de plus</span>
          </h2>
          <p className="mt-4 text-zinc-500 leading-relaxed">
            Bunkly est concu pour les hotes qui veulent un resultat professionnel sans y passer la journee.
          </p>
        </div>

        {/* Scroll story layout */}
        <div ref={containerRef} className="flex flex-col lg:flex-row gap-0 lg:gap-16 pb-24">
          {/* Left: scrollable steps */}
          <div className="lg:w-1/2 flex flex-col">
            {steps.map((step, i) => (
              <div
                key={step.title}
                data-step={i}
                className="min-h-[50vh] lg:min-h-[60vh] flex flex-col justify-center py-12 lg:py-0"
              >
                <motion.div
                  initial={reduce ? false : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-md"
                >
                  <div className={`w-10 h-10 ${step.accent} rounded-xl flex items-center justify-center mb-5`}>
                    <step.icon size={20} weight="fill" className="text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-zinc-500 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>

                {/* Mobile-only: inline preview */}
                <div className="lg:hidden mt-8 bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden h-64">
                  <PhonePreview step={step} stepIndex={i} />
                </div>
              </div>
            ))}
          </div>

          {/* Right: sticky phone */}
          <div className="hidden lg:flex lg:w-1/2 items-start">
            <div className="sticky top-24 w-full">
              <div className="bg-white rounded-3xl border border-zinc-100 shadow-xl shadow-zinc-200/40 overflow-hidden h-[520px] relative">
                {/* Tab bar */}
                <div className="flex border-b border-zinc-100 bg-zinc-50/80 px-4">
                  {steps.map((s, i) => (
                    <button
                      key={s.title}
                      onClick={() => setActiveStep(i)}
                      className={`px-3 py-3 text-[11px] font-medium transition-colors whitespace-nowrap ${
                        activeStep === i
                          ? "text-zinc-900 border-b-2 border-orange-500"
                          : "text-zinc-400"
                      }`}
                    >
                      {s.screenTitle}
                    </button>
                  ))}
                </div>

                {/* Preview content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full"
                  >
                    <PhonePreview step={steps[activeStep]} stepIndex={activeStep} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
