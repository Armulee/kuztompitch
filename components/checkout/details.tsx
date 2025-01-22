// import { MdDiscount } from "react-icons/md"
import { Microphone } from "../customizer/3d-viewer/microphone"
import Viewer from "../customizer/3d-viewer/viewer"
import { useCustomizeContext } from "../customizer/provider"
import Skeleton from "react-loading-skeleton"
// import { FaMapPin } from "react-icons/fa6"

const Details = () => {
    const { pricing, capsule, topHandle, bottomHandle, loading } =
        useCustomizeContext()
    const parts = [capsule, topHandle, bottomHandle]

    return (
        <>
            <div className='flex border rounded bg-[#eeeeee] p-2'>
                <div className='h-[160px] w-[120px] md:min-w-[200px] md:w-full bg-white border drop-shadow rounded mr-4 md:m-0'>
                    <Viewer noOrbit className='w-full' position={[0, 1, 5]}>
                        <Microphone position={[0, -1.8, 0]} scale={0.678} />
                    </Viewer>
                </div>
                <div className='py-4'>
                    <div className='font-bold text-[#222222] text-lg mb-2'>
                        Shure SM50
                    </div>

                    {/* This Whole Part */}
                    <div className='w-full h-[55px]'>
                        {loading ? (
                            <span className='h-full flex items-center'>
                                <Skeleton baseColor='#222222' count={3} />
                            </span>
                        ) : (
                            parts.map((part) => (
                                <div
                                    key={`part-${part}`}
                                    className='text-[#777777] mb-1.5 flex items-center gap-2 text-[10px]'
                                >
                                    <span className='font-semibold'>
                                        {part.name}:
                                    </span>
                                    <span
                                        className='w-[30px] h-[15px] rounded border border-black'
                                        style={{
                                            backgroundColor: Array.isArray(
                                                part.displayColor
                                            )
                                                ? part.displayColor[0]
                                                : part.displayColor,
                                        }}
                                    />
                                    <span>{part.colorName}</span>
                                </div>
                            ))
                        )}
                    </div>

                    <div className='text-black text-xl font-bold mt-3'>
                        {pricing} Baht
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details
