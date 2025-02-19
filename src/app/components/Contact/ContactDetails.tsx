import React from 'react'

function ContactDetails() {
  return (
    <div className="py-12 mb-8 text-center md:px-10 lg:px-16 mx-[10%] md:mx-[20%] xl:mx-72  md:text-left text-white bg-[#592EA9]">
      <div className='block md:flex md:gap-6 lg:gap-14'>
        <div className='min-w-[45%]'>
          <p className='text-gray-300/80 mb-4'>
          Working hours
          </p>
          <hr className='border-gray-400 mb-4'/>
          <h5 className='text-xl font-semibold mb-2'>
          Monday To Friday
          </h5>
          <h5 className='text-xl font-semibold mb-2'>
          9:00 AM to 8:00 PM 
          </h5>
          <p className='text-gray-300/80'>
          Our Support Team is available 24/7
          </p>
        </div>
        <div className='min-w-[45%]'>
          <p className='text-gray-300/80 mb-4'>
          Contact Us
          </p>
         <hr className='border-gray-400 mb-4 '/>
          <h5 className='text-xl font-semibold mb-2'>
          020 7993 2905
          </h5>
          
          <p>
          hello@finsweet.com
          </p>
        </div>
      </div>
      </div>
  )
}

export default ContactDetails