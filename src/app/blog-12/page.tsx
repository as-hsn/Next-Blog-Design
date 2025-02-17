import React from 'react'
import Header from '../components/Blog-Detail/Header'
import Details from '../components/Blog-Detail/Details'
import ReadNext from '../components/Blog-Detail/ReadNext'
import JoinTeam from '../components/Home/JoinTeam'

function page() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
    <Header />
    <Details />
    <ReadNext />
    <div className="lg:mt-0 -mt-14 lg:px-16 xl:px-16 md:px-6 sm:p-5 custom-px-main">
    <JoinTeam />
    </div>
    </div>
  )
}

export default page