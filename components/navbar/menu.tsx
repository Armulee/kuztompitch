import Link from "next/link"
import { Nav, smoothScrollTo } from "."
import { FaChevronDown } from "react-icons/fa6"

const Menu = ({
    navs,
    menu,
    setMenu,
    active,
}: {
    navs: Nav[]
    menu: boolean
    active: string
    setMenu: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    return (
        <ul
            className={`w-full h-[100dvh] fixed top-0 left-0 flex flex-col justify-center items-center gap-6 z-50 transition-all duration-500 ${
                !menu
                    ? "translate-x-full opacity-0"
                    : "translate-x-0 opacity-100"
            }`}
            style={{
                background:
                    "radial-gradient(ellipse at 30% 20%, rgba(139,92,246,0.15), transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(6,182,212,0.1), transparent 50%), #050505",
            }}
        >
            <li
                className='text-xl font-display flex items-center gap-2 cursor-pointer text-white/90 hover:text-white transition-colors'
                onClick={() => {
                    smoothScrollTo("home")
                    setMenu(false)
                }}
            >
                Home <FaChevronDown className='w-3 h-3' />
            </li>
            <ul className='text-center space-y-3'>
                {navs.map((nav) => (
                    <li
                        className={`text-sm cursor-pointer transition-colors duration-200 ${
                            active === nav.id
                                ? "text-white"
                                : "text-white/50 hover:text-white/80"
                        }`}
                        key={nav.id}
                        onClick={() => {
                            smoothScrollTo(nav.id)
                            setMenu(false)
                        }}
                    >
                        {nav.name}
                    </li>
                ))}
            </ul>

            <li className='text-lg'>
                <Link
                    href={"/confirm-payment"}
                    className='cursor-pointer text-white/60 hover:text-white transition-colors'
                >
                    Confirm Payment
                </Link>
            </li>

            <li>
                <Link href={"/customize"}>
                    <button className='bg-gradient-accent text-white text-lg px-10 py-3 rounded-full font-medium hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all duration-300 hover:scale-105'>
                        Try Customize
                    </button>
                </Link>
            </li>
        </ul>
    )
}

export default Menu
