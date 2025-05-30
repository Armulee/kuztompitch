// import { MdDiscount } from "react-icons/md"
import Image from "next/image"
import { Microphone } from "../3d-viewer/microphone"
import Viewer from "../3d-viewer/viewer"
import { useCustomizeContext } from "../provider"
import Skeleton from "react-loading-skeleton"
import { FaBox } from "react-icons/fa6"
// import { FaMapPin } from "react-icons/fa6"

const Details = () => {
    const { pricing, snapshot, loading, capsule, topHandle, bottomHandle } =
        useCustomizeContext()
    const parts = [capsule, topHandle, bottomHandle]
    return (
        <div className='bg-white rounded-xl shadow-sm border border-slate-200'>
            <div className='p-6 border-b border-slate-200'>
                <h2 className='flex items-center gap-2 text-xl font-semibold text-slate-900'>
                    <FaBox className='h-5 w-5 text-blue-600' />
                    Your Custom Microphone
                </h2>
            </div>
            <div className='p-6'>
                <div className='flex gap-6'>
                    <div className='relative'>
                        <Image
                            width={150}
                            height={200}
                            className='h-[200px] w-[150px] object-cover bg-white border border-slate-200 rounded-xl shadow-sm'
                            src={snapshot || "/placeholder.svg"}
                            alt='Custom Shure SM50'
                        />
                        <span className='absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full'>
                            Custom
                        </span>
                    </div>

                    <div className='flex-1 space-y-4'>
                        <div>
                            <h3 className='text-xl font-bold text-slate-900 mb-2'>
                                Shure SM50
                            </h3>
                            <p className='text-slate-600'>
                                Professional Dynamic Microphone
                            </p>
                        </div>

                        <div className='space-y-3'>
                            <h4 className='font-semibold text-slate-900'>
                                Customizations:
                            </h4>
                            {loading ? (
                                <div className='space-y-2'>
                                    <Skeleton count={3} height={20} />
                                </div>
                            ) : (
                                <div className='space-y-2'>
                                    {parts.map((part, index) => (
                                        <div
                                            key={index}
                                            className='flex items-center gap-3 p-2 bg-slate-50 rounded-lg'
                                        >
                                            <span className='font-medium text-slate-700 min-w-[80px]'>
                                                {part.name}:
                                            </span>
                                            <div
                                                className='w-6 h-6 rounded-full border-2 border-white shadow-sm'
                                                style={{
                                                    backgroundColor:
                                                        Array.isArray(
                                                            part.displayColor
                                                        )
                                                            ? part
                                                                  .displayColor[0]
                                                            : part.displayColor,
                                                }}
                                            />
                                            <span className='text-slate-600'>
                                                {part.colorName}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className='pt-2'>
                            <span className='text-3xl font-bold text-slate-900'>
                                {pricing} ฿
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details
