import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import { useCustomizeContext } from "../../provider"

const Head = () => {
    const { part, setPart } = useCustomizeContext()
    const next = () => {
        if (part === "Capsule") {
            setPart("Top Handle")
        } else if (part === "Top Handle") {
            setPart("Bottom Handle")
        }
    }
    const prev = () => {
        if (part === "Bottom Handle") {
            setPart("Top Handle")
        } else if (part === "Top Handle") {
            setPart("Capsule")
        }
    }
    return (
        <div
            id='head'
            className='w-full text-center mb-2 flex justify-center items-center z-10'
        >
            <FaChevronLeft
                className={`${
                    part === "Capsule" ? "text-[#dddddd]" : "text-black"
                }`}
                onClick={prev}
            />
            <b className='text-black mx-4 text-sm'>{part}</b>
            <FaChevronRight
                className={`${
                    part === "Bottom Handle" ? "text-[#dddddd]" : "text-black"
                }`}
                onClick={next}
            />
        </div>
    )
}

export default Head
