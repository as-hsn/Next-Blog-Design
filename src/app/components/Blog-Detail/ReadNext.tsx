"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface blogProps {
  blogImgUrl: string;
  title: string;
  category: string;
  body: string;
}

interface categoryProp {
  category: string | null;
}

function ReadNext({ category }: categoryProp) {
  const [relatedBlogs, setRelatedBlogs] = useState<blogProps[]>([]);
  const page = 1;

  async function getRelatedBlogs() {
    if (!category) return; 
    const res = await fetch(`/api/blogs?category=${encodeURIComponent(category)}&page=${page}`);
    const data = await res.json();

    if (data.success) {
      setRelatedBlogs(data.blogs);
    }
  }

  useEffect(() => {
    getRelatedBlogs();
  }, [category]); 

  return (
    <>
      {relatedBlogs.length > 0 && (
        <div className="w-full max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-20">
          <h1 className="text-3xl sm:text-4xl font-medium md:font-semibold mb-8 sm:mb-12 text-black lg:text-left text-center">
            What to read next
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {relatedBlogs.map((post, index) => (
              <Link
                href={`/blog-post/${encodeURIComponent(post.title)}`}
                key={index}
                className="group block hover:bg-gray-50 transition-colors max-w-sm w-full"
              >
                <div className="flex flex-col items-start mb-6 md:mb-0">
                  <div className="w-full aspect-[4/3] relative overflow-hidden rounded-lg">
                    <Image
                      src={post.blogImgUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>

                  <div className="flex-1 space-y-2 sm:space-y-3 mt-4 max-w-[94%]">
                    <span className="text-xs font-semibold tracking-wider text-purple-800">
                      <p className="line-clamp-2 max-w-[40%]">{post.category}</p>
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-purple-800 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 line-clamp-2 ">
                      {post.body}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <hr className="lg:border-[1px] lg:border-gray-300 lg:mt-20" />
        </div>
      )}
    </>
  );
}

export default ReadNext;