import React from 'react'
import Hero from '../components/Category/Hero'
import CategoryPosts from '../components/Category/CategoryPosts'
import { Suspense } from 'react'

function page() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <Hero />
      <Suspense>
      <CategoryPosts />
      </Suspense>
    </div>
  )
}

export default page