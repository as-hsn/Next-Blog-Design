import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="pt-52 pl-[30vw]">
      <div className="flex items-center mb-4 sm:mb-0">
        <div>
          
        </div>
        <div className="relative w-14 h-14 flex-shrink-0">
          <Image
            src="/assets/testimonials/image.png"
            alt="img ..."
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="ml-4 text-center sm:text-left">
          <h5 className="text-xl text-purple-800 font-semibold">Andrew Jonson</h5>
          <p className="text-gray-500">Posted on 27th January 2022</p>
        </div>
      </div>
      <div>
          <h3 className="lg:text-4xl mt-8 text-gray-800 font-bold max-w-[35rem]">
          Step-by-step guide to choosing great font pairs
          </h3>
      </div>
    </div>
  );
}

export default Header;
