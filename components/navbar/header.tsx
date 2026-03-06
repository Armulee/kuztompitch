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
        <header className='w-full fixed top-0 z-50 py-3'>
            <div className='flex justify-between items-center container'>
                <div className='flex items-center justify-between w-full glass rounded-2xl px-6 py-2.5'>
                    <Link href='/'>
                        <Image
                            className='w-auto h-[40px] hover:opacity-80 transition-opacity'
                            src={whiteLogo}
                            alt='Kuztompitch'
                        />
                    </Link>
                    <ul className='md:flex gap-6 hidden text-sm items-center'>
                        <li className="relative group after:content-[''] after:absolute after:top-full after:left-0 after:w-full after:h-2">
                            <div
                                className='cursor-pointer text-white/90 hover:text-white flex items-center gap-1.5 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-accent-purple after:to-accent-cyan after:transition-all after:duration-300 group-hover:after:w-full'
                                onClick={() => smoothScrollTo("home")}
                            >
                                Home
                                <FaChevronDown className='w-2 h-2 text-white/60 group-hover:text-white/90 transition-colors' />
                            </div>
                            <ul className='absolute top-full left-0 mt-2 glass-strong rounded-xl p-2 hidden group-hover:block space-y-0.5 min-w-[180px] z-50'>
                                {navs.map((nav) => (
                                    <li
                                        key={nav.id}
                                        onClick={() => smoothScrollTo(nav.id)}
                                        className={`cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 ${
                                            active === nav.id
                                                ? "text-white bg-white/10"
                                                : "text-white/60 hover:text-white hover:bg-white/5"
                                        }`}
                                    >
                                        {nav.name}
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li>
                            <Link
                                href={"/confirm-payment"}
                                className='cursor-pointer text-white/60 hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-accent-purple after:to-accent-cyan after:transition-all after:duration-300 hover:after:w-full'
                            >
                                Confirm Payment
                            </Link>
                        </li>

                        <li>
                            <Link href={"/customize"}>
                                <button className='bg-gradient-accent text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300 hover:scale-105'>
                                    Customize
                                </button>
                            </Link>
                        </li>
                    </ul>
                    <div
                        className='md:hidden z-50 p-2 cursor-pointer'
                        onClick={() => setMenu((prev) => !prev)}
                    >
                        {menu ? (
                            <FaX className='pointer-events-none text-white w-4 h-4' />
                        ) : (
                            <GiHamburgerMenu className='pointer-events-none text-white w-5 h-5' />
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
