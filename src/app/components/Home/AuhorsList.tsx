import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface authorProps {
  id: string;
  name: string;
  image: string;
  blogCount: string;
}

export default function AuthorsList() {
  const [authors, setAuthors] = useState<authorProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getAuthors() {
    try {
      const response = await fetch(`/api/authors`, { method: "GET" });
      const data = await response.json();
      if (data.success) {
        setAuthors(data.authors);
      }
    } catch (error) {
      console.error("Error fetching authors:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAuthors();
  }, []);

  return (
    <div className="container mx-auto pt-32">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-black mb-12">
        List of Authors
      </h1>

      <div className="flex gap-6 overflow-x-auto pb-4 px-4" data-id="authors_parent_div">
        {isLoading ? (
          Array(4).fill(0).map((_,index) =>  (
            <div 
              key={index}
              className="bg-gray-50 rounded-lg p-8 flex flex-col items-center text-center shadow-md min-w-[260px] flex-shrink-0"
            >
              <Skeleton 
                circle 
                width={80} 
                height={80} 
                className="mb-4" 
              />
              <Skeleton 
                width={150} 
                height={24} 
                className="mb-2" 
              />
              <Skeleton 
                width={200} 
                height={20} 
              />
            </div>
          ))
        ) : (
          authors.map((author, index) => (
            <Link
              href={`/author-detail/${author.id}`}
              key={index}
              className="bg-gray-50 rounded-lg p-8 flex flex-col items-center text-center shadow-md min-w-[260px] flex-shrink-0"
            >
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-black">{author.name}</h3>
              <p className="text-gray-600">Total Blogs Published: {author.blogCount}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}