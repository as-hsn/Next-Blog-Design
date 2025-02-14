import Image from "next/image";

export default function StorySection() {
  return (
    <div className="container mx-auto pt-44">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[110%] lg:w-[150%] lg:-mt-[5rem] order-1 lg:order-1">
          <Image
            src="/assets/story-section.png"
            alt="Friends enjoying a scenic view together"
            fill
            className="object-cover"
          />
        </div>

        <div className="max-w-xl mx-auto lg:mx-0 p-6 sm:p-8 lg:p-[4rem] bg-white z-10 text-center lg:text-left order-2 lg:order-2">
          <div>
            <h2 className="text-sm font-bold tracking-[0.2em] text-gray-900 uppercase mb-4 sm:mb-6">
              Why we started
            </h2>

            <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-gray-900 mb-6 sm:mb-8 leading-tight lg:leading-[3rem]">
              It started out as a simple idea and evolved into our passion
            </h4>

            <p className="text-gray-600 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip.
            </p>

            <button className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-yellow-400 hover:bg-yellow-500 text-black transition-colors rounded-lg font-bold text-sm sm:text-base">
              Discover our story
              <span className="ml-2 text-lg">›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
