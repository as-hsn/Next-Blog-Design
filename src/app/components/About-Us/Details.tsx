import Image from "next/image"

function StartDetails() {
  return (
    <div className="flex flex-col lg:flex-row max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-20 items-center mb-32">
      <div className="w-full lg:w-[50%] relative lg:flex contents">
        <div className="hidden  xl:block absolute mt-[19rem] z-10 left-[4.5rem]">
          <Image src="/assets/about/img2-svg.png" alt="svg ..." height={74} width={74} />
        </div>
        <div className="max-w-[400px] lg:max-w-full">
        <Image src="/assets/about/img2.png" width={570} height={500} alt="img ..." className="w-full h-auto" />
        </div>
      </div>

      <div className="w-full lg:w-[50%] mb-8 lg:mb-0 lg:ml-16 mt-8 lg:mt-0 ">
        <h1 className="text-black text-3xl sm:text-3xl lg:text-2xl xl:text-4xl font-semibold">Why we started this Blog</h1>
        <h3 className="text-black text-base sm:text-base mt-4 xl:text-lg font-semibold lg:max-w-[90%]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
        </h3>
        <p className="text-black mt-4 lg:max-w-[90%] text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.
        </p>
      </div>
      
    </div>
  )
}

export default StartDetails