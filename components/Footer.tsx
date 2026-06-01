import Link from "next/link";
import { BunklyLogo } from "./BunklyLogo";

const APP_URL = "https://app.bunkly.co/fr";

export function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col gap-3">
            <BunklyLogo size={28} />
            <p className="text-sm text-zinc-400 max-w-[28ch]">
              Livrets d&apos;accueil digitaux pour les hotes modernes.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <Link href="#fonctionnalites" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
              Fonctionnalites
            </Link>
            <Link href="#tarifs" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
              Tarifs
            </Link>
            <Link href="/blog" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
              Blog
            </Link>
            <a href={APP_URL} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
              Connexion
            </a>
            <a href="mailto:hello@bunkly.co" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-xs text-zinc-400">
            &copy; {new Date().getFullYear()} Bunkly. Tous droits reserves.
          </p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors">
              Mentions legales
            </Link>
            <Link href="/confidentialite" className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors">
              Confidentialite
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
