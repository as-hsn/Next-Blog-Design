import Image from "next/image";

export default function CategorySection() {
  const categories = [
    {
      icon: "building.png",
      title: "Business",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      isHighlighted: false,
    },
    {
      icon: "rocket.png",
      title: "Startup",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      isHighlighted: true,
    },
    {
      icon: "economy.png",
      title: "Economy",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      isHighlighted: false,
    },
    {
      icon: "technology.png",
      title: "Technology",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      isHighlighted: false,
    },
  ];
  return (
    <div className="container mx-auto lg:-mt-48 xl:-mt-48 md:mt-3 sm:mt-20 ">
      <h1 className="text-center text-3xl md:text-4xl font-bold mb-12 text-slate-900">
        Choose A Category
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="p-6 rounded-lg border transition-all hover:bg-yellow-400 bg-white border-gray-200"
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
    </div>
  );
}
