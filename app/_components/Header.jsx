import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div>
    <header className="bg-gray-900">
    <div className="mx-auto flex h-16 max-w-screen-xl items-center  gap-9 ">
        <Image src='/logo.svg' width={50} height={50} alt='logo'></Image>

        <div className="flex flex-1 items-center justify-end md:justify-between">
        <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
            <li>
                <a
                className=" transition  text-white hover:text-white/75"
                href="#"
                >
                Home
                </a>
            </li>

            <li>
                <a
                className=" transition  text-white hover:text-white/75"
                href="/upload"
                >
                Upload
                </a>
            </li>

            <li>
                <a
                className=" transition  text-white hover:text-white/75"
                href="#"
                >
                About Us
                </a>
            </li>

            <li>
                <a
                className=" transition  text-white hover:text-white/75"
                href="#"
                >
                Contact Us
                </a>
            </li>

            
            </ul>
        </nav>

        <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
            <a
                className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
                href="/upload"
            >
                Get Started
            </a>
            </div>

            <button
            className="block rounded  p-2.5  transition  md:hidden bg-gray-800 text-white hover:text-white/75"
            >
            <span className="sr-only">Toggle menu</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            </button>
        </div>
        </div>
    </div>
    </header>
</div>
  )
}

export default Header