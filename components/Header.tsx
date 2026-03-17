import Link from "next/link";

export default async function Header() {
  return (
    <header className="sticky top-0 z-50">
      <nav className=" bg-gray-700 h-20 flex items-center justify-end gap-10">
        <Link href='/' className="hover:underline">
          Home
        </Link>
        <Link href='/' className="hover:underline">
          About
        </Link>
        <Link href='/' className="pr-8 hover:underline">
          Admin
        </Link>
      </nav>
    </header>
  )
}