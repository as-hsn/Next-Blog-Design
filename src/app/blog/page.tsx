import React from "react";
import Hero from "../components/Blog/Hero";
import BlogPosts from "../components/Blog/BlogPosts";
import BlogCategory from "../components/Blog/BlogCategory";
import JoinTeam from "../components/Home/JoinTeam";

function page() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <Hero />
      <div className="lg:px-16 xl:px-16 md:px-6 sm:p-5 custom-px-main">
        <BlogPosts />
        <BlogCategory />
        <div className="lg:pt-16">
          <JoinTeam />
        </div>
      </div>
    </div>
  );
}

export default page;
