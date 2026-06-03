"use client";

import { motion, useReducedMotion } from "motion/react";

const steps = [
  {
    num: "1",
    title: "Creez votre livret",
    desc: "Remplissez les modules guides : arrivee, regles, WiFi, activites, urgences. Tout est structure, rien a inventer.",
  },
  {
    num: "2",
    title: "Publiez en un clic",
    desc: "Votre livret est en ligne instantanement avec une URL unique. Un QR code est genere automatiquement.",
  },
  {
    num: "3",
    title: "Partagez avec vos voyageurs",
    desc: "Envoyez le lien ou affichez le QR code dans le logement. Accessible depuis n'importe quel telephone.",
  },
];

export function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section id="comment-ca-marche" className="bg-zinc-900 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
              Pret en 10 minutes,<br />
              <span className="text-orange-400">vraiment</span>
            </h2>
            <p className="mt-4 text-zinc-400 leading-relaxed max-w-sm">
              Pas de configuration technique. Pas de formation. Juste un livret professionnel que vos voyageurs adorent.
            </p>
          </motion.div>

          {/* Right: steps */}
          <div className="flex flex-col gap-0">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={reduce ? false : { opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-5 group"
              >
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-white">{s.num}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-zinc-700 my-2" />
                  )}
                </div>
                <div className={`pb-10 ${i === steps.length - 1 ? "" : ""}`}>
                  <h3 className="text-base font-semibold text-white">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
