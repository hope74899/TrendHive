import React from 'react'

const NewsLetterBox = () => {
     const handleOnSubmit = (event) => {
      event.preventDefault()
      
    }
    
    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>Subcribe now & get 20% off</p>
            <p className='text-gray-400 pt-3'>Stay ahead of the trends and get exclusive access to new arrivals, sales, and special offers by joining our TrendHive newsletter. Be the first to know about the latest drops and score insider deals!</p>
            <form onSubmit={handleOnSubmit} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6  '>
                <input type="email" name="email" placeholder='Enter your email' className='w-full sm:flex-1 outline-none px-8 py-2' />
                <button type='submit' className='bg-black text-white text-xs px-10 py-[13px]' >SUBCRIBE</button>
            </form>
        </div>
    )
}

export default NewsLetterBox
 