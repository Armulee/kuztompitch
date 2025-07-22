import Link from "next/link"

export default function NotFound() {
    return (
        <main className='w-full h-screen my-auto flex flex-col items-center justify-center'>
            <h2 className='text-5xl'>404 Error</h2>
            <p>Sorry, this page is not exists.</p>
            <Link href={"/"} className='mt-3 underline underline-offset-2'>
                Back to main page
            </Link>
        </main>
    )
}
