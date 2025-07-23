/**
 * Creates a clone of an image with transparent padding around it
 * @param originalImageUrl - Base64 data URL of the original image
 * @param paddingPercent - Percentage of padding to add (default: 25%)
 * @returns Promise<string> - Base64 data URL of the cloned image with padding
 */
export const createImageWithPadding = (
    originalImageUrl: string,
    paddingPercent: number = 25
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                
                if (!ctx) {
                    reject(new Error('Failed to get canvas context'))
                    return
                }
                
                // Calculate padding dimensions
                const originalWidth = img.width
                const originalHeight = img.height
                const paddingX = Math.floor(originalWidth * (paddingPercent / 100))
                const paddingY = Math.floor(originalHeight * (paddingPercent / 100))
                
                // Set new canvas dimensions with padding
                canvas.width = originalWidth + (paddingX * 2)
                canvas.height = originalHeight + (paddingY * 2)
                
                // Clear canvas with transparent background
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                
                // Draw the original image centered with padding
                ctx.drawImage(
                    img,
                    paddingX, // x position (offset by padding)
                    paddingY, // y position (offset by padding)
                    originalWidth, // width (original size)
                    originalHeight // height (original size)
                )
                
                // Convert to base64 data URL with PNG format to preserve transparency
                const clonedImageUrl = canvas.toDataURL('image/png')
                resolve(clonedImageUrl)
                
            } catch (error) {
                reject(error)
            }
        }
        
        img.onerror = () => {
            reject(new Error('Failed to load image'))
        }
        
        img.src = originalImageUrl
    })
}