import Image from "next/image";

export default function AboutSection() {
  return (
    <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-20 pt-8 sm:pt-12 lg:pt-20 pb-32">
      <div className="absolute px-4 sm:px-6 lg:pl-[6.8rem] lg:pr-9">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 lg:gap-y-8">
          <div className="bg-white z-10 pt-4 sm:pt-8 lg:pt-16 px-0 sm:px-8 lg:pl-16 h-auto lg:h-72">
            <h2 className="uppercase text-sm tracking-[0.2em] text-gray-600 mb-4 lg:mb-6">
              ABOUT US
            </h2>
            <h1 className="text-2xl lg:text-2xl xl:text-4xl font-bold leading-[1.2] text-gray-900">
              We are a team of content writers who share their learnings
            </h1>
          </div>
          <div className="sm:pt-6 lg:pt-12 xl:pt-[6.1rem] xl:max-w-[85%]">
            <p className="text-gray-600 sm:pl-8 lg:pl-0 text-sm md:text-sm lg:text-base mt-2 max-w-full lg:max-w-[90%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="h-[300px] sm:h-[400px] lg:h-[500px] relative mt-[15rem] sm:mt-[15rem] lg:mt-[15rem]">
          <Image
            src="/assets/story-section.png"
            alt="img ..."
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute bottom-3 left-0 sm:left-8 lg:left-28 w-full">
          <div className="flex-col sm:flex-row bg-yellow-400 max-w-fit lg:flex hidden">
            <div className="p-4 sm:p-6 lg:p-8 border-b sm:border-b-0 sm:border-r border-black/10">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 text-black">
                12+
              </div>
              <div className="text-xs sm:text-sm text-black">
                Blogs Published
              </div>
            </div>
            <div className="p-4 sm:p-6 lg:p-8 border-b sm:border-b-0 sm:border-r border-black/10">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 text-black">
                18K+
              </div>
              <div className="text-xs sm:text-sm text-black">
                Views on Finsweet
              </div>
            </div>
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 text-black">
                30K+
              </div>
              <div className="text-xs sm:text-sm text-black">
                Total active Users
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 left-0 sm:left-8 lg:left-28 w-full h-2 hidden lg:flex z-10 ">
          <div className="w-[20%] h-[2rem] bg-purple-800" />
          <div className="w-[40%] h-[2rem] bg-yellow-400" />
        </div>
      </div>

      <div className="bg-purple-100/50 p-6 sm:p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4 lg:space-y-6">
            <h3 className="uppercase text-sm font-semibold tracking-wider text-gray-900">
              OUR MISION
            </h3>
            <h4 className="text-xl sm:text-2xl font-bold text-gray-900">
              Creating valuable content for creatives all around the world
            </h4>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
              blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
              At risus viverra adipiscing at in tellus.
            </p>
          </div>
          <div className="space-y-4 lg:space-y-6">
            <h3 className="uppercase text-sm font-semibold tracking-wider text-gray-900">
              OUR VISION
            </h3>
            <h4 className="text-xl sm:text-2xl font-bold text-gray-900">
              A platform that empowers individuals to improve
            </h4>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
              blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
              At risus viverra adipiscing at in tellus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
