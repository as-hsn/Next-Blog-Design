"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BlogPostsData } from "../../../../public/data/blog-posts";
import Header from "./Header";

interface BlogPostProps {
  params: string;
}

interface BlogPost {
  category: string;
  title: string;
  body: string;
  image: string;
  date: string;
  author: string;
}

const findBlogByTitle = (title: string) => {
  return BlogPostsData.find(
    (blogPost) => blogPost.title.toLowerCase() === title.toLowerCase()
  );
};

const Details = ({ params }: BlogPostProps) => {
  const [blog, setBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    const blogPost = findBlogByTitle(params);
    console.log(blogPost);

    if (blogPost) {
      setBlog(blogPost);
    }
  }, [params]);

  return (
    <div>
      {blog ? (
        <>
          <Header
            title={blog.title}
            category={blog.category}
            author={blog.author}
            date={blog.date}
          />
          <div className="justify-center flex lg:px-20 md:px-10 px-5 max-w[1280px] max-h-[582px]">
            <Image
              src={`${blog.image}`}
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
        <p>Blog not found</p>
      )}
    </div>
  );
};

export default Details;
