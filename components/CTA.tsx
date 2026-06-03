"use client";

import { motion, useReducedMotion } from "motion/react";

const APP_URL = "https://app.bunkly.co/fr";

export function CTA() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-orange-500 py-24 overflow-hidden relative">
      {/* Background texture circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-400/40 blur-2xl" aria-hidden />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-orange-600/30 blur-2xl" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          className="max-w-2xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.05]">
            Votre premier livret est gratuit.
          </h2>
          <p className="mt-4 text-orange-100 text-lg leading-relaxed max-w-md">
            Rejoignez les hotes qui offrent une meilleure experience a leurs voyageurs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={APP_URL}
              className="inline-flex items-center justify-center font-semibold bg-white text-orange-600 px-7 py-3.5 rounded-2xl hover:bg-orange-50 active:scale-[0.97] transition-all text-sm shadow-lg shadow-orange-700/20"
            >
              Creer mon compte gratuitement
            </a>
            <a
              href={APP_URL}
              className="inline-flex items-center justify-center font-medium text-orange-100 border border-orange-400 px-7 py-3.5 rounded-2xl hover:bg-orange-600 active:scale-[0.97] transition-all text-sm"
            >
              Deja un compte ? Se connecter
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
