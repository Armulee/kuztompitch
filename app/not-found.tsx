import Link from "next/link"

export default function NotFound() {
    return (
        <main className='w-full h-screen flex flex-col items-center justify-center relative overflow-hidden'>
            <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent-purple/10 blur-[150px]' />
                <div className='absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-accent-cyan/8 blur-[120px]' />
            </div>
            <div className='relative text-center'>
                <h2 className='text-8xl md:text-9xl font-bold gradient-text font-display mb-4'>
                    404
                </h2>
                <p className='text-xl text-zinc-400 mb-8'>
                    Sorry, this page does not exist.
                </p>
                <Link
                    href={"/"}
                    className='inline-block px-8 py-3 bg-gradient-accent text-white rounded-full font-medium hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] transition-all duration-300 hover:scale-105'
                >
                    Back to main page
                </Link>
            </div>
        </main>
    )
}
