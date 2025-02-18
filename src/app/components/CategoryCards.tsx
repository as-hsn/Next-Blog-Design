import Image from "next/image";
import React from "react";
import { CategoriesData } from "../../../public/data/category-cards";

function CategoryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {CategoriesData.map((category, index) => (
        <div
          key={index}
          className="p-6 border transition-all hover:bg-yellow-400 bg-white border-gray-200"
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-4 
               bg-yellow-100
              "
          >
            <Image
              src={`/assets/category/${category.icon}`}
              width={20}
              height={20}
              alt="icons .."
            ></Image>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-slate-900">
            {category.title}
          </h3>
          <p className="text-gray-600">{category.description}</p>
        </div>
      ))}
    </div>
  );
}

export default CategoryCards;
