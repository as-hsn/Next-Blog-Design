import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface authorProps{
  id:string,
  name: string;
  image: string;
  blogCount: string
}

export default  function  AuthorsList() {
   const [authors,setAuthors] = useState<authorProps[]>([])

  async function getAuthors () {
    const response = await fetch(`/api/authors`,{method:"GET"})
    const data = await response.json()
    if (data.success) {
      setAuthors(data.authors)
      console.log('data.authors ......',data.authors)
    }
  }

  useEffect(() => {
    getAuthors()
  },
  [])

  return (
    <div className="container mx-auto pt-32">
  <h1 className="text-3xl md:text-4xl font-bold text-center text-black mb-12">
    List of Authors
  </h1>
  {authors && (
    <div className="flex gap-6 overflow-x-auto pb-4 px-4">
      {authors.map((author, index) => (
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
      ))}
    </div>
  )}
</div>
  );
}
