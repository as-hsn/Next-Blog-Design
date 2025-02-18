import Image from "next/image";
import Link from "next/link";
import { BlogPostsData } from "../../../../public/data/blog-posts";
import { CategoriesData } from "../../../../public/data/category-cards";

export default function CategoryPosts() {
  return (
    <div className="w-full block lg:flex xl:flex max-w-7xl mx-auto px-20 gap-28">
      {/* Left Side Div */}
      <div className="space-y-8 lg:max-w-[65%]">
        {BlogPostsData.map((post, index) => (
          <Link
            href={`blog-post/${post.title}`}
            key={index}
            className="group block hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
              <div className="w-full max-w-[352px] mx-auto sm:mx-0 sm:w-48 sm:h-48 md:w-64 lg:w-[15rem] lg:h-[15rem] aspect-[4/3] relative overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>

              <div className="flex-1 space-y-2 sm:space-y-3 max-w-[40rem] mt-6">
                <span className="text-xs font-semibold tracking-wider text-purple-800">
                  {post.category}
                </span>
                <h2 className="text-lg sm:text-lg lg:text-3xl font-bold text-gray-900 group-hover:text-purple-800 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
                  {post.body}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Right Side Div */}
      <div className="lg:max-w-[30%] md:gap-20 md:flex md:mt-16 lg:mt-0 lg:block lg:mr-[6rem]">
        {/* Categories Div */}
        <div className="mb-12 mt-14 md:mt-0 md:min-w-[40%]">
          <h1 className="text-black font-semibold text-3xl lg:mb-8 mb-12">
            Categories
          </h1>
          <div className="grid grid-cols-1 gap-4">
            {CategoriesData.map((category, index) => (
              <div
                key={index}
                className="p-4 border-2 transition-all hover:bg-yellow-400 bg-white border-gray-200 min-w-60"
              >
                <div className="flex">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center
                       bg-yellow-100
                      "
                  >
                    <Image
                      src={`/assets/category/${category.icon}`}
                      width={20}
                      height={20}
                      alt="icons .."
                    ></Image>
                  </div>
                  <h3 className="text-xl pt-[0.5rem] pl-4 font-semibold text-slate-900">
                    {category.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Tags Div */}
        <div className="md:min-w-[50%]">
          <h1 className="text-black text-center md:text-left  font-semibold text-3xl mb-10">All Tags</h1>
          <div className="w-auto md:w-24 text-center">
            <div className="flex gap-3 mb-4 justify-center md:justify-self-start">
              <p className="text-gray-500 border-2 border-gray-300 rounded-full w-fit py-3 font-semibold px-9 text-sm">
                Buisness
              </p>

              <p className="text-gray-500 border-2 border-gray-300 rounded-full w-fit py-3 font-semibold px-9 text-sm">
                Experience
              </p>
            </div>
            <div className="flex gap-3 mb-4 justify-center md:justify-self-start">
              <p className="text-gray-500 border-2 border-gray-300 rounded-full w-fit py-3 font-semibold px-9 text-sm">
                Screen
              </p>

              <p className="text-gray-500 border-2 border-gray-300 rounded-full w-fit py-3 font-semibold px-9 text-sm">
                Technology
              </p>
            </div>
            <div className="flex gap-3 mb-4 justify-center md:justify-self-start">
              <p className="text-gray-500 border-2 border-gray-300 rounded-full w-fit py-3 font-semibold px-9 text-sm">
                Marketing
              </p>

              <p className="text-gray-500 border-2 border-gray-300 rounded-full w-fit py-3 font-semibold px-9 text-sm">
                Life
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
