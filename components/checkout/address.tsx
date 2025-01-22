const Address = () => {
    return (
        <>
            <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Delivery Details
            </h2>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                    <label
                        htmlFor='name'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                    >
                        {" "}
                        Name <span className='text-red-500'>*</span>
                    </label>
                    <input
                        type='text'
                        id='name'
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500'
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor='email'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                    >
                        {" "}
                        Email <span className='text-red-500'>*</span>
                    </label>
                    <input
                        type='email'
                        id='email'
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500'
                        required
                    />
                </div>

                <div>
                    <div className='mb-2 flex items-center gap-2'>
                        <label
                            htmlFor='country-input'
                            className='block text-sm font-medium text-gray-900 dark:text-white'
                        >
                            {" "}
                            Country <span className='text-red-500'>*</span>
                        </label>
                    </div>
                    <input
                        id='country-input'
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 appearance-none text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500'
                    />
                </div>

                <div>
                    <div className='mb-2 flex items-center gap-2'>
                        <label
                            htmlFor='city-input'
                            className='block text-sm font-medium text-gray-900 dark:text-white'
                        >
                            {" "}
                            City <span className='text-red-500'>*</span>
                        </label>
                    </div>
                    <input
                        id='city-input'
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 appearance-none text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500'
                    />
                </div>

                <div>
                    <label
                        htmlFor='phone-input'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                    >
                        {" "}
                        Phone Number <span className='text-red-500'>*</span>
                    </label>

                    <div className='relative w-full'>
                        <input
                            type='text'
                            id='phone-input'
                            className='z-20 block w-full rounded-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500'
                            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                            required
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor='email'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                    >
                        {" "}
                        Postal Code <span className='text-red-500'>*</span>
                    </label>
                    <input
                        type='email'
                        id='email'
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500'
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor='company_name'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                    >
                        {" "}
                        Company name{" "}
                    </label>
                    <input
                        type='text'
                        id='company_name'
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500'
                    />
                </div>

                <div>
                    <label
                        htmlFor='vat_number'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                    >
                        {" "}
                        VAT number{" "}
                    </label>
                    <input
                        type='text'
                        id='vat_number'
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500'
                    />
                </div>
            </div>
        </>
    )
}

export default Address
