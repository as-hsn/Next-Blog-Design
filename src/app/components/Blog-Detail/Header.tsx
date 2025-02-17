import Image from "next/image"

function Header() {
  return (
    <div className="pt-16 px-4 sm:px-8 md:px-16 lg:pt-52 lg:px-[21rem] pb-8 lg:pb-16">
      <div className="flex flex-col sm:flex-row items-center mb-4">
        <div className="relative w-14 h-14 flex-shrink-0 mb-4 sm:mb-0">
          <Image src="/assets/testimonials/image.png" alt="img ..." fill className="rounded-full object-cover" />
        </div>
        <div className="ml-0 sm:ml-4 text-center sm:text-left">
          <h5 className="text-xl text-purple-800 font-semibold">Andrew Jonson</h5>
          <p className="text-gray-500">Posted on 27th January 2022</p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl text-gray-800 font-bold max-w-[35rem]">
          Step-by-step guide to choosing great font pairs
        </h3>
      </div>
      <div className="mt-8">
        <div className="max-w-fit flex items-center justify-center sm:justify-start">
          <span className="h-6 w-6">
            <Image src="/assets/category/rocket.png" alt="Startup icon" width={24} height={24} />
          </span>
          <p className="text-xl sm:text-2xl ml-2 text-gray-800 font-bold">Startup</p>
        </div>
      </div>
    </div>
  )
}

export default Header