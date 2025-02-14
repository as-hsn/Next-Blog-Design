import Image from "next/image";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

export default function Testimonials() {
  return (
    <div className="pt-32">
      <div className="relative w-full max-w-7xl bg-yellow-100/50 mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="relative mt-8 grid lg:grid-cols-2 gap-8 lg:gap-24">
          <div className="space-y-6 lg:pl-[6rem] vl">
            <div className="lg:mr-14">
              <h2 className="text-sm font-semibold uppercase text-black mb-4 sm:mb-6 lg:mb-8">
                Testimonials
              </h2>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-black mb-4 sm:mb-6 lg:mb-8 lg:w-[25rem]">
                What people say about our blog
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 lg:mb-8 lg:w-[20rem]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </p>
            </div>
          </div>
          <div className="space-y-6 lg:pr-[10rem]">
            <h5 className="text-lg sm:text-xl font-bold leading-tight text-black mb-8 sm:mb-12 lg:mb-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </h5>
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="relative w-14 h-14 flex-shrink-0">
                  <Image
                    src="/assets/testimonials/image.png"
                    alt="img ..."
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="ml-4 text-center sm:text-left">
                  <h5 className="text-xl text-black">Jonathan Vallem</h5>
                  <p className="text-gray-500">New york, USA</p>
                </div>
              </div>
              <div className="flex gap-4 mt-4 sm:mt-0">
                <CiCircleChevLeft className="text-4xl sm:text-5xl text-gray-500 cursor-pointer" />
                <CiCircleChevRight className="text-4xl sm:text-5xl text-gray-500 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
