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
            className='w-full mb-3 flex justify-center items-center z-10 absolute bottom-0'
        >
            <div className='flex items-center gap-0.5 sm:gap-1 bg-white/[0.06] backdrop-blur-md rounded-full px-0.5 sm:px-1 py-0.5 sm:py-1 border border-white/[0.08]'>
                <button
                    onClick={prev}
                    disabled={part === "Capsule"}
                    className='w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all disabled:opacity-20 hover:bg-white/10'
                >
                    <FaChevronLeft className='w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/80' />
                </button>
                <span className='text-white text-[10px] sm:text-xs font-medium px-2 sm:px-3 min-w-[80px] sm:min-w-[100px] text-center'>
                    {part}
                </span>
                <button
                    onClick={next}
                    disabled={part === "Bottom Handle"}
                    className='w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all disabled:opacity-20 hover:bg-white/10'
                >
                    <FaChevronRight className='w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/80' />
                </button>
            </div>
        </div>
    )
}

export default Head
