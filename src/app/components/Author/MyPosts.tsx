import Image from "next/image";
import React from "react";
import { AuthorPosts } from "../../../../public/data/author-posts";

function MyPosts() {
  return (
    <div className="px-10 md:px-20 xl:px-52">
      <h1 className="text-black text-3xl md:text-4xl xl:text-5xl font-bold xl:w-[48rem]">
        My Posts
      </h1>
      {AuthorPosts ? AuthorPosts.map((post,index) => (
        <div key={index} className="container py-12 flex flex-col md:flex-row items-center">
        {/* Left Side Image */}
        <div className="w-full md:w-1/2 xl:w-[412px] h-[320px] relative mb-8 md:mb-0">
          <Image
            src={`/assets${post.image}`}
            alt="author img ..."
            layout="fill"
            objectFit="cover"
            className="min-w-[100%]"
          />
        </div>
        {/* Right Side Content */}
        <div className="w-full md:w-2/3 xl:w-[60%] md:ml-8">
          <p className="text-purple-800 gap-3 tracking-widest">{post.category}</p>
          <h1 className="text-black text-2xl md:text-3xl mt-5 xl:text-4xl font-bold">
            {post.title}
          </h1>
          <p className="text-black mt-4">
            {post.body}
          </p>
        </div>
      </div>

      )) : 'Loading'}
    </div>
  );
}

export default MyPosts;