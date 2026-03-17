import Link from "next/link";

export default async function Header() {
  return (
    <header className="sticky top-0 z-50">
      <nav className=" bg-gray-700 h-20 flex items-center justify-end gap-10">
        <Link href='/'>
          Home
        </Link>
        <Link href='/' className="pr-8">
          About
        </Link>
      </nav>
    </header>
  )
}