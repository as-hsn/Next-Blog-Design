import Image from "next/image";
import Link from "next/link";

export default function FeaturedPosts() {
  return (
    <div className="w-full max-w-[1300px] mx-auto">
      <div className="grid lg:grid-cols-2 gap-x-16 gap-y-8 mt-[5%]">
        <div className="">
          <h2 className="text-[32px] font-bold text-black mb-8">
            Featured Post
          </h2>
          <div>
            <div className="border-[0.7px] border-solid border-gray-500 p-5 border-opacity-35 rounded-sm">
              <div className="relative lg:w-full xl:w-full md:w-80 aspect-[1.5] mb-6 ">
                <Image
                  src="/assets/featured-posts-home.png"
                  alt="White building with palm trees"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
              <div className="flex items-center gap-2 text-[14px] text-gray-500 mb-3">
                <span>By</span>
                <Link href="#" className="text-purple-800 hover:underline">
                  John Doe
                </Link>
                <span className="mx-1">|</span>
                <span>May 23, 2022</span>
              </div>
              <h3 className="text-[24px] font-bold text-black mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </h3>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident.
              </p>
              <Link
                href="#"
                className="inline-block px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md font-medium transition-colors"
              >
                Read More {">"}
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-8 w-[95%]">
            <h2 className="text-[32px] font-bold text-black">All Posts</h2>
            <Link href="#" className="text-purple-800 hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-6">
            <div className="rounded-lg bg-transparent p-6  hover:bg-yellow-500/10">
              <div className="flex items-center gap-2 text-[14px] text-gray-500 mb-2">
                <span>By</span>
                <Link href="#" className="text-purple-800 hover:underline">
                  John Doe
                </Link>
                <span>Aug 23, 2021</span>
              </div>
              <h3 className="text-[20px] font-bold text-black w-[80%]">
                8 Figma design systems that you can download for free today.
              </h3>
            </div>

            <div className="rounded-lg bg-transparent p-6  hover:bg-yellow-500/10">
              <div className="flex items-center gap-2 text-[14px] text-gray-500 mb-2">
                <span>By</span>
                <Link href="#" className="text-purple-800 hover:underline">
                  John Doe
                </Link>
                <span>Aug 23, 2021</span>
              </div>
              <h3 className="text-[20px] font-bold text-black w-[80%]">
                8 Figma design systems that you can download for free today.
              </h3>
            </div>

            <div className="rounded-lg bg-transparent p-6  hover:bg-yellow-500/10">
              <div className="flex items-center gap-2 text-[14px] text-gray-500 mb-2">
                <span>By</span>
                <Link href="#" className="text-purple-800 hover:underline">
                  John Doe
                </Link>
                <span>Aug 23, 2021</span>
              </div>
              <h3 className="text-[20px] font-bold text-black w-[80%]">
                8 Figma design systems that you can download for free today.
              </h3>
            </div>

            <div className="rounded-lg bg-transparent p-6 hover:bg-yellow-500/10">
              <div className="flex items-center gap-2 text-[14px] text-gray-500 mb-2">
                <span>By</span>
                <Link href="#" className="text-purple-800 hover:underline">
                  John Doe
                </Link>
                <span>Aug 23, 2021</span>
              </div>
              <h3 className="text-[20px] font-bold text-black w-[80%]">
                8 Figma design systems that you can download for free today.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
