// import Link from "next/link"
import { Nav, smoothScrollTo } from "."

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
            {navs.map((nav, index) => (
                <li
                    className={`text-white cursor-pointer hover:underline ${
                        active === nav.key
                            ? "underline text-white"
                            : "hover:underline text-white/70"
                    }`}
                    key={nav.key}
                    onClick={() => {
                        smoothScrollTo(nav, index)
                        setMenu(false)
                    }}
                >
                    {nav.name}
                </li>
            ))}
        </ul>
    )
}

export default Menu
