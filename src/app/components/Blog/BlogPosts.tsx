import Image from "next/image";
import Link from "next/link";
import { BlogPostsData } from "../../../../public/data/blog-posts";


export default function BlogPosts() {
  return (
    <div className="w-full max-w-7xl mx-auto py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl md:text-left text-center font-bold mb-8 text-black">
        All posts
      </h1>
      <hr className="mb-16"/>
      <div className="space-y-8">
        {BlogPostsData.map((post, index) => (
          <Link
            href={`blog-post/${post.title}`}
            key={index}
            className="group block hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
              <div className="w-full max-w-[352px] mx-auto sm:mx-0 sm:w-48 md:w-64 lg:w-[22rem] aspect-[4/3] relative overflow-hidden rounded-lg">
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

      <div className="mt-12 flex justify-center gap-4">
        <button
          className="px-4 py-2 text-lg font-medium text-gray-600/40 cursor-pointer hover:scale-110 hover:text-gray-700"
          disabled
        >
          {"<"} Prev
        </button>
        <button
          className="px-4 py-2 text-lg font-medium text-gray-600/40 cursor-pointer hover:scale-110 hover:text-gray-700"
          disabled
        >
          Next {">"}
        </button>
      </div>
    </div>
  );
}
