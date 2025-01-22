const Payment = () => {
    return (
        <div className='space-y-4'>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Payment
            </h3>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                <div className='rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700'>
                    <div className='flex items-start'>
                        <div className='flex h-5 items-center'>
                            <input
                                id='credit-card'
                                aria-describedby='credit-card-text'
                                type='radio'
                                name='payment-method'
                                value=''
                                className='h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:ring-offset-gray-800 dark:focus:ring-primary-600'
                                checked
                            />
                        </div>

                        <div className='ms-4 text-sm'>
                            <label
                                htmlFor='credit-card'
                                className='font-medium leading-none text-black'
                            >
                                {" "}
                                Bank Transfer{" "}
                            </label>
                            <p
                                id='credit-card-text'
                                className='mt-1 text-xs font-normal text-gray-500 dark:text-gray-400'
                            >
                                Please show us your slip when complete your
                                payment
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
