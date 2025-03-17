import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ShowToast from "../ShowToast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface BlogPost {
  id: number;
  title: string;
  body: string;
  blogImgUrl: string;
  category: string;
  authorName: string;
  postedDate: string;
}

export default function FeaturedPosts() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const page = 1;

  async function getBlogs() {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/blogs?page=${page}&dataPerPage=4`, {
        method: "GET",
      });
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs);
        console.log("🚀 ~ getBlogs ~ data:", data)
        
      } else {
        ShowToast(data.message, "error");
      }
    } catch (error) {
      void error;
      ShowToast("Failed to fetch blogs", "error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBlogs();
  }, [page]);

  return (
    <div className="w-full pt-32 max-w-[1300px] mx-auto">
      <div className="grid lg:grid-cols-2 gap-x-16 gap-y-8">
        <div className="">
          <h2 className="text-[32px] font-bold text-black mb-8">
            Featured Post
          </h2>
          <div>
            {isLoading || blogs.length === 0 ? (
              <div className="border-[0.7px] border-solid border-gray-500 p-5 border-opacity-35 rounded-sm">
                <Skeleton height={200} className="mb-6" />
                <Skeleton count={3} className="mb-3" />
                <Skeleton count={1} className="text-[24px] mb-3" />
                <Skeleton count={3} />
                <Skeleton width={100} className="mt-6" />
              </div>
            ) : (
              blogs.slice(0, 1).map((blog, index) => (
                <div
                  key={index}
                  className="border-[0.7px] border-solid border-gray-500 p-5 border-opacity-35 rounded-sm"
                >
                  <div className="relative lg:w-full xl:w-full md:w-80 aspect-[1.5] mb-6 ">
                    <Image
                      src={blog.blogImgUrl}
                      alt="Image ..."
                      fill
                      className="object-cover rounded-lg"
                      priority
                    />
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-gray-500 mb-3">
                    <span>By</span>
                    <Link href="#" className="text-purple-800 hover:underline">
                      {blog.authorName}
                    </Link>
                    <span className="mx-1">|</span>
                    <span>{blog.postedDate.split("T")[0]}</span>
                  </div>
                  <h3 className="text-[24px] font-bold text-black mb-3">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 mb-6 leading-relaxed line-clamp-3">
                    {blog.body}
                  </p>

                  <Link
                    href={`blog-post/${blog.title}`}
                    className="inline-block px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md font-medium transition-colors"
                  >
                    Read More {">"}
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-8 w-[95%]">
            <h2 className="text-[32px] font-bold text-black">All Posts</h2>
            <Link
              href="/blog?page=1"
              className="text-purple-800 hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="space-y-6">
            {isLoading // Skeleton for All Posts section
              ? Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="p-6">
                      <Skeleton count={2} />
                      <Skeleton height={20} className="mt-2" />
                    </div>
                  ))
              : blogs.map((blog, index) => (
                  <div key={index}>
                    <Link href={`blog-post/${blog.title}`} key={index}>
                      <div className="rounded-lg bg-transparent p-6 hover:bg-yellow-500/10">
                        <div className="flex items-center gap-2 text-[14px] text-gray-500 mb-2">
                          <span>By {blog.authorName}</span>
                          <span>{blog.postedDate.split("T")[0]}</span>
                        </div>
                        <h3 className="text-[20px] font-bold text-black w-[80%] cursor-pointer">
                          {blog.title}
                        </h3>
                      </div>
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
