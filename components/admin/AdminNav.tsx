"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BunklyLogo } from "@/components/BunklyLogo";
import { Article, Globe, SignOut } from "@phosphor-icons/react";

const navItems = [
  { href: "/admin", label: "Articles", icon: Article },
  { href: "/admin/seo", label: "SEO", icon: Globe },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-zinc-100 flex flex-col">
      <div className="p-6 border-b border-zinc-100">
        <BunklyLogo size={28} />
        <p className="text-xs text-zinc-400 mt-2 font-medium">Espace admin</p>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-orange-50 text-orange-600"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              }`}
            >
              <item.icon size={18} weight={active ? "fill" : "regular"} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-500 hover:text-red-600 hover:bg-red-50 w-full transition-colors"
        >
          <SignOut size={18} />
          Deconnexion
        </button>
      </div>
    </aside>
  );
}
