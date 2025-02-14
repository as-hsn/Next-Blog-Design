import React from 'react'

function NewsLetter() {
  return (
    <div className="p-8 mb-16 bg-white/10 h-fit custom-footer-css">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 custom-css-second-div">
            <h2 className="text-2xl font-normal max-w-xl mt-[1.4rem] custom-css-heading">
              Subscribe to our newsletter to get latest updates and news
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto custom-css-news-letter">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="bg-transparent border border-gray-600 rounded-sm text-white placeholder:text-gray-400 px-4 py-2 min-w-[240px] w-full sm:w-auto custom-input-field"
              />
              <button className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-2 font-semibold transition-colors rounded-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
  )
}

export default NewsLetter