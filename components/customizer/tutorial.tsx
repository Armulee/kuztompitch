import { useEffect, useState } from "react"
import Joyride, { CallBackProps } from "react-joyride"
import { useCustomizeContext } from "./provider"

const Tutorial = () => {
    const { tour, setTour } = useCustomizeContext()
    const steps = [
        {
            target: "#swatches",
            content:
                "Swipe or scroll to the left or right to explore more shades.",
            disableBeacon: true,
        },
        {
            target: "#swatches",
            content:
                "Swipe or scroll to the up or down to explore more colors.",
            disableBeacon: true,
        },
        {
            target: "#head",
            content:
                "To change editable component part, you can change it here by clicking the arrow.",
            disableBeacon: true,
        },
        {
            target: "#side-menu",
            content:
                "You can also change the component part by clicking each part of it right here as well.",
            disableBeacon: true,
        },
        {
            target: "#checkout",
            content:
                "After complete editing, click here to proceed to checkout.",
            disableBeacon: true,
        },
    ]

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true) // Set mounted to true after the component has mounted
    }, [])

    if (!isMounted) {
        return null // Return null until the component has mounted
    }

    const handleCallback = (data: CallBackProps) => {
        const { status } = data
        if (status === "finished" || status === "skipped") {
            setTour(false)
        }
    }
    return (
        <Joyride
            steps={steps}
            continuous
            showSkipButton
            showProgress
            debug
            run={tour}
            styles={{
                options: {
                    arrowColor: "#fff",
                    backgroundColor: "#fff",
                    textColor: "#000",
                    overlayColor: "rgba(0, 0, 0, 0.6)",
                },
            }}
            callback={handleCallback}
        />
    )
}

export default Tutorial
