import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function AuthorsList() {
  const authors = [
    {
      name: "Floyd Miles",
      role: "Content Writer @Company",
      image: "author1.png",
    },
    {
      name: "Dianne Russell",
      role: "Content Writer @Company",
      image: "author2.png",
    },
    {
      name: "Jenny Wilson",
      role: "Content Writer @Company",
      image: "author3.png",
    },
    {
      name: "Leslie Alexander",
      role: "Content Writer @Company",
      image: "author4.png",
    },
  ];

  return (
    <div className="container mx-auto mt-[8rem]">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-black mb-12">
        List of Authors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {authors.map((author, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-8 flex flex-col items-center text-center"
          >
            <div className="relative w-24 h-24 mb-4">
              <Image
                src={`/assets/author/${author.image}`}
                alt={author.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-black">{author.name}</h3>
            <p className="text-gray-600 mb-6">{author.role}</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FaFacebook className="text-black h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FaTwitter className="text-black h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FaInstagram className="text-black h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FaLinkedin className="text-black h-5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
