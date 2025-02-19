import React from 'react'

function ContactForm() {
  return (
    <div className="mb-8 text-center mx-[10%] md:mx-[20%] xl:mx-72  md:text-left text-white">
      <form action="#">

    <input type="text" required placeholder='Full Name' className='border-[1.5px] border-gray-400/60 rounded-sm mb-4 text-gray-600 lg:text-base xl:text-lg w-full py-5 pl-6'/>
    <input type="text" required placeholder='Email' className='border-[1.5px] border-gray-400/60 rounded-sm mb-4 text-gray-600 lg:text-base xl:text-lg w-full py-5 pl-6'/>
    <select className='border-[1.5px] border-gray-400/60 rounded-sm mb-4 text-gray-700 lg:text-base xl:text-lg w-full py-5 pl-6'>
   <option value="" disabled selected>
    Query Related
   </option>
   <option value="">
    Query 1
   </option>
   <option value="">
    Query 2
   </option>
   <option value="">
    Query 3
   </option>
    </select>
    <textarea placeholder='Message' required rows={3} className='border-[1.5px] border-gray-400/60 rounded-sm mb-4 text-gray-600 lg:text-base xl:text-lg w-full py-5 pl-6'/>
    <button className='bg-yellow-400 text-black font-bold text-lg lg:text-xl w-full py-4'>
    Send Message
    </button>
      </form>
    </div>
  )
}

export default ContactForm