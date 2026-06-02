import Link from "next/link";

const APP_URL = "https://app.bunkly.co/fr";

export function Footer() {
  return (
    <footer className="pt-8">
      <div
        className="relative overflow-hidden"
        style={{ minHeight: "480px" }}
      >
        {/* Image paysage — illustration style forêt/nature */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://picsum.photos/seed/dark-forest-mountains-mist/1600/700"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dégradé : BLANC opaque en haut, transparent au milieu, noir en bas */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, #ffffff 0%, #ffffff 15%, rgba(255,255,255,0.0) 45%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.88) 100%)",
          }}
          aria-hidden
        />

        {/* Contenu ancré en bas */}
        <div className="absolute bottom-0 inset-x-0 px-10 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">

            {/* Logo + tagline */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <img
                  src="/Logo.png"
                  alt="Bunkly"
                  width={26}
                  height={26}
                  className="object-contain"
                />
                <span className="text-base font-semibold text-white tracking-tight">
                  Bunkly
                </span>
              </div>
              <p className="text-sm text-white/55 leading-relaxed max-w-[20ch]">
                Livrets d&apos;accueil digitaux pour les hotes modernes.
              </p>
              <a
                href="mailto:hello@bunkly.co"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                hello@bunkly.co
              </a>
            </div>

            {/* Produit */}
            <div className="flex flex-col gap-2.5">
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest pb-2 border-b border-white/10">
                Produit
              </p>
              {[
                { label: "Fonctionnalites", href: "/#fonctionnalites" },
                { label: "Tarifs", href: "/#tarifs" },
                { label: "Blog", href: "/blog" },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="text-base text-white/65 hover:text-white transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Compte */}
            <div className="flex flex-col gap-2.5">
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest pb-2 border-b border-white/10">
                Compte
              </p>
              {[
                { label: "Connexion", href: APP_URL },
                { label: "Creer un compte", href: APP_URL },
                { label: "Mon espace", href: APP_URL },
              ].map((item) => (
                <a key={item.label} href={item.href} className="text-base text-white/65 hover:text-white transition-colors">
                  {item.label}
                </a>
              ))}
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-2.5">
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest pb-2 border-b border-white/10">
                Legal
              </p>
              {[
                { label: "Mentions legales", href: "/mentions-legales" },
                { label: "Confidentialite", href: "/confidentialite" },
                { label: "CGU", href: "/cgu" },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="text-base text-white/65 hover:text-white transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-sm text-white/30">
              &copy; {new Date().getFullYear()} Bunkly. Tous droits reserves.
            </p>
            <p className="text-sm text-white/30">
              Fait avec soin pour les hotes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
