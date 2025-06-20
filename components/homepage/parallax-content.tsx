import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image, { StaticImageData } from "next/image"

const IMG_PADDING = 12

const ParallaxContent = ({
    imgUrl,
    subheading,
    heading,
}: {
    imgUrl: StaticImageData
    subheading: string
    heading: string
}) => {
    return (
        <div className='relative h-[150vh]'>
            <StickyImage imgUrl={imgUrl} />
            <OverlayCopy heading={heading} subheading={subheading} />
        </div>
    )
}

const StickyImage = ({ imgUrl }: { imgUrl: StaticImageData }) => {
    const targetRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["end end", "end start"],
    })

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

    return (
        <motion.div
            style={{
                height: "70vh",
                top: IMG_PADDING,
                scale,
            }}
            ref={targetRef}
            className='sticky z-0 overflow-hidden rounded-b-3xl'
        >
            <Image
                alt=''
                className='w-full h-full'
                style={{
                    objectFit: "cover",
                    objectPosition: "90%",
                }}
                src={imgUrl}
            />
            <motion.div
                className='absolute inset-0 bg-neutral-950/70'
                style={{
                    opacity,
                }}
            />
        </motion.div>
    )
}

const OverlayCopy = ({
    subheading,
    heading,
}: {
    subheading: string
    heading: string
}) => {
    const targetRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [250, -250])
    const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0])

    return (
        <motion.div
            style={{
                y,
                opacity,
            }}
            ref={targetRef}
            className='absolute left-0 top-0 flex h-[70vh] w-full flex-col items-center justify-center text-white'
        >
            <p className='mb-2 text-center text-xl md:mb-4 md:text-3xl'>
                {subheading}
            </p>
            <p className='text-center text-4xl font-bold md:text-7xl'>
                {heading}
            </p>
        </motion.div>
    )
}

export default ParallaxContent
