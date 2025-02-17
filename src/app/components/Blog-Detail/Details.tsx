import Image from 'next/image'
// import Link from 'next/link'
import React from 'react'

function Details() {
  return (
    <div className="relative w-full min-h-[600px]">
      <div className="absolute inset-0">
        <Image
          src="/assets/blog-detail/blog-detail.png"
          alt="Hero img ..."
          fill
          className="object-cover lg:px-20 md:px:10 px-4"
          priority
        />
        {/* <div className="absolute inset-0 bg-black/45" /> */}
      </div>

      {/* <div className="relative h-full w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-end h-full pb-16 sm:pb-20 lg:pb-24">
          <div className="max-w-2xl mt-[6.5rem]">
            <div className="mb-4">
              <span className="text-sm font-medium tracking-wider text-gray-200">
                POSTED ON{" "}
                <Link href="/category/startup" className="text-white font-bold">
                  STARTUP
                </Link>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Step-by-step guide to choosing great font pairs
            </h1>

            <div className="flex items-center gap-2 text-gray-300 mb-4">
              <span>By</span>
              <Link
                href="/author/james-west"
                className="text-yellow-400 hover:text-yellow-300"
              >
                James West
              </Link>
              <span className="mx-2">|</span>
              <time dateTime="2022-05-23">May 23, 2022</time>
            </div>

            <p className="text-gray-200 text-lg mb-8">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident.
            </p>

            <Link
              href="/blog/font-pairs-guide"
              className="inline-flex items-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 transition-colors text-gray-900 font-semibold rounded-sm group-hover:shadow-lg"
            >
              Read More <span className="ml-2">{">"}</span>
            </Link>
          </div>
        </div>
      </div> */}
    </div>
          
  )
}

export default Details