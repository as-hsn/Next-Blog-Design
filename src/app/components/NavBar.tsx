"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiMenuFold4Line } from "react-icons/ri";
import { MdMenuOpen } from "react-icons/md";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { PiUserCircleLight } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
import ShowToast from "./ShowToast";
import { BiMessageAdd } from "react-icons/bi";
import { LuUserPen } from "react-icons/lu";

function Header() {
  const [visible, setVisible] = useState<boolean>(false);
  const pathname = usePathname();
  const [user, setUser] = useState(false);
  const token = Cookies.get("accessToken");
  const router = useRouter();

  useEffect(() => {
    if (token) {
      setUser(true);
    }
  }, [token]);

  async function handleLogout() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      Cookies.remove("accessToken", { path: "/" });
      Cookies.remove("refreshToken", { path: "/" });
      setUser(false);
      ShowToast(data.message);
      router.refresh();
    } catch (error) {
      console.error("🚀 Logout error:", error);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between py-5 font-medium bg-customDark overflow-x-hidden">
        <Link href="/" className="ml-2 sm:ml-4 md:ml-[5rem] shrink-0">
          <Image
            src="/assets/logo.png"
            width={144}
            height={144}
            alt="Logo"
            className="w-32 sm:w-36"
          />
        </Link>
        <ul
          className="hidden md:flex gap-3 lg:gap-5 text-sm text-gray-700  md:-mr-4 lg:-mr-[20rem] xl:-mr-[31rem] custom-style-navbar items-center"
          data-id="navbar"
        >
          <Link
            className={`${
              pathname === "/" && "active"
            } flex flex-col items-center gap-1 custom-footer-css`}
            href="/"
          >
            <p className="text-white">HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-white hidden -mb-[0.35rem]" />
          </Link>
          <Link
            className={`${
              pathname === "/blog" && "active"
            } flex flex-col items-center gap-1 `}
            href="/blog"
          >
            <p className="text-white">Blog</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-white hidden -mb-[0.35rem]" />
          </Link>

          <Link
            className={`${
              pathname === "/about" && "active"
            } flex flex-col items-center gap-1 `}
            href="/about"
          >
            <p className="text-white">About Us</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-white hidden -mb-[0.35rem]" />
          </Link>

          <Link
            className={`${
              pathname === "/contact" && "active"
            } flex flex-col items-center gap-1 `}
            href="/contact"
          >
            <p className="text-white">Contact Us</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-white hidden -mb-[0.35rem]" />
          </Link>
          {!user ? (
            <Link
              className={`${
                pathname === "/contact" && "active"
              } flex flex-col items-center gap-1 `}
              href="/register"
            >
              <p className="text-customDark bg-white px-3 md:px-4 lg:px-6 py-2 md:py-3 font-semibold text-xs sm:text-sm md:text-base">
                Register
              </p>
            </Link>
          ) : (
            <>
              <div className="relative group cursor-pointer">
                <PiUserCircleLight className="text-white w-8 h-8" />

                <div className="hidden group-hover:block z-50 lg:right dropdown-menu pt-4 fixed -ml-20">
                  <div className="flex flex-col gap-2 py-3 px-5 bg-slate-100 text-gray-700 text-base rounded shadow-lg w-max">
                    <p
                      onClick={handleLogout}
                      className="flex items-center cursor-pointer hover:text-black hover:font-semibold"
                    >
                      Logout{" "}
                      <IoIosLogOut className="ml-3 text-red-500 w-6 h-6" />
                    </p>

                    <Link
                      href={"/profile"}
                      className="flex mt-4 items-center cursor-pointer hover:text-black hover:font-semibold"
                    >
                      Profile{" "}
                      <LuUserPen className="ml-3 text-indigo-500 w-6 h-6" />
                    </Link>
                    <Link
                      href={"/add-blog"}
                      className="flex mt-4 items-center cursor-pointer hover:text-black hover:font-semibold"
                    >
                      Add Blogs{" "}
                      <BiMessageAdd className="ml-3 font-light text-indigo-500 w-6 h-6" />
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </ul>
        <div className="flex items-center gap-6 mr-2 sm:mr-4 md:mr-0">
          <MdMenuOpen
            className="text-white text-[1.5rem] sm:text-[1.7rem] md:-ml-[5rem] cursor-pointer md:hidden"
            onClick={() => setVisible((prev) => !prev)}
          />
        </div>
        {/* SideBar Menu for Small Screen */}
        <div
          className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-50 ${
            visible ? "w-full" : "w-0"
          } md:hidden`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3 cursor-pointer"
            >
              <RiMenuFold4Line className="text-2xl text-black " />
              <p>Back</p>
            </div>

            <Link
              onClick={() => setVisible(false)}
              className={`${
                pathname === "/" && "bg-black text-white"
              } py-2 pl-6 border `}
              href="/"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              onClick={() => setVisible(false)}
              className={`${
                pathname === "/blog" && "bg-black text-white"
              } py-2 pl-6 border `}
              href="/blog"
            >
              Blog
            </Link>
            <Link
              onClick={() => setVisible(false)}
              className={`${
                pathname === "/about" && "bg-black text-white"
              } py-2 pl-6 border `}
              href="/about"
            >
              About Us
            </Link>
            <Link
              onClick={() => setVisible(false)}
              className={`${
                pathname === "/contact" && "bg-black text-white"
              } py-2 pl-6 border `}
              href="/contact"
            >
              Contact Us
            </Link>
            <Link
              onClick={() => setVisible(false)}
              className={`${
                pathname === "/our-policy" && "bg-black text-white"
              } py-2 pl-6 border`}
              href="/our-policy"
            >
              Privacy Policy
            </Link>
            <Link
              onClick={() => setVisible(false)}
              className={`${
                pathname === "/author" && "bg-black text-white"
              } py-2 pl-6 border`}
              href="/author"
            >
              Author
            </Link>
            <Link
              onClick={() => setVisible(false)}
              className={`${
                pathname === "/category" && "bg-black text-white"
              } py-2 pl-6 border`}
              href="/category"
            >
              Category
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
