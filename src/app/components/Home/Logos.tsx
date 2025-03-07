import Image from "next/image";
import React from "react";

const LogosArray = [
  {
    image: "logo1.png",
  },
  {
    image: "logo2.png",
  },
  {
    image: "logo3.png",
  },
  {
    image: "logo1.png",
  },
  {
    image: "logo2.png",
  },
  {
    image: "logo3.png",
  },
  {
    image: "logo1.png",
  },
  {
    image: "logo2.png",
  },
  {
    image: "logo3.png",
  },
  {
    image: "logo4.png",
  },
  {
    image: "logo5.png",
  },
];

function Logos() {
  return (
    <div className="text-center space-y-8 container mx-auto pt-32">
      <div className="flex overflow-x-auto gap-8 items-center">
        <div className="mx-auto">
          <p className="text-gray-400 text-lg">We are</p>
          <h2 className="text-2xl font-bold mb-8 text-gray-500">Featured in</h2>
        </div>
        {/* <div className="overflow-x-auto"> */}
          {LogosArray.map((logo, index) => (
          <div key={index} className="mx-auto flex">
            <div className="w-[20.58px] h-[20.54px]">
              <Image
                src={`/assets/logo/${logo.image}`}
                alt="logo..."
                height={30.54}
                width={30.58}
              />
            </div>
            <p className="text-gray-600 ml-3 font-bold text-xl -mt-1">
              logoipsum
            </p>
          </div>
        ))}
        {/* </div> */}
        
      </div>
    </div>
  );
}

export default Logos;
