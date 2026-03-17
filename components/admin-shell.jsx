import Link from "next/link";
import { sidebarLinks } from "@/lib/admin-data";

export function AdminLayoutShell({ children }) {
  return (
    <div className="admin-shell grid gap-6 py-8 lg:grid-cols-[0.22fr_1fr]">
      <aside className="admin-card h-fit p-5">
        <p className="text-2xl font-black tracking-[0.14em] text-teal-700">FLASH</p>
        <p className="mt-2 text-sm text-stone-500">Admin dashboard</p>
        <nav className="mt-6 space-y-2">
          {sidebarLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block rounded-2xl px-4 py-3 text-sm text-stone-700 transition hover:bg-teal-50">
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div>{children}</div>
    </div>
  );
}

export function AdminPageHeader({ title, copy }) {
  return (
    <div className="admin-card p-6">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-teal-700">Operations</p>
      <h1 className="mt-3 text-3xl font-bold text-stone-900">{title}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">{copy}</p>
    </div>
  );
}
