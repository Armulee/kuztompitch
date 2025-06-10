import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import { useCustomizeContext } from "../provider"

const Head = () => {
    const { part, setPart, setFocusedPart, setFocusStartTime } =
        useCustomizeContext()
    const proceedTo = (part: string) => {
        setPart(part)
        setFocusedPart(part)
        setFocusStartTime(performance.now())
    }
    const next = () => {
        if (part === "Capsule") {
            proceedTo("Top Handle")
        } else if (part === "Top Handle") {
            proceedTo("Bottom Handle")
        }
    }
    const prev = () => {
        if (part === "Bottom Handle") {
            proceedTo("Top Handle")
        } else if (part === "Top Handle") {
            proceedTo("Capsule")
        }
    }
    return (
        <div
            id='head'
            className='w-full text-center mb-2 flex justify-center items-center z-10 absolute bottom-0'
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
