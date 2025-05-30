const Voucher = () => {
    return (
        <div>
            <label
                htmlFor='voucher'
                className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            >
                {" "}
                Enter a gift card, voucher or promotional code{" "}
            </label>
            <div className='flex max-w-md items-center gap-4'>
                <input
                    type='text'
                    id='voucher'
                    className='block w-full rounded-lg border border-gray-300 bg-transparent p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500'
                    placeholder=''
                    required
                />
                <button
                    type='button'
                    className='flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                >
                    Apply
                </button>
            </div>
        </div>
    )
}

export default Voucher
