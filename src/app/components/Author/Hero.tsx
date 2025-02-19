import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

function Hero() {
  return (
    <div className="bg-purple-100/70 mb-32">
      <div className="container mx-auto px-4 lg:px-10 xl:px-20 py-12 md:py-20 xl:py-32 flex flex-col md:flex-row items-center">
        {/* Hero Image */}
        <div className="w-full md:w-1/3 xl:w-[251px] h-[294px] relative mb-8 md:mb-0">
          <Image
            src="/assets/author/author-page/hero.png"
            alt="author img ..."
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* Right Side Content */}
        <div className="w-full md:w-2/3 xl:w-[60%] md:ml-8">
          <h1 className="text-black text-3xl md:text-4xl xl:text-5xl font-bold xl:w-[48rem]">
            Hey there, Im Andrew Jonhson and welcome to my Blog
          </h1>
          <p className="text-black xl:w-[48rem] mt-4 md:mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
            blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
            At risus viverra adipiscing at in tellus.
          </p>
          <div className="flex gap-4 mt-4 md:mt-6">
            <Link href="#" className="hover:text-gray-300 transition-colors">
              <FaFacebook className="text-black h-4 w-4 md:h-5 md:w-5" />
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              <FaTwitter className="text-black h-4 w-4 md:h-5 md:w-5" />
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              <FaInstagram className="text-black h-4 w-4 md:h-5 md:w-5" />
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              <FaLinkedin className="text-black h-4 w-4 md:h-5 md:w-5" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex relative bottom-1 lg:bottom-2 xl:bottom-4 left-0 sm:left-8 lg:left-28 w-full h-2 z-10 ">
        <div className="w-[60%] xl:h-6 lg:h-4 h-3 bg-yellow-400"></div>
        <div className="w-[20%] xl:h-6 lg:h-4 h-3 bg-purple-800"></div>
      </div>
    </div>
  );
}

export default Hero;
