"use client"
import Image from "next/image"
import Link from "next/link"
import { FaX } from "react-icons/fa6"
import { GiHamburgerMenu } from "react-icons/gi"
import whiteLogo from "../../public/assets/white-logo.png"
import { Nav, smoothScrollTo } from "."

const Header = ({
    navs,
    menu,
    active,
    setMenu,
}: {
    navs: Nav[]
    active: string
    menu: boolean
    setMenu: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    return (
        <header className='w-full bg-black fixed top-0 py-2 z-50'>
            <div className='flex justify-between items-center container'>
                <Link href='/'>
                    <Image className='w-auto h-[50px]' src={whiteLogo} alt='' />
                </Link>
                <ul className='md:flex gap-4 hidden text-sm'>
                    {navs.map((nav) => (
                        <li
                            key={nav.key}
                            onClick={() => smoothScrollTo(nav)}
                            className={`cursor-pointer underline-offset-4 transition duration-500 ${
                                active === nav.key
                                    ? "underline text-white"
                                    : "hover:underline text-white/70"
                            }`}
                        >
                            {nav.name}
                        </li>
                    ))}
                    <li>
                        <Link
                            className='rounded-full bg-white text-black px-6 py-2 text-sm'
                            href={"/customize"}
                        >
                            <button>Customize</button>
                        </Link>
                    </li>
                </ul>
                <div
                    className='md:hidden z-50'
                    onClick={() => setMenu((prev) => !prev)}
                >
                    {menu ? (
                        <FaX className='pointer-events-none' />
                    ) : (
                        <GiHamburgerMenu className='pointer-events-none' />
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
