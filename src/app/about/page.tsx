import React from 'react'
import AboutSection from '../components/About-Us/Hero'
import OurTeam from '../components/About-Us/OurTeam'
import StartDetails from '../components/About-Us/Details'
import AboutUsAuthorsList from '../components/About-Us/AboutUsAuthors'
import JoinTeam from '../components/Home/JoinTeam'

function page() {
  return (
    <div>
      <AboutSection />
      <OurTeam />
      <StartDetails />
      <AboutUsAuthorsList />
      <JoinTeam />
    </div>
  )
}

export default page