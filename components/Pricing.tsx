"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check, X } from "@phosphor-icons/react";

const APP_URL = "https://app.bunkly.co/fr";

const plans = [
  {
    name: "Gratuit",
    price: null,
    desc: "Pour decouvrir Bunkly et creer vos premiers livrets.",
    cta: "Commencer gratuitement",
    ctaHref: APP_URL,
    highlight: false,
    features: [
      { text: "3 livrets d'accueil", ok: true },
      { text: "Tous les modules", ok: true },
      { text: "Apercu en temps reel", ok: true },
      { text: "Lien de partage", ok: true },
      { text: "Publication en ligne", ok: false },
      { text: "QR code", ok: false },
    ],
  },
  {
    name: "Actif",
    price: "9",
    desc: "Pour les hotes qui veulent publier et partager.",
    cta: "Demarrer l'essai",
    ctaHref: APP_URL,
    highlight: true,
    features: [
      { text: "Livrets illimites", ok: true },
      { text: "Tous les modules", ok: true },
      { text: "Apercu en temps reel", ok: true },
      { text: "Publication en ligne", ok: true },
      { text: "QR code automatique", ok: true },
      { text: "URL personnalisee", ok: true },
    ],
  },
];

export function Pricing() {
  const reduce = useReducedMotion();

  return (
    <section id="tarifs" className="bg-stone-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: heading */}
          <div className="lg:pt-8">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
              Un prix honnete,<br />
              <span className="text-orange-500">sans surprise</span>
            </h2>
            <p className="mt-4 text-zinc-500 leading-relaxed max-w-sm">
              Commencez gratuitement. Passez au plan Actif quand vous voulez publier et partager votre livret.
            </p>

            <div className="mt-8 bg-orange-50 border border-orange-100 rounded-2xl p-5">
              <p className="text-sm font-semibold text-orange-900">Pas de carte bancaire pour commencer</p>
              <p className="text-sm text-orange-700 mt-1">
                Le plan gratuit est sans limite de duree. Passez au plan Actif uniquement quand vous en avez besoin.
              </p>
            </div>
          </div>

          {/* Right: cards */}
          <div className="flex flex-col sm:flex-row gap-4">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`flex-1 rounded-3xl p-6 flex flex-col gap-6 ${
                  plan.highlight
                    ? "bg-zinc-900 shadow-xl shadow-zinc-300/30"
                    : "bg-white border border-zinc-150 shadow-sm"
                }`}
              >
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-widest ${plan.highlight ? "text-orange-400" : "text-zinc-400"}`}>
                    {plan.name}
                  </p>
                  <div className="mt-3 flex items-baseline gap-1">
                    {plan.price ? (
                      <>
                        <span className={`text-4xl font-bold ${plan.highlight ? "text-white" : "text-zinc-900"}`}>
                          {plan.price}€
                        </span>
                        <span className={`text-sm ${plan.highlight ? "text-zinc-400" : "text-zinc-400"}`}>/mois</span>
                      </>
                    ) : (
                      <span className={`text-4xl font-bold ${plan.highlight ? "text-white" : "text-zinc-900"}`}>
                        Gratuit
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mt-2 leading-relaxed ${plan.highlight ? "text-zinc-400" : "text-zinc-500"}`}>
                    {plan.desc}
                  </p>
                </div>

                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-2.5">
                      {f.ok ? (
                        <Check size={14} weight="bold" className={plan.highlight ? "text-orange-400" : "text-orange-500"} />
                      ) : (
                        <X size={14} weight="bold" className="text-zinc-300" />
                      )}
                      <span className={`text-sm ${
                        f.ok
                          ? plan.highlight ? "text-zinc-200" : "text-zinc-700"
                          : "text-zinc-300"
                      }`}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.ctaHref}
                  className={`inline-flex items-center justify-center font-semibold px-5 py-3 rounded-xl text-sm active:scale-[0.97] transition-all ${
                    plan.highlight
                      ? "bg-orange-500 text-white hover:bg-orange-400"
                      : "bg-zinc-900 text-white hover:bg-zinc-800"
                  }`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
