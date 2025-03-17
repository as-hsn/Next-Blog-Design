"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ShowToast from "../ShowToast";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface BlogPost {
  id: number;
  title: string;
  body: string;
  blogImgUrl: string;
  category: string;
}

export default function BlogPosts() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [totalNumberBlogs, setTotalNumberBlogs] = useState(0);
  const blogsPerPage = Number(process.env.NEXT_PUBLIC_BLOGS_PER_PAGE);
  const [loading,setLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const page = parseInt(searchParams.get("page") || "1");

  async function getBlogs() {
    try {
      setLoading(true);
      const res = await fetch(`/api/blogs?page=${page}`, {
        method: "GET",
      });
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs);
        setTotalNumberBlogs(data.totalBlogsCount);
      } else {
        ShowToast(data.message, "error");
      }
      
    } catch (error) {
      void error
      ShowToast('Something went wrong', 'error')
    }finally{
      setLoading(false); 
    }
  }

  useEffect(() => {
    getBlogs();
    if (page > 1) {
      const element = document.querySelector(".scroll-target");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [page]);

  const updatePage = (newPage: number) => {

    const maxPage = Math.ceil(totalNumberBlogs / blogsPerPage);
    if (newPage < 1 || newPage > maxPage) return;
    

    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8 sm:py-12 scroll-target">
      <h1 className="text-3xl sm:text-4xl md:text-left text-center font-bold mb-8 text-black">
        All posts
      </h1>
      <hr className="mb-16" />
      
      {loading ? (
  <div className="w-full flex flex-col gap-4">
    {[...Array(3)].map((_, index) => (
  <div 
    key={index}
    className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start p-4 sm:p-6 w-full mx-auto border border-gray-200 rounded-lg shadow-sm"
  >
    <div className="w-full sm:w-48 md:w-64 lg:w-[22rem] aspect-[4/3] relative overflow-hidden rounded-lg">
      <Skeleton className="h-full w-full" />
    </div>
    <div className="flex-1 space-y-3">
      <Skeleton width={80} height={20} className="rounded-md" />
      <Skeleton width="80%" height={30} className="rounded-md" />
      <Skeleton width="60%" height={30} className="rounded-md" />
      <Skeleton width="90%" height={15} className="rounded-md" />
      <Skeleton width="85%" height={15} className="rounded-md" />
      <Skeleton width="70%" height={15} className="rounded-md" />
    </div>
  </div>
))}

  </div>
) : blogs.length > 0 && (<div className="space-y-8">
  {blogs.map((post, index) => (
    <Link
      href={`blog-post/${post.title}`}
      key={index}
      className="group block hover:bg-gray-50 rounded-lg transition-colors"
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
        <div className="w-full max-w-[352px] mx-auto sm:mx-0 sm:w-48 md:w-64 lg:w-[22rem] aspect-[4/3] relative overflow-hidden rounded-lg">
          <Image
            src={post.blogImgUrl}
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
</div>)}
      <div className="mt-12 flex justify-center gap-4">
        <button
          onClick={() => {
            updatePage(page - 1);
            
          }}
          disabled={page <= 1}
          className={`px-4 py-2 text-lg font-medium ${
            page <= 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-600 hover:scale-110 hover:text-gray-700"
          }`}
        >
          {"<"} Prev
        </button>
        <p className="py-2 text-gray-600 font-semibold text-lg">{page}</p>
        <button
          onClick={() => {
            updatePage(page + 1);
          }}
          disabled={page >= Math.ceil(totalNumberBlogs / blogsPerPage)}
          className={`px-4 py-2 text-lg font-medium ${
            page >= Math.ceil(totalNumberBlogs / blogsPerPage)
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-600 hover:scale-110 hover:text-gray-700"
          }`}
        >
          Next {">"}
        </button>
      </div>
    </div>
  );
}
