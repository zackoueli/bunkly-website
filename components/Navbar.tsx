"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { List, X } from "@phosphor-icons/react";
import { BunklyLogo } from "./BunklyLogo";

const APP_URL = "https://app.bunkly.co/fr";

export function Navbar({ forceSolid = false }: { forceSolid?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = !forceSolid && !scrolled && !open;

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-6 pointer-events-none">
      <nav
        className="pointer-events-auto w-full max-w-5xl h-14 flex items-center justify-between px-5 transition-all duration-300"
        style={{
          backgroundColor: transparent ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "999px",
          border: transparent ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(0,0,0,0.07)",
          boxShadow: transparent ? "none" : "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <Link href="/" aria-label="Bunkly accueil">
          {/* Logo texte blanc sur hero, noir après scroll */}
          <div className="flex items-center gap-2">
            <img
              src="/Logo.png"
              alt="Bunkly logo"
              width={30}
              height={30}
              className="object-contain"
            />
            <span
              className="text-[18px] font-semibold tracking-tight transition-colors duration-300"
              style={{ color: transparent ? "#ffffff" : "#18181b" }}
            >
              Bunkly
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {["Fonctionnalités", "Tarifs", "Blog"].map((label) => (
            <Link
              key={label}
              href={label === "Blog" ? "/blog" : `#${label === "Fonctionnalités" ? "fonctionnalites" : "tarifs"}`}
              className="text-sm font-medium transition-colors duration-300"
              style={{ color: transparent ? "rgba(255,255,255,0.85)" : "#52525b" }}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={APP_URL}
            className="text-sm font-medium transition-colors duration-300 px-4 py-2 rounded-xl"
            style={{ color: transparent ? "rgba(255,255,255,0.85)" : "#52525b" }}
          >
            Connexion
          </a>
          <a
            href={APP_URL}
            className="text-sm font-semibold px-5 py-2.5 rounded-xl transition-all active:scale-[0.97]"
            style={{
              backgroundColor: transparent ? "rgba(255,255,255,0.15)" : "#f97316",
              color: "#ffffff",
              border: transparent ? "1px solid rgba(255,255,255,0.35)" : "none",
              backdropFilter: transparent ? "blur(8px)" : "none",
            }}
          >
            Commencer gratuitement
          </a>
        </div>

        <button
          className="md:hidden p-2 transition-colors"
          style={{ color: transparent ? "#ffffff" : "#18181b" }}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="pointer-events-auto md:hidden mt-2 mx-auto w-full max-w-5xl bg-white rounded-3xl border border-zinc-100 shadow-lg px-6 py-4 flex flex-col gap-4">
          <Link href="#fonctionnalites" className="text-sm text-zinc-700" onClick={() => setOpen(false)}>
            Fonctionnalites
          </Link>
          <Link href="#tarifs" className="text-sm text-zinc-700" onClick={() => setOpen(false)}>
            Tarifs
          </Link>
          <Link href="/blog" className="text-sm text-zinc-700" onClick={() => setOpen(false)}>
            Blog
          </Link>
          <hr className="border-zinc-100" />
          <a href={APP_URL} className="text-sm text-zinc-700">Connexion</a>
          <a
            href={APP_URL}
            className="text-sm font-semibold bg-orange-500 text-white px-4 py-2.5 rounded-xl text-center"
          >
            Commencer gratuitement
          </a>
        </div>
      )}
    </header>
  );
}
