import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <div className="w-full bg-purple-100/50">
      <div className="relative w-full max-w-7xl  mx-auto px-20 py-[80px] sm:py-1[80px] md:py-1[80px]">
        <div className="relative grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <div className="space-y-4 sm:space-y-6 md:pr-8">
            <h2 className="text-sm font-semibold uppercase text-black">
              FEATURED POST
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-black">
              Step-by-step guide to choosing great font pairs
            </h3>
            <p className="text-gray-600 text-sm sm:text-base font-medium">
              By <span className="text-purple-700">John Doe</span> | May 23,
              2022
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident.
            </p>
            <Link
              href="#"
              className="inline-block px-4 sm:px-6 py-2 sm:py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black text-sm sm:text-base font-medium transition-colors"
            >
              Read More {">"}
            </Link>
          </div>

          <div className="flex items-center justify-center md:justify-end">
            <div className="relative w-full max-w-[515px] aspect-[515/359]">
              <Image
                src="/assets/blog-hero.png"
                alt="Hero Image"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
