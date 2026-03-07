"use client"

import { useCustomizeContext } from "@/components/customizer/provider"
import { FaChevronLeft } from "react-icons/fa6"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function DecalsPage() {
    const { logos } = useCustomizeContext()
    const router = useRouter()

    if (logos.length === 0) {
        return (
            <section className="bg-[#0a0a0a] min-h-screen">
                <div className="mx-auto max-w-4xl px-3 sm:px-4 py-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6"
                    >
                        <FaChevronLeft className="h-4 w-4" />
                        Back
                    </button>
                    <p className="text-zinc-400">No decals uploaded.</p>
                </div>
            </section>
        )
    }

    return (
        <section className="bg-[#0a0a0a] min-h-screen">
            <div className="mx-auto max-w-4xl px-3 sm:px-4 py-4">
                <div className="mb-6 flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        <FaChevronLeft className="h-4 w-4" />
                        Back
                    </button>
                    <h1 className="text-xl font-bold text-white">
                        Your Decal Images
                    </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {logos.map((logo) => (
                        <div
                            key={logo.id}
                            className="bg-surface-light rounded-xl border border-white/[0.06] overflow-hidden"
                        >
                            <div className="aspect-square relative bg-surface">
                                <Image
                                    src={logo.image}
                                    alt={logo.fileName}
                                    fill
                                    className="object-contain p-2"
                                    unoptimized
                                />
                            </div>
                            <div className="p-3 border-t border-white/[0.06]">
                                <p className="text-sm text-zinc-300 truncate">
                                    {logo.fileName}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
