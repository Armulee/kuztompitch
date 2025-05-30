import { useCustomizeContext } from "../../provider"

const useMetalic = () => {
    const { part } = useCustomizeContext()
    return {
        Monochromatics: [
            {
                name: "Bright White",
                code: "#ffffff",
                color: ["#fafafa", "#a3a3a3"],
            },
            {
                name: "Snow White",
                code: "#f2f0eb",
                color: ["#CBCDCE", "#A0A2A3"],
            },
            {
                name: "Glacier Gray",
                code: "#c5c6c7",
                color: ["#A0A2A3", "#838383"],
            },
            {
                name: "Hise-Rise",
                code: "#aeb2b5",
                color: ["#838383", "#5A5C5E"],
            },
            {
                name: part === "Capsule" ? "Default" : "Rockstar",
                code: "#9a9a9a",
                color: ["#707070", "#292929"],
            },
            {
                name: "Castor Gray",
                code: "#646762",
                color: ["#aaaaaa", "#666666"],
            },
            {
                name: "Black Ink",
                code: "#44413c",
                color: ["#aaaaaa", "#666666"],
            },
            {
                name: "Jet Black",
                code: "#2d2c2f",
                color: ["#aaaaaa", "#666666"],
            },
            {
                name: part !== "Capsule" ? "Default" : "Pirate Black",
                code: "#1b1b1b",
                color: ["#aaaaaa", "#666666"],
            },
            {
                name: "True Black",
                code: "#000000",
                color: ["#aaaaaa", "#666666"],
            },
        ],
    }
}

export default useMetalic
