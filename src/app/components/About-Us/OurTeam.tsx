import Image from "next/image"

function OurTeam() {
  return (
    <div className="flex flex-col lg:flex-row max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-20 items-center mb-32">
      <div className="w-full lg:w-[50%] mb-8 lg:mb-0">
        <h1 className="text-black text-3xl sm:text-3xl lg:text-4xl xl:text-4xl font-semibold">Our team of creatives</h1>
        <h3 className="text-black text-base sm:text-base mt-4 xl:text-lg font-semibold lg:max-w-[70%]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
        </h3>
        <p className="text-black mt-4 lg:max-w-[70%] text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.
        </p>
      </div>
      <div className="w-full lg:w-[50%] relative lg:flex contents">
        <div className="hidden lg:block absolute mt-28 left-[-3.5rem]">
          <Image src="/assets/about/img1-svg.png" alt="svg ..." height={116} width={103} />
        </div>
        <div className="max-w-[400px] lg:max-w-full">
        <Image src="/assets/about/img1.png" width={570} height={500} alt="img ..." className="w-full h-auto" />
        </div>
      </div>
    </div>
  )
}

export default OurTeam