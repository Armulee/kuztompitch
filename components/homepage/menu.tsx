// import Link from "next/link"
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
            className={`w-full h-[100vh] bg-black fixed top-0 left-0 flex flex-col justify-center items-center gap-4 z-50 transition duration-500 ${
                !menu ? "translate-x-full" : "translate-x-0"
            }`}
        >
            <li
                className='text-lg flex items-center gap-2 cursor-pointer hover:underline'
                onClick={() => {
                    smoothScrollTo("home")
                    setMenu(false)
                }}
            >
                Home <FaChevronDown className='w-3 h-3' />
            </li>
            <ul className='text-center'>
                {navs.map((nav) => (
                    <li
                        className={`text-xs text-white cursor-pointer mb-2 hover:underline ${
                            active === nav.id
                                ? "underline text-white"
                                : "hover:underline text-white/70"
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

            <li className='text-lg mb-4'>
                <Link
                    href={"/confirm-payment"}
                    className='cursor-pointer text-white/70 hover:text-white'
                >
                    Confirm Payment
                </Link>
            </li>

            <li>
                <Link
                    className='rounded-full bg-white text-xl text-black px-10 py-2 text-sm'
                    href={"/customize"}
                >
                    <button>Try Customize</button>
                </Link>
            </li>
        </ul>
    )
}

export default Menu
