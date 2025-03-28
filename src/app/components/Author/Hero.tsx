"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MyPosts from "../../components/Author/MyPosts";

interface authorProps {
  name: string;
  image: string;
  Birthdate: string;
  _count: {
    blogs: string;
  };
}

function Hero() {
  const params = useParams();
  const [author, setAuthor] = useState<authorProps>();
  const [blogs, setBlogs] = useState([]);

  const getData = async () => {
    const authorId = params.authorId;
    const res = await fetch("/api/authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authorId }),
    });
    const data = await res.json();
    setAuthor(data.user);
    setBlogs(data.blogs);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="bg-purple-100/70 mb-32">
        {author && (
          <div className="container mx-auto px-4 lg:px-10 xl:px-20 py-12 md:py-20 xl:py-32 flex flex-col md:flex-row items-center">
            {/* Hero Image */}
            <div className="w-full md:w-1/3 xl:w-[251px] h-[294px] relative mb-8 md:mb-0">
              <Image
                src={author.image}
                alt="author img ..."
                layout="fill"
                objectFit="cover"
              />
            </div>
            {/* Right Side Content */}
            <div className="w-full md:w-2/3 xl:w-[60%] md:ml-8">
              <h1 className="text-black text-3xl md:text-4xl xl:text-5xl font-bold xl:w-[48rem]">
                {author.name}
              </h1>
              <p className="text-black xl:w-[48rem] mt-4 md:mt-6">
                Birth Date :{" "}
                {author.Birthdate ? author.Birthdate : "Not Available"}
              </p>
              <p className="text-black xl:w-[48rem] mt-4 md:mt-6">
                Total Blogs Written :{" "}
                {author._count.blogs ? author._count.blogs : "Not Available"}
              </p>
            </div>
          </div>
        )}

        <div className="flex relative bottom-1 lg:bottom-2 xl:bottom-4 left-0 sm:left-8 lg:left-28 w-full h-2 z-10 ">
          <div className="w-[60%] xl:h-6 lg:h-4 h-3 bg-yellow-400"></div>
          <div className="w-[20%] xl:h-6 lg:h-4 h-3 bg-purple-800"></div>
        </div>
      </div>
      <MyPosts blogs={blogs} />
    </>
  );
}

export default Hero;
