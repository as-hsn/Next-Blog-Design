import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ShowToast from "../ShowToast";
import Loading from "@/app/loading";


interface BlogPost {
  id: number;
  title: string;
  body: string;
  blogImgUrl: string;
  category: string;
  authorName: string;
  postedDate: string;
}

export default function StorySection() {


  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const page = 1;

  async function getBlogs() {
    const res = await fetch(`/api/blogs?page=${page}&category=life&dataPerPage=1`, {
      method: "GET",
    });
    const data = await res.json();
    if (data.success) {
      setBlogs(data.blogs);
      console.log(data.blogs);
    } else {
      ShowToast(data.message, "error");
    }
  }

  useEffect(() => {
    getBlogs();
  }, [page]);

  return (
    <>
      {blogs.length > 0 ? (
        blogs.slice(0, 1).map((blog, index) => (
          <div key={index} className="container mx-auto pt-44">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              
              {/* Image Section */}
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[110%] lg:w-[150%] lg:-mt-[5rem]">
                <Image
                  src={blog.blogImgUrl}
                  alt="Blog Image"
                  fill
                  className="object-cover"
                />
              </div>
  
              {/* Text Section */}
              <div className="max-w-xl mx-auto lg:mx-0 p-6 sm:p-8 lg:p-[4rem] bg-white z-10 text-center lg:text-left">
                <div>
                  <h2 className="text-sm font-bold tracking-[0.2em] text-gray-900 uppercase mb-4 sm:mb-6">
                    POSTED ON <span className="text-yellow-500">{blog.category}</span>
                  </h2>
  
                  <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-gray-900 mb-6 sm:mb-8 leading-tight lg:leading-[3rem]">
                    {blog.title}
                  </h4>
  
                  <p className="text-gray-600 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed line-clamp-6">
                    {blog.body}
                  </p>
  
                  <Link
                    href={`/category?category=${encodeURIComponent(blog.category)}`}
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-yellow-400 hover:bg-yellow-500 text-black transition-colors rounded-lg font-bold text-sm sm:text-base"
                  >
                    Discover more {blog.category} stories
                    <span className="ml-2 text-lg">›</span>
                  </Link>
                </div>
              </div>
  
            </div>
          </div>
        ))
      ) : (
        <div className="w-full h-[300px] sm:h-[400px] flex items-center justify-center -mb-32">
          <Loading />
        </div>
      )}
    </>
  )}