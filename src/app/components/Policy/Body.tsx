import React from 'react'
import { Heading1,Heading2,paragraph1,paragraph2,paragraph3 } from '../../../../public/data/policy-body'

function Body() {
  return (
    <div className="px-10 sm:px-8 md:px-20 lg:px-30 pt-16 xl:px-[21rem] pb-8 lg:pb-16 leading-7">
    <div className="mt-8">
      <div className="mb-8">
        <h3 className="text-gray-800 text-3xl md:text-4xl font-bold mb-8">
        {Heading1}
        </h3>
        <p className="text-gray-700 text-justify">{paragraph1}</p>
      </div>
      <div className="mb-8">
        <h3 className="text-gray-800 text-2xl md:text-3xl font-bold mb-8">
        {Heading2}
        </h3>
        <p className="text-gray-700 mb-8 text-justify">{paragraph2}</p>
        <p className="text-gray-700 mb-8 text-justify">
        {paragraph3}
        </p>
      </div>
    </div>
  </div>
  )
}

export default Body