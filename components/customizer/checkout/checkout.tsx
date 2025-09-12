import { useCustomizeContext } from "../provider"
import Details from "./details"
import Delivery from "./delivery"
import Address from "./address"
import Payment from "./payment"
import Total from "./total"
import { useState } from "react"
import { FaChevronLeft } from "react-icons/fa6"
import Discount from "./discount"

export default function MainCheckout({
    setSubmitted,
    setOrderNumber,
    setLoading,
    total,
    setDiscount,
    totalDiscount,
}: {
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
    setOrderNumber: React.Dispatch<React.SetStateAction<string>>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    total: number
    setDiscount: React.Dispatch<React.SetStateAction<number>>
    totalDiscount: number
}) {
    const {
        setCheckout,
        capsule,
        topHandle,
        bottomHandle,
        snapshot,
        logos,
        model,
    } = useCustomizeContext()
    const [fullName, setFullName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [telephone, setTelephone] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [deliveryDate, setDeliveryDate] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const timestamp = new Date().toISOString()
        const data = {
            timestamp,
            fullName,
            email: email.trim().toLowerCase(),
            telephone,
            snapshot,
            decals: logos.map((logo) => ({
                fileName: logo.fileName,
                image: logo.image, // Only original image, not cloneImage
                position: logo.position,
                aspect: logo.aspect,
                flipHorizontal: logo.flipHorizontal,
                flipVertical: logo.flipVertical,
            })),
            model,
            capsule: `${capsule.style}, ${capsule.color} (${capsule.colorName})`,
            topHandle: `${topHandle.style}, ${topHandle.color} (${topHandle.colorName})`,
            bottomHandle: `${bottomHandle.style}, ${bottomHandle.color} (${bottomHandle.colorName})`,
            address,
            deliveryDate,
            pricing: total,
            status: "On Hold",
        }

        try {
            const response = await fetch("/api/submit-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()
            if (result.success) {
                setSubmitted(true)
                setOrderNumber(result.orderNumber)
            } else {
                alert("Submission failed. Please Retry.")
            }
            setLoading(false)
        } catch (error) {
            const err = error as Error
            console.error("Error submitting to Google Sheet", err.message)
            alert(err.message)
        }
    }
    return (
        <>
            {/* Header */}
            <div className='mb-4 bg-white rounded-xl shadow-sm border border-slate-200'>
                <div className='w-full flex items-center justify-center p-6 relative'>
                    {!deliveryDate && (
                        <button
                            onClick={() => setCheckout(false)}
                            className='absolute left-0 flex items-center gap-2 text-slate-600 hover:translate-x-1 transition duration-300 px-3 py-2'
                        >
                            <FaChevronLeft className='h-4 w-4' />
                            Back
                        </button>
                    )}
                    <h4 className='text-2xl font-bold text-slate-900'>
                        Order Summary
                    </h4>
                </div>
            </div>

            <form onSubmit={handleSubmit} className='grid md:grid-cols-3 gap-8'>
                {/* Main Content */}
                <div className='md:col-span-2 space-y-8'>
                    <Details />
                    <Delivery
                        deliveryDate={deliveryDate}
                        setDeliveryDate={setDeliveryDate}
                    />
                    <Address
                        setFullName={setFullName}
                        setEmail={setEmail}
                        setTelephone={setTelephone}
                        setAddress={setAddress}
                    />
                    <Payment />
                    <Discount setDiscount={setDiscount} />
                </div>

                {/* Order Summary Sidebar */}
                <Total total={total} totalDiscount={totalDiscount} />
            </form>
        </>
    )
}
