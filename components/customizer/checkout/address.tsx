import { useEffect, useState } from "react"
import { FaMapMarkerAlt } from "react-icons/fa"
import {
    FaEnvelope,
    FaHashtag,
    FaMapPin,
    FaPhone,
    FaRoad,
    FaUser,
} from "react-icons/fa6"

const inputClass = 'w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-accent-purple/50 focus:border-accent-purple/50 outline-none transition-all'
const iconClass = 'absolute left-3 top-3 h-4 w-4 text-zinc-500'
const labelClass = 'block text-sm font-medium text-zinc-300'

const Address = ({
    setFullName,
    setEmail,
    setTelephone,
    setAddress,
}: {
    setFullName: React.Dispatch<React.SetStateAction<string>>
    setEmail: React.Dispatch<React.SetStateAction<string>>
    setTelephone: React.Dispatch<React.SetStateAction<string>>
    setAddress: React.Dispatch<React.SetStateAction<string>>
}) => {
    const [addr, setAddr] = useState<string>("")
    const [district, setDistrict] = useState<string>("")
    const [subDistrict, setSubDistrict] = useState<string>("")
    const [province, setProvince] = useState<string>("")
    const [postal, setPostal] = useState<string>("")

    useEffect(() => {
        const fullAddress = [addr, district, subDistrict, province, postal]
            .filter(Boolean)
            .join(", ")
        setAddress(fullAddress)
    }, [addr, subDistrict, district, province, postal, setAddress])

    return (
        <div className='bg-surface-light rounded-2xl border border-white/[0.06]'>
            <div className='p-6 border-b border-white/[0.06]'>
                <h2 className='flex items-center gap-2 text-xl font-semibold text-white'>
                    <FaUser className='h-5 w-5 text-accent-purple' />
                    Delivery Details
                </h2>
            </div>
            <div className='p-6 space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                        <label htmlFor='name' className={labelClass}>
                            Full Name <span className='text-red-400'>*</span>
                        </label>
                        <div className='relative'>
                            <FaUser className={iconClass} />
                            <input
                                required
                                id='name'
                                name='fullName'
                                type='text'
                                className={inputClass}
                                placeholder='Enter your full name'
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor='email' className={labelClass}>
                            Email Address <span className='text-red-400'>*</span>
                        </label>
                        <div className='relative'>
                            <FaEnvelope className={iconClass} />
                            <input
                                required
                                id='email'
                                name='email'
                                type='email'
                                className={inputClass}
                                placeholder='your@email.com'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor='phone' className={labelClass}>
                            Phone Number <span className='text-red-400'>*</span>
                        </label>
                        <div className='relative'>
                            <FaPhone className={iconClass} />
                            <input
                                required
                                id='phone'
                                name='telephone'
                                type='tel'
                                className={inputClass}
                                placeholder='0XX-XXX-XXXX'
                                onChange={(e) => setTelephone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor='address' className={labelClass}>
                            Address <span className='text-red-400'>*</span>
                        </label>
                        <div className='relative'>
                            <FaRoad className={iconClass} />
                            <input
                                required
                                id='address'
                                name='address'
                                type='text'
                                className={inputClass}
                                placeholder='Address'
                                onChange={(e) => setAddr(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor='district' className={labelClass}>
                            District <span className='text-red-400'>*</span>
                        </label>
                        <div className='relative'>
                            <FaMapPin className={iconClass} />
                            <input
                                required
                                id='district'
                                name='district'
                                type='text'
                                className={inputClass}
                                placeholder='District'
                                onChange={(e) => setDistrict(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor='subDistrict' className={labelClass}>
                            Sub district <span className='text-red-400'>*</span>
                        </label>
                        <div className='relative'>
                            <FaMapPin className={iconClass} />
                            <input
                                required
                                id='subDstrict'
                                name='subDistrict'
                                type='text'
                                className={inputClass}
                                placeholder='Sub District'
                                onChange={(e) => setSubDistrict(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor='province' className={labelClass}>
                            Province <span className='text-red-400'>*</span>
                        </label>
                        <div className='relative'>
                            <FaMapMarkerAlt className={iconClass} />
                            <input
                                required
                                id='province'
                                name='province'
                                type='text'
                                className={inputClass}
                                placeholder='Bangkok'
                                onChange={(e) => setProvince(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor='postal' className={labelClass}>
                            Postal Code <span className='text-red-400'>*</span>
                        </label>
                        <div className='relative'>
                            <FaHashtag className={iconClass} />
                            <input
                                required
                                id='postal'
                                type='text'
                                className={inputClass}
                                placeholder='10110'
                                onChange={(e) => setPostal(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Address
