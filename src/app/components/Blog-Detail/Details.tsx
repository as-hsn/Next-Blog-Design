"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import ShowToast from "../ShowToast";
import ReadNext from "./ReadNext";

interface BlogPostProps {
  slug: string;
}

interface BlogPost {
  category: string;
  title: string;
  body: string;
  blogImgUrl: string;
  date: string;
  authorName: string;
  postedDate: string
  authorImageUrl: string
}


const Details = ({ slug }: BlogPostProps) => {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [relatedBlogsCategory, setRelatedBlogsCategory] = useState<string | null>(null);


  useEffect(() => {
    if (!slug) return;

    const fetchBlogBySlug = async () => {
      try {
        const res = await fetch(`/api/getBlog?slug=${encodeURIComponent(slug)}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch blog");
        setBlog(data.blog);
        console.log("🚀 ~ fetchBlogBySlug ~ data.blog:", data.blog)
        
        setRelatedBlogsCategory(data.blog.category)
      } catch (error) {
        console.error("Error fetching blog:", error);
        ShowToast("Error fetching blog", "error");
      }
    };

    fetchBlogBySlug();
  }, [slug]);


  return (
    <><div>
      {blog ? (
        <>
          <Header
            title={blog.title}
            category={blog.category}
            author={blog.authorName}
            date={new Date(blog.postedDate)}
            authorImage={blog.authorImageUrl}
          />
          <div className="justify-center flex lg:px-20 md:px-10 px-5 max-w-[1280px] max-h-[582px]">
            <Image
              src={blog.blogImgUrl}
              alt="Hero img ..."
              width={1280}
              height={582}
            />
          </div>
          <div className="px-5 sm:px-8 md:px-16 pt-16 lg:px-[21rem] pb-8 lg:pb-16">
            <div className="mt-8">
              <div className="mb-8">
                <h3 className="text-xl sm:text-xl lg:text-2xl text-gray-800 font-bold max-w-[40rem]">
                  {blog.title}
                </h3>
                <p className="text-gray-500">{blog.body}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600 mt-10">Blog not found</p>
      )}
    </div>
    <ReadNext category={relatedBlogsCategory} />
    </>
    
  );
};

export default Details;