import Image  from 'next/image'
import Link from 'next/link'

function Navbar() {
  return (
    <header className="flex items-center gap-6 px-4 py-4 text-white bg-black/40 backdrop-blur-xl border-b border-white/10">
      <Link href="/">
        <Image src="/icons/logo.png" alt="Logo" width={24} height={24} />
      </Link>

      <div className="ml-auto flex items-center gap-6">
        <Link href="/">Home</Link>
        <Link href="/events">Events</Link>
        <Link href="/create-event">Create Event</Link>
      </div>
    </header>
  )
}

export default Navbar

