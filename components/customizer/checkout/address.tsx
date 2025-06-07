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
        <div className='bg-white rounded-xl shadow-sm border border-slate-200'>
            <div className='p-6 border-b border-slate-200'>
                <h2 className='flex items-center gap-2 text-xl font-semibold text-slate-900'>
                    <FaUser className='h-5 w-5 text-purple-600' />
                    Delivery Details
                </h2>
            </div>
            <div className='p-6 space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                        <label
                            htmlFor='name'
                            className='block text-sm font-medium text-slate-700'
                        >
                            Full Name <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative'>
                            <FaUser className='absolute left-3 top-3 h-4 w-4 text-slate-400' />
                            <input
                                required
                                id='name'
                                name='fullName'
                                type='text'
                                className='w-full pl-10 pr-4 py-2 border text-slate-700 border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors'
                                placeholder='Enter your full name'
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label
                            htmlFor='email'
                            className='block text-sm font-medium text-slate-700'
                        >
                            Email Address{" "}
                            <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative'>
                            <FaEnvelope className='absolute left-3 top-3 h-4 w-4 text-slate-400' />
                            <input
                                required
                                id='email'
                                name='email'
                                type='email'
                                className='w-full pl-10 pr-4 py-2 text-slate-700 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors'
                                placeholder='your@email.com'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label
                            htmlFor='phone'
                            className='block text-sm font-medium text-slate-700'
                        >
                            Phone Number <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative'>
                            <FaPhone className='absolute left-3 top-3 h-4 w-4 text-slate-400' />
                            <input
                                required
                                id='phone'
                                name='telephone'
                                type='tel'
                                className='w-full pl-10 pr-4 py-2 text-slate-700 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors'
                                placeholder='0XX-XXX-XXXX'
                                onChange={(e) => setTelephone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label
                            htmlFor='address'
                            className='block text-sm font-medium text-slate-700'
                        >
                            Address <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative'>
                            <FaRoad className='absolute left-3 top-3 h-4 w-4 text-slate-400' />
                            <input
                                required
                                id='address'
                                name='address'
                                type='text'
                                className='w-full pl-10 pr-4 py-2 text-slate-700 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors'
                                placeholder='Address'
                                onChange={(e) => setAddr(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label
                            htmlFor='district'
                            className='block text-sm font-medium text-slate-700'
                        >
                            District <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative'>
                            <FaMapPin className='absolute left-3 top-3 h-4 w-4 text-slate-400' />
                            <input
                                required
                                id='district'
                                name='district'
                                type='text'
                                className='w-full pl-10 pr-4 py-2 text-slate-700 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors'
                                placeholder='District'
                                onChange={(e) => setDistrict(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label
                            htmlFor='subDistrict'
                            className='block text-sm font-medium text-slate-700'
                        >
                            Sub district <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative'>
                            <FaMapPin className='absolute left-3 top-3 h-4 w-4 text-slate-400' />
                            <input
                                required
                                id='subDstrict'
                                name='subDistrict'
                                type='text'
                                className='w-full pl-10 pr-4 py-2 text-slate-700 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors'
                                placeholder='Sub District'
                                onChange={(e) => setSubDistrict(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label
                            htmlFor='province'
                            className='block text-sm font-medium text-slate-700'
                        >
                            Province <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative'>
                            <FaMapMarkerAlt className='absolute left-3 top-3 h-4 w-4 text-slate-400' />
                            <input
                                required
                                id='province'
                                name='province'
                                type='text'
                                className='w-full pl-10 pr-4 py-2 text-slate-700 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors'
                                placeholder='Bangkok'
                                onChange={(e) => setProvince(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label
                            htmlFor='postal'
                            className='block text-sm font-medium text-slate-700'
                        >
                            Postal Code <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative'>
                            <FaHashtag className='absolute left-3 top-3 h-4 w-4 text-slate-400' />
                            <input
                                required
                                id='postal'
                                type='text'
                                className='w-full pl-10 pr-4 py-2 text-slate-700 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors'
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
