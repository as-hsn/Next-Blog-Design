"use client";
import Image from "next/image";
import Link from "next/link";
import { CategoriesData } from "../../../../public/data/category-cards";
import { useCallback, useEffect, useState } from "react";
import ShowToast from "../ShowToast";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface BlogPost {
  id: number;
  title: string;
  body: string;
  blogImgUrl: string;
  category: string;
}

export default function CategoryPosts() {
  const searchParams = useSearchParams();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const [totalNumberBlogs, setTotalNumberBlogs] = useState(0);
  const blogsPerPage = Number(process.env.NEXT_PUBLIC_BLOGS_PER_PAGE);
  const page = parseInt(searchParams.get("page") || "1");
  const category = searchParams.get("category");
  const [categorySelected, setCategorySelected] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getBlogs =  useCallback(async () => {
    try {
      if (category) {
        setCategorySelected(true);
        setLoading(true);
        const res = await fetch(
          `/api/blogs?category=${category}&page=${page}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        if (data.success) {
          setBlogs(data.blogs);
          setTotalNumberBlogs(data.totalBlogsCount);
        } else {
          ShowToast(data.message, "error");
        }
      } else {
        setLoading(true);
        const res = await fetch(`/api/blogs?page=${page}`, {
          method: "GET",
        });
        const data = await res.json();

        if (data.success) {
          setBlogs(data.blogs);
          setTotalNumberBlogs(data.totalBlogsCount);
        } else {
          ShowToast(data.message, "error");
        }
      }
    } catch (error) {
      void error;
      ShowToast("something went wrong", "error");
    } finally {
      setLoading(false)
    }
  },[category,page])

  useEffect(() => {
    const element = document.querySelector(".target-scroll");
    if (element && category) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 100,
        behavior: "smooth",
      });
    }
    getBlogs();
  }, [page, category, getBlogs]);

  const updatePageNumber = (newPage: number) => {
    const maxPage = Math.ceil(totalNumberBlogs / blogsPerPage);
    if (newPage < 1 || newPage > maxPage) return;
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const updateCategory = (newCategory: string) => {
    if (category === newCategory) {
      const params = new URLSearchParams(searchParams);
      params.delete("category");
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    } else {
      const params = new URLSearchParams(searchParams);
      params.set("category", newCategory.toString());
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <div className="w-full block lg:flex xl:flex max-w-7xl mx-auto px-20 gap-28">
      {/* Left Side Div */}
      <div className="space-y-8 lg:max-w-[65%]">
        {blogs.length > 0
          ? blogs.map((post, index) => (
              <Link
                href={`blog-post/${post.title}`}
                key={index}
                className="group block hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  <div className="w-full max-w-[352px] mx-auto sm:mx-0 sm:w-48 sm:h-48 md:w-64 lg:w-[15rem] lg:h-[15rem] aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={post.blogImgUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>

                  <div className="flex-1 space-y-2 sm:space-y-3 max-w-[40rem] mt-6">
                    <span className="text-xs font-semibold tracking-wider text-purple-800">
                      {post.category}
                    </span>
                    <h2 className="text-lg sm:text-lg lg:text-3xl font-bold text-gray-900 group-hover:text-purple-800 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
                      {post.body}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          : loading && (
              <div className="w-full flex flex-col gap-4 space-y-8 max-w-fit mx-auto">
                {[...Array(2)].map((_, index) => (
                  <div
                    key={index}
                    className="flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 w-full mx-auto flex items-center"
                  >
                    <Skeleton height={200} width={200} />
                    <div className="w-full sm:w-48 md:w-64 lg:w-[22rem] aspect-[4/3] relative overflow-hidden rounded-lg flex items-center">
                      <div className="flex-1">
                        <Skeleton
                          width={120}
                          height={20}
                          className="rounded-md mb-6"
                        />
                        <Skeleton
                          width="100%"
                          height={50}
                          className="rounded-md mb-6"
                        />
                        <Skeleton
                          width="100%"
                          height={30}
                          className="rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

        <div className="mt-12 flex justify-center gap-4">
          <button
            onClick={() => updatePageNumber(page - 1)}
            disabled={page <= 1}
            className={`px-4 py-2 text-lg font-medium ${
              page <= 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:text-indigo-600"
            }`}
          >
            {"<"} Prev
          </button>
          <p className="py-2 text-gray-600 font-semibold text-lg">{page}</p>
          <button
            onClick={() => updatePageNumber(page + 1)}
            disabled={page >= Math.ceil(totalNumberBlogs / blogsPerPage)}
            className={`px-4 py-2 text-lg font-medium ${
              page >= Math.ceil(totalNumberBlogs / blogsPerPage)
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:text-indigo-600"
            }`}
          >
            Next {">"}
          </button>
        </div>
      </div>
      {/* Right Side Div */}
      <div className="lg:max-w-[30%] md:gap-20 md:flex md:mt-16 lg:mt-0 lg:block lg:mr-[6rem]">
        {/* Categories Div */}
        <div className="mb-12 mt-14 md:mt-0 md:min-w-[40%]">
          <h1 className="text-black font-semibold text-3xl lg:mb-8 mb-12 target-scroll">
            Categories
          </h1>
          <div className="grid grid-cols-1 gap-4">
            {CategoriesData.slice(0, 4).map((innerCategory, index) => (
              <div
                onClick={() => {
                  updateCategory(
                    innerCategory.title
                      .toLowerCase()
                      .toLowerCase()
                      .toLowerCase()
                      .toLowerCase()
                      .toLowerCase()
                      .toLowerCase()
                  );
                  if (
                    categorySelected &&
                    category === innerCategory.title.toLowerCase()
                  ) {
                    setCategorySelected(false);
                  } else {
                    setCategorySelected(true);
                  }
                }}
                key={index}
                className={`p-4 border-2 transition-all hover:bg-yellow-400 bg-white border-gray-200 min-w-60 cursor-pointer ${
                  categorySelected &&
                  category === innerCategory.title.toLowerCase() &&
                  "bg-yellow-400"
                }`}
              >
                <div className="flex">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center
                       bg-yellow-100
                      "
                  >
                    <Image
                      src={`/assets/category/${innerCategory.icon}`}
                      width={20}
                      height={20}
                      alt="icons .."
                    ></Image>
                  </div>
                  <h3 className="text-xl pt-[0.5rem] pl-4 font-semibold text-slate-900">
                    {innerCategory.title
                      .toLowerCase()
                      .toLowerCase()
                      .toLowerCase()
                      .toLowerCase()
                      .toLowerCase()}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Tags Div */}
        <div className="md:min-w-[50%]">
          <h1 className="text-black text-center md:text-left  font-semibold text-3xl mb-10">
            All Tags
          </h1>
          <div className="w-auto md:w-24 text-center">
            <div className="flex gap-3 mb-4 justify-center md:justify-self-start">
              {CategoriesData.slice(0, 2).map((innerCategory, index) => (
                <p
                  onClick={() => {
                    updateCategory(
                      innerCategory.title
                        .toLowerCase()
                        .toLowerCase()
                        .toLowerCase()
                        .toLowerCase()
                        .toLowerCase()
                    );
                    if (
                      categorySelected &&
                      category ===
                        innerCategory.title
                          .toLowerCase()
                          .toLowerCase()
                          .toLowerCase()
                          .toLowerCase()
                          .toLowerCase()
                    ) {
                      setCategorySelected(false);
                    } else {
                      setCategorySelected(true);
                    }
                  }}
                  className={`text-gray-500 border-2 border-gray-300 rounded-full w-fit py-3 font-semibold px-9 text-sm cursor-pointer ${
                    categorySelected &&
                    category ===
                      innerCategory.title
                        .toLowerCase()
                        .toLowerCase()
                        .toLowerCase()
                        .toLowerCase()
                        .toLowerCase() &&
                    "bg-yellow-400 text-stone-800 border-none"
                  }`}
                  key={index}
                >
                  {innerCategory.title
                    .toLowerCase()
                    .toLowerCase()
                    .toLowerCase()
                    .toLowerCase()
                    .toLowerCase()}
                </p>
              ))}
            </div>

            <div className="flex gap-3 mb-4 justify-center md:justify-self-start">
              {CategoriesData.slice(2, 4).map((innerCategory, index) => (
                <p
                  onClick={() => {
                    updateCategory(
                      innerCategory.title
                        .toLowerCase()
                        .toLowerCase()
                        .toLowerCase()
                        .toLowerCase()
                        .toLowerCase()
                    );
                    if (
                      categorySelected &&
                      category ===
                        innerCategory.title
                          .toLowerCase()
                          .toLowerCase()
                          .toLowerCase()
                          .toLowerCase()
                          .toLowerCase()
                    ) {
                      setCategorySelected(false);
                    } else {
                      setCategorySelected(true);
                    }
                  }}
                  className={`text-gray-500 border-2 border-gray-300 rounded-full w-fit py-3 font-semibold px-9 text-sm cursor-pointer ${
                    categorySelected &&
                    category ===
                      innerCategory.title
                        .toLowerCase()
                        .toLowerCase()
                        .toLowerCase()
                        .toLowerCase()
                        .toLowerCase() &&
                    "bg-yellow-400 text-stone-800 border-none"
                  }`}
                  key={index}
                >
                  {innerCategory.title
                    .toLowerCase()
                    .toLowerCase()
                    .toLowerCase()
                    .toLowerCase()
                    .toLowerCase()}
                </p>
              ))}
            </div>
            <div className="flex gap-3 mb-4 justify-center md:justify-self-start">
              {CategoriesData.slice(4, 6).map((innerCategory, index) => (
                <p
                  onClick={() => {
                    updateCategory(
                      innerCategory.title
                        .toLowerCase()
                        .toLowerCase()
                        .toLowerCase()
                        .toLowerCase()
                        .toLowerCase()
                    );
                    if (
                      categorySelected &&
                      category ===
                        innerCategory.title
                          .toLowerCase()
                          .toLowerCase()
                          .toLowerCase()
                          .toLowerCase()
                          .toLowerCase()
                    ) {
                      setCategorySelected(false);
                    } else {
                      setCategorySelected(true);
                    }
                  }}
                  className={`text-gray-500 border-2 border-gray-300 rounded-full w-fit py-3 font-semibold px-9 text-sm cursor-pointer ${
                    categorySelected &&
                    category ===
                      innerCategory.title
                        .toLowerCase()
                        .toLowerCase()
                        .toLowerCase()
                        .toLowerCase()
                        .toLowerCase() &&
                    "bg-yellow-400 text-stone-800 border-none"
                  }`}
                  key={index}
                >
                  {innerCategory.title
                    .toLowerCase()
                    .toLowerCase()
                    .toLowerCase()
                    .toLowerCase()
                    .toLowerCase()}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
