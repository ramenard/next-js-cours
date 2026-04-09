import Link from "next/link";
import { auth, signOut } from "@/auth";

type NavProps = {
  cartSummary?: React.ReactNode;
};

// Génère le trigramme depuis le nom ou l'email
function getInitials(name?: string | null, email?: string | null): string {
  if (name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return "??";
}

export async function Nav({ cartSummary }: NavProps) {
  const session = await auth();
  const user = session?.user;
  const isAdmin = user?.role === "admin";

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-xl font-semibold">
          News App
        </Link>

        <div className="flex items-center gap-6">
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="hover:underline">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                À propos
              </Link>
            </li>
            <li>
              <Link href="/demo" className="hover:underline">
                Démo
              </Link>
            </li>
            {/* Lien Admin visible uniquement pour les admins */}
            {isAdmin && (
              <li>
                <Link
                  href="/admin"
                  className="font-medium text-amber-600 hover:underline dark:text-amber-400"
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>

          {cartSummary}

          {/* Zone utilisateur */}
          {user ? (
            <div className="flex items-center gap-3">
              {/* Trigramme */}
              <div
                title={user.name ?? user.email ?? ""}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
              >
                {getInitials(user.name, user.email)}
              </div>
              {/* Déconnexion via Server Action */}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  Déconnexion
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Connexion
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}