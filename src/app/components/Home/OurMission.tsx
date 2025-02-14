export default function OurMission() {
  return (
    <div className="min-h-screen mb-14 mt-[8rem]">
      <div className="relative w-full max-w-8xl bg-purple-100/50 mx-auto px-4 py-16">
        <div className="absolute top-0 left-[20%] -mt-[1.20rem] w-full h-2 flex">
          <div className="w-[60%] h-[1.2rem] bg-yellow-400" />
          <div className="w-[20%] h-[1.2rem] bg-purple-800" />
        </div>
        <div className="relative mt-8 grid md:grid-cols-2 gap-12 md:gap-24">
          <div className="space-y-6">
            <h2 className="text-sm font-semibold uppercase text-black">
              ABOUT US
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold leading-tight text-black">
              We are a community of content writers who share their learnings
            </h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-purple-800 font-semibold hover:opacity-80 transition-opacity"
            >
              Read More {">"}
            </a>
          </div>
          <div className="space-y-6">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-black">
              OUR MISION
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold leading-tight text-black">
              Creating valuable content for creatives all around the world
            </h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
