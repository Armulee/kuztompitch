"use client"
import Image from "next/image"
import Link from "next/link"
import { FaChevronDown, FaX } from "react-icons/fa6"
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
                    {navs.map((nav) =>
                        nav.children ? (
                            <li key={nav.key} className='relative group'>
                                <div className='cursor-pointer text-white underline underline-offset-2 flex items-center gap-1'>
                                    {nav.name}
                                    <FaChevronDown className='w-2 h-2 text-white' />
                                </div>
                                <ul className='absolute top-full left-0 bg-black p-2 hidden group-hover:block space-y-1 min-w-[180px] z-50'>
                                    {nav.children.map((child, index) => (
                                        <li
                                            key={child.key}
                                            onClick={() =>
                                                smoothScrollTo(child, index)
                                            }
                                            className={`cursor-pointer px-3 py-1 hover:bg-white/10 ${
                                                active === child.key
                                                    ? "text-white underline"
                                                    : "text-white/70"
                                            }`}
                                        >
                                            {child.name}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ) : (
                            <li key={nav.key}>
                                <Link
                                    href={nav.href!}
                                    className='cursor-pointer text-white/70 hover:text-white'
                                >
                                    {nav.name}
                                </Link>
                            </li>
                        )
                    )}

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
