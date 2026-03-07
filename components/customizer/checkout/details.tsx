import Image from "next/image"
import Link from "next/link"
import { useCustomizeContext } from "../provider"
import Skeleton from "react-loading-skeleton"
import { FaBox, FaPencil } from "react-icons/fa6"

const models = ["SM58", "BETA58", "KSM8", "NXN8"]
const Details = () => {
    const {
        pricing,
        snapshot,
        loading,
        capsule,
        topHandle,
        bottomHandle,
        model,
        setModel,
        logos,
    } = useCustomizeContext()
    const parts = [capsule, topHandle, bottomHandle]
    return (
        <div className='bg-surface-light rounded-2xl border border-white/[0.06]'>
            <div className='p-6 border-b border-white/[0.06]'>
                <h2 className='flex items-center gap-2 text-xl font-semibold text-white'>
                    <FaBox className='h-5 w-5 text-accent-purple' />
                    Your Custom Microphone
                </h2>
            </div>
            <div className='p-4 sm:p-6'>
                <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
                    <div className='relative mx-auto sm:mx-0 flex-shrink-0'>
                        <Image
                            width={150}
                            height={200}
                            className='h-[160px] w-[120px] sm:h-[200px] sm:w-[150px] object-cover bg-surface border border-white/10 rounded-xl'
                            src={snapshot || "/placeholder.svg"}
                            alt='Custom Microphone'
                        />
                        <span className='absolute -top-2 -right-2 bg-gradient-accent text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:py-1 rounded-full'>
                            Custom
                        </span>
                    </div>

                    <div className='flex-1 space-y-3 sm:space-y-4 text-center sm:text-left'>
                        <div>
                            <div className='w-full sm:w-[180px]'>
                                <label className='mr-2 text-zinc-300 text-sm'>
                                    Select your model:{" "}
                                    <span className='text-red-400'>*</span>
                                </label>

                                <select
                                    required
                                    onChange={(e) => setModel(e.target.value)}
                                    value={model}
                                    className='text-white mb-2 bg-white/5 border border-white/10 rounded-lg px-2 py-1 outline-none focus:border-accent-purple transition-colors'
                                >
                                    {models.map((m, index) => (
                                        <option key={index} value={m} className='bg-surface-light text-white'>
                                            {m}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <p className='text-zinc-400 text-sm'>
                                Professional Dynamic Microphone
                            </p>
                        </div>

                        <div className='pt-1 sm:pt-2'>
                            <span className='text-2xl sm:text-3xl font-bold gradient-text'>
                                {pricing.toLocaleString()}&#3647;
                            </span>
                        </div>
                    </div>
                </div>

                <div className='space-y-3 mt-4'>
                    <div className='flex items-center gap-2'>
                        <h4 className='font-semibold text-white'>
                            Customizations:
                        </h4>
                        <Link
                            href='/customize'
                            className='flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-accent-purple hover:text-accent-purple/80 transition-colors'
                        >
                            <FaPencil className='h-3.5 w-3.5' />
                            Edit
                        </Link>
                    </div>
                    {loading ? (
                        <div className='space-y-2'>
                            <Skeleton count={3} height={20} baseColor='#1a1a1a' highlightColor='#2a2a2a' />
                        </div>
                    ) : (
                        <div className='space-y-2'>
                            {parts.map((part, index) => (
                                <div
                                    key={index}
                                    className='w-fit flex items-center gap-3 p-2 bg-white/5 rounded-lg'
                                >
                                    <span className='font-medium text-zinc-300 min-w-[80px] text-sm'>
                                        {part.name}:
                                    </span>
                                    <div
                                        className='w-6 h-6 rounded-full border-2 border-white/20'
                                        style={{
                                            backgroundColor: Array.isArray(
                                                part.displayColor
                                            )
                                                ? part.displayColor[0]
                                                : part.displayColor,
                                        }}
                                    />
                                    <span className='text-zinc-400 text-sm'>
                                        {part.colorName}
                                    </span>
                                </div>
                            ))}
                            {logos.length > 0 && (
                                <Link
                                    href='/customize/checkout/decals'
                                    className='block w-fit p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors'
                                >
                                    <span className='text-sm text-accent-purple hover:underline'>
                                        View {logos.length} decal image{logos.length !== 1 ? "s" : ""} →
                                    </span>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Details
