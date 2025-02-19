import React from 'react'
import Hero from '../components/Author/Hero'
import MyPosts from '../components/Author/MyPosts'

function page() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <Hero />
      <MyPosts />
    </div>
  )
}

export default page