import React from 'react'
import Header from '../components/Blog-Detail/Header'
import Details from '../components/Blog-Detail/Details'

function page() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
    <Header />
    <Details />
    </div>
  )
}

export default page