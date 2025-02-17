import Link from "next/link";
import React from "react";

function JoinTeam() {
  return (
    <div className="container pt-32">
      <h1 className="text-center lg:text-3xl xl:text-4xl md:text-xl sm:text-lg font-bold lg:-mt-10 mb-12 text-slate-900">
        Join our team to be a part
        <br />
        of our story
      </h1>
      <p className="text-center mb-12 text-gray-500">
        Lorem ipsum dolor sit amet, consectetur <br />
        adipiscing elit, sed do eiusmod tempor incididunt.
      </p>
      <div className="flex justify-center">
        <Link
          href="#"
          className="block w-fit px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-medium transition-colors"
        >
          Join Now
        </Link>
      </div>
    </div>
  );
}

export default JoinTeam;
