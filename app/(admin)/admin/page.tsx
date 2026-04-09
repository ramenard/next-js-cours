import Link from "next/link";
import { auth } from "@/auth";

export default async function AdminDashboard() {
  const session = await auth();
  const user = session?.user;

  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        {user?.role === "admin" && (
          <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-400">
            Admin
          </span>
        )}
      </div>
      <p className="mt-2 text-zinc-400">
        Bienvenue dans l&apos;espace d&apos;administration.
      </p>

      {/* Infos session */}
      {user && (
        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <p className="text-sm font-medium text-zinc-400">Session active</p>
          <dl className="mt-3 space-y-1.5 text-sm">
            <div className="flex gap-4">
              <dt className="w-16 text-zinc-500">Nom</dt>
              <dd className="text-zinc-100">{user.name ?? "—"}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-16 text-zinc-500">Email</dt>
              <dd className="text-zinc-100">{user.email}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-16 text-zinc-500">Rôle</dt>
              <dd className="font-medium text-amber-400">{user.role ?? "user"}</dd>
            </div>
          </dl>
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[{ label: "Produits", value: "—", href: "/admin/produits" }].map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition hover:border-zinc-700 hover:bg-zinc-800/50"
          >
            <p className="text-sm text-zinc-500">{card.label}</p>
            <p className="mt-1 text-2xl font-semibold text-white">{card.value}</p>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-xs text-zinc-600">
        Pour changer le rôle d&apos;un utilisateur :{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5">npx prisma studio</code>
      </p>
    </div>
  );
}