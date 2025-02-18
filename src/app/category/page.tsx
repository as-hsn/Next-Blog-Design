import React from 'react'
import Hero from '../components/Category/Hero'
import CategoryPosts from '../components/Category/CategoryPosts'

function page() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <Hero />
      <CategoryPosts />
    </div>
  )
}

export default page