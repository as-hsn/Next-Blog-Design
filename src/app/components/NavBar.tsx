"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiMenuFold4Line } from "react-icons/ri";
import { MdMenuOpen } from "react-icons/md";

function Header() {
  const [visible, setVisible] = useState<boolean>(false);
  const pathname = usePathname();

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
        <ul className="hidden md:flex gap-3 lg:gap-5 text-sm text-gray-700 items-baseline md:-mr-4 lg:-mr-[20rem] xl:-mr-[32rem] custom-style-navbar">
          <Link
            className={`${
              pathname === "/" && "active"
            } flex flex-col items-center gap-1 custom-footer-css`}
            href="/"
          >
            <p className="text-white">HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-white hidden" />
          </Link>
          <Link
            className={`${
              pathname === "/collection" && "active"
            } flex flex-col items-center gap-1 `}
            href="/collection"
          >
            <p className="text-white">Blog</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-white hidden" />
          </Link>

          <Link
            className={`${
              pathname === "/about" && "active"
            } flex flex-col items-center gap-1 `}
            href="/about"
          >
            <p className="text-white">About Us</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-white hidden" />
          </Link>
          <Link
            className={`${
              pathname === "/contact" && "active"
            } flex flex-col items-center gap-1 `}
            href="/contact"
          >
            <p className="text-white">Contact Us</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-white hidden" />
          </Link>
          <Link
            className={`${
              pathname === "/contact" && "active"
            } flex flex-col items-center gap-1 `}
            href=""
          >
            <p className="text-customDark bg-white px-3 md:px-4 lg:px-6 py-2 md:py-3 font-semibold text-xs sm:text-sm md:text-base">
              Subscribe
            </p>
          </Link>
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
                pathname === "/collection" && "bg-black text-white"
              } py-2 pl-6 border `}
              href="/collection"
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
                pathname === "/contact" && "bg-black text-white"
              } py-2 pl-6 border`}
              href="/contact"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
