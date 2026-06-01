"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  QrCode,
  DeviceMobile,
  PencilSimple,
  Globe,
  Lock,
  Lightning,
} from "@phosphor-icons/react";
import Image from "next/image";

const features = [
  {
    icon: QrCode,
    title: "QR code automatique",
    desc: "Chaque livret genere un QR code unique. Imprimez-le et placez-le dans votre logement.",
  },
  {
    icon: DeviceMobile,
    title: "100% mobile",
    desc: "Vos voyageurs consultent le livret depuis leur telephone, sans telechargement.",
  },
  {
    icon: PencilSimple,
    title: "Editeur simple",
    desc: "Remplissez vos informations une fois, modifiez a tout moment en quelques clics.",
  },
  {
    icon: Globe,
    title: "Multilingue",
    desc: "Accueillez vos voyageurs internationaux dans leur langue.",
  },
  {
    icon: Lock,
    title: "Informations protegees",
    desc: "Codes WiFi, digicodes et adresses restent prives, jamais indexes par Google.",
  },
  {
    icon: Lightning,
    title: "Pret en 10 minutes",
    desc: "Modules preconfigurees : arrivee, regles du sejour, cuisine, activites, urgences.",
  },
];

export function Features() {
  const reduce = useReducedMotion();

  return (
    <section id="fonctionnalites" className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-xl mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
            Tout ce dont vous avez besoin,{" "}
            <span className="text-orange-500">sans le superflu</span>
          </h2>
          <p className="mt-4 text-zinc-500 leading-relaxed">
            Bunkly est concu pour les hotes qui veulent un livret professionnel sans perdre du temps.
          </p>
        </div>

        {/* Split layout: big visual left + feature list right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Visual: editor screenshot */}
          <motion.div
            className="lg:col-span-3"
            initial={reduce ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-zinc-200 bg-white">
              {/* Browser chrome */}
              <div className="bg-zinc-100 px-4 py-3 flex items-center gap-2 border-b border-zinc-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-zinc-300" />
                  <div className="w-3 h-3 rounded-full bg-zinc-300" />
                  <div className="w-3 h-3 rounded-full bg-zinc-300" />
                </div>
                <div className="flex-1 bg-white rounded-md h-5 mx-4 flex items-center px-3">
                  <span className="text-[10px] text-zinc-400">app.bunkly.co/editor</span>
                </div>
              </div>
              <Image
                src="https://picsum.photos/seed/bunkly-editor-ui/900/600"
                alt="Interface de l'editeur Bunkly"
                width={900}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Feature grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="flex gap-4 group"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="mt-0.5 shrink-0 w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                  <f.icon size={18} weight="duotone" className="text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{f.title}</p>
                  <p className="text-sm text-zinc-500 mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
