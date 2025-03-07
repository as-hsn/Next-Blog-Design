import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BlogProps {
  category: string;
  title: string;
  body: string;
  postedDate: string;
  blogImgUrl: string;
}


interface BlogsListProps {
  blogs: BlogProps[];
}

function MyPosts({blogs}:BlogsListProps) {
  return (
    <div className="px-10 md:px-20 xl:px-52">
      <h1 className="text-black text-3xl md:text-4xl xl:text-5xl font-bold xl:w-[48rem]">
        My Posts
      </h1>
      {blogs ? blogs.map((post,index) => (
        <Link href={`/blog-post/${post.title}`} key={index} className="container py-12 flex flex-col md:flex-row items-center hover:shadow-xl">
        {/* Left Side Image */}
        <div className="w-full md:w-1/2 xl:w-[412px] h-[320px] relative mb-8 md:mb-0">
          <Image
            src={post.blogImgUrl}
            alt="author img ..."
            layout="fill"
            objectFit="cover"
            className="min-w-[100%]"
          />
        </div>
        {/* Right Side Content */}
        <div className="w-full md:w-2/3 xl:w-[60%] md:ml-8">
          <p className="text-purple-800 gap-3 tracking-widest">{post.category}</p>
          <h1 className="text-black text-2xl md:text-3xl mt-5 xl:text-4xl font-bold line-clamp-3">
            {post.title}
          </h1>
          <p className="text-black mt-4 line-clamp-6">
            {post.body}
          </p>
        </div>
      </Link>

      )) : 'Loading'}
    </div>
  );
}

export default MyPosts;