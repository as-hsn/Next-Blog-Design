import React from "react";
import CategoryCards from "../CategoryCards";

function BlogCategory() {
  return (
    <div className="container mx-auto pt-12">
      <h1 className="text-left text-3xl md:text-4xl font-bold mb-12 text-slate-900">
        All Categories
      </h1>
      <CategoryCards />
    </div>
  );
}

export default BlogCategory;
