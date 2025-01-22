import Link from "next/link"
import { Navs } from "."

const Menu = ({ navs, menu }: { navs: Navs; menu: boolean }) => {
    return (
        <ul
            className={`w-full h-[100vh] bg-black fixed top-0 left-0 flex flex-col justify-center items-center gap-4 z-50 transition duration-500 ${
                !menu ? "translate-x-full" : "translate-x-0"
            }`}
        >
            {navs.map((nav) => (
                <li className='text-white' key={nav.key}>
                    <Link href={nav.href}>{nav.name}</Link>
                </li>
            ))}
        </ul>
    )
}

export default Menu
