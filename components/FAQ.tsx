"use client";

import { useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const faqs = [
  {
    q: "Mon livret est-il accessible sans application ?",
    a: "Oui. Vos voyageurs consultent le livret depuis n'importe quel navigateur mobile, sans telechargement ni compte a creer.",
  },
  {
    q: "Mes informations sensibles sont-elles protegees ?",
    a: "Absolument. Les livrets ne sont jamais indexes par Google. Les codes WiFi, digicodes et adresses restent prives et accessibles uniquement via le lien ou QR code que vous partagez.",
  },
  {
    q: "Puis-je creer des livrets pour plusieurs logements ?",
    a: "Oui. Chaque logement a son propre livret. Le plan gratuit permet 3 livrets, le plan Actif permet un nombre illimite.",
  },
  {
    q: "Comment fonctionne le QR code ?",
    a: "Apres publication, un QR code unique est genere pour votre livret. Telechargez-le et imprimez-le - placez-le dans votre logement ou envoyez-le dans votre message d'arrivee.",
  },
  {
    q: "Puis-je modifier mon livret apres publication ?",
    a: "Oui, a tout moment. Les modifications sont visibles immediatement par vos voyageurs, sans nouvelle publication.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className={`border border-zinc-100 rounded-2xl overflow-hidden transition-colors ${open ? "bg-white" : "bg-stone-50 hover:bg-white"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-zinc-900">{q}</span>
        <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${open ? "bg-orange-500 text-white" : "bg-zinc-100 text-zinc-500"}`}>
          {open ? <Minus size={12} weight="bold" /> : <Plus size={12} weight="bold" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-zinc-500 leading-relaxed px-5 pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
              Questions frequentes
            </h2>
            <p className="mt-4 text-zinc-500 leading-relaxed">
              Une autre question ?{" "}
              <a href="mailto:hello@bunkly.co" className="text-orange-500 hover:underline">
                Ecrivez-nous
              </a>
            </p>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-2">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
