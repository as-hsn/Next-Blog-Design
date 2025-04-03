"use client"

import React from 'react'
import AboutSection from '../components/About-Us/Hero'
import OurTeam from '../components/About-Us/OurTeam'
import StartDetails from '../components/About-Us/Details'
import JoinTeam from '../components/Home/JoinTeam'
import AuthorsList from '../components/Home/AuhorsList'

function page() {
  return (
    <div>
      <AboutSection />
      <OurTeam />
      <StartDetails />
      <div className='lg:px-16 xl:px-16 md:px-6 sm:p-5 custom-px-main'>
      <AuthorsList />
      </div>
      <div className="px-10">
      <JoinTeam />
      </div>
    </div>
  )
}

export default page