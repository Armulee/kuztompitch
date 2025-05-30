import { useCustomizeContext } from "../../provider"

const useGlossy = () => {
    const { part } = useCustomizeContext()
    return {
        // Monochromatics
        Monochromatics: [
            { name: "Bright White", code: "#ffffff", color: "#ffffff" },
            { name: "Snow White", code: "#f2f0eb", color: "#f2f0eb" },
            { name: "Blanc de Blanc", code: "#e7e9e7", color: "#e7e9e7" },
            { name: "Silver Birch", code: "#d2cfc4", color: "#d2cfc4" },
            { name: "Glacier Gray", code: "#c5c6c7", color: "#c5c6c7" },
            { name: "High-Rise", code: "#aeb2b5", color: "#aeb2b5" },
            {
                name: part === "Capsule" ? "Default" : "Rockstar",
                code: "#9a9a9a",
                color: "#9a9a9a",
            },
            { name: "Castor Gray", code: "#646762", color: "#646762" },
            { name: "Black Ink", code: "#44413c", color: "#44413c" },
            { name: "Jet Black", code: "#2d2c2f", color: "#2d2c2f" },
        ],
        // Yellow
        Yellow: [
            { name: "Transparent Yellow", code: "#f4ecc2", color: "#f4ecc2" },
            { name: "Dusty Yellow", code: "#d4cc9a", color: "#d4cc9a" },
            { name: "Sunlight", code: "#edd59e", color: "#edd59e" },
            { name: "Cornsilk", code: "#edc373", color: "#edc373" },
            { name: "Rich Gold", code: "#c8b273", color: "#c8b273" },
            { name: "Sulphur", code: "#ddb614", color: "#ddb614" },
            { name: "Golden Yellow", code: "#cb8e16", color: "#cb8e16" },
            { name: "Limelight", code: "#f0e87d", color: "#f0e87d" },
            { name: "Lemon", code: "#f3bf08", color: "#f3bf08" },
            { name: "Blazing Yellow", code: "#fee715", color: "#fee715" },
            { name: "Olive Oil", code: "#a98b2d", color: "#a98b2d" },
        ],
        // orange
        Orange: [
            { name: "Peach", code: "#f2a987", color: "#f2a987" },
            { name: "Caramel Cream", code: "#f4ba94", color: "#f4ba94" },
            { name: "Blazing Orange", code: "#ff8c55", color: "#ff8c55" },
            { name: "Orange Popsicle", code: "#ff7913", color: "#ff7913" },
            { name: "Firecracker", code: "#f36944", color: "#f36944" },
            { name: "Mango", code: "#b75e41", color: "#b75e41" },
            { name: "Dusty Orange", code: "#e27a53", color: "#e27a53" },
            { name: "Copper", code: "#c47e5a", color: "#c47e5a" },
            { name: "Chili", code: "#be5141", color: "#be5141" },
            { name: "Bossa Nova", code: "#973a36", color: "#973a36" },
        ],
        // red
        Red: [
            { name: "Salmon", code: "#faaa94", color: "#faaa94" },
            { name: "Burnt Coral", code: "#e9897e", color: "#e9897e" },
            { name: "Shell Pink", code: "#f88180", color: "#f88180" },
            { name: "Faded Rose", code: "#bf6464", color: "#bf6464" },
            { name: "Red Clay", code: "#ce4d42", color: "#ce4d42" },
            { name: "Poppy Red", code: "#dc343b", color: "#dc343b" },
            { name: "Molten Lava", code: "#b5332e", color: "#b5332e" },
            { name: "True Red", code: "#bf1932", color: "#bf1932" },
            { name: "Crimson", code: "#ae0e36", color: "#ae0e36" },
        ],
        // pink
        Pink: [
            { name: "Pink Lady", code: "#efc1d6", color: "#efc1d6" },
            { name: "Quartz Pink", code: "#efa6aa", color: "#efa6aa" },
            { name: "Wild Orchid", code: "#d979a2", color: "#d979a2" },
            { name: "Bubblegum", code: "#ea738d", color: "#ea738d" },
            { name: "Hot Pink", code: "#e55982", color: "#e55982" },
            { name: "Raspberry", code: "#d32e5e", color: "#d32e5e" },
            { name: "Very Berry", code: "#b73275", color: "#b73275" },
        ],
        // violet
        Violet: [
            { name: "Mauve Mist", code: "#c49bd4", color: "#c49bd4" },
            { name: "Violet Tulip", code: "#afa4ce", color: "#afa4ce" },
            { name: "Ultra Violet", code: "#5f4b8b", color: "#5f4b8b" },
            { name: "Lilac Chiffon", code: "#ca80b1", color: "#ca80b1" },
            { name: "Violet", code: "#c17fb5", color: "#c17fb5" },
            { name: "Mulberry", code: "#a76c97", color: "#a76c97" },
            { name: "Red Violet", code: "#a35776", color: "#a35776" },
            { name: "Radiant Orchid", code: "#ad5e99", color: "#ad5e99" },
            { name: "Amethyst", code: "#864d75", color: "#864d75" },
            { name: "Sparkling Grape", code: "#773376", color: "#773376" },
            { name: "Grape Juice", code: "#682961", color: "#682961" },
            { name: "Blackberry Wine", code: "#4d3246", color: "#4d3246" },
            { name: "Purple Velvet", code: "#41354d", color: "#41354d" },
        ],
        // blue
        Blue: [
            { name: "Cosmic Sky", code: "#aaaac4", color: "#aaaac4" },
            { name: "Skylight", code: "#a1c8db", color: "#a1c8db" },
            { name: "Easter Egg", code: "#919bc9", color: "#919bc9" },
            { name: "Blue Ice", code: "#70789b", color: "#70789b" },
            { name: "Violet Storm", code: "#5c619d", color: "#5c619d" },
            { name: "Cornflower Blue", code: "#7391c8", color: "#7391c8" },
            { name: "Ultramarine", code: "#5b7ebd", color: "#5b7ebd" },
            { name: "Royal Blue", code: "#3d428b", color: "#3d428b" },
            { name: "Medival Blue", code: "#29304e", color: "#29304e" },
            { name: "Estate Blue", code: "#233658", color: "#233658" },
            { name: "Classic Blue", code: "#0f4c81", color: "#0f4c81" },
            { name: "Dark Blue", code: "#305679", color: "#305679" },
            { name: "Dazzling Blue", code: "#3850a0", color: "#3850a0" },
            { name: "Hawaiian Ocean", code: "#008db9", color: "#008db9" },
        ],
    }
}

export default useGlossy
