"use client";

import Link from "next/link";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { BunklyLogo } from "./BunklyLogo";

const APP_URL = "https://app.bunkly.co/fr";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" aria-label="Bunkly accueil">
          <BunklyLogo size={30} />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#fonctionnalites"
            className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            Fonctionnalités
          </Link>
          <Link
            href="#tarifs"
            className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            Tarifs
          </Link>
          <Link
            href="/blog"
            className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            Blog
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={`${APP_URL}`}
            className="text-sm text-zinc-700 hover:text-zinc-900 transition-colors px-4 py-2"
          >
            Connexion
          </a>
          <a
            href={`${APP_URL}`}
            className="text-sm font-medium bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 active:scale-[0.98] transition-all"
          >
            Commencer gratuitement
          </a>
        </div>

        <button
          className="md:hidden p-2 text-zinc-700"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-zinc-100 bg-white px-6 py-4 flex flex-col gap-4">
          <Link
            href="#fonctionnalites"
            className="text-sm text-zinc-700"
            onClick={() => setOpen(false)}
          >
            Fonctionnalités
          </Link>
          <Link
            href="#tarifs"
            className="text-sm text-zinc-700"
            onClick={() => setOpen(false)}
          >
            Tarifs
          </Link>
          <Link
            href="/blog"
            className="text-sm text-zinc-700"
            onClick={() => setOpen(false)}
          >
            Blog
          </Link>
          <hr className="border-zinc-100" />
          <a
            href={`${APP_URL}`}
            className="text-sm text-zinc-700"
          >
            Connexion
          </a>
          <a
            href={`${APP_URL}`}
            className="text-sm font-medium bg-orange-500 text-white px-4 py-2.5 rounded-lg text-center"
          >
            Commencer gratuitement
          </a>
        </div>
      )}
    </header>
  );
}
