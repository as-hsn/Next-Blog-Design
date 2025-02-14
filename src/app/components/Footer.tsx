import Link from "next/link";
import Image from "next/image";
import { FaFacebook,FaTwitter,FaInstagram,FaLinkedin } from "react-icons/fa";
import NewsLetter from "./NewsLetter";

const Footer = () => {
  return (
    <footer className="mt-32 bg-customDark text-white py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto mt-[1.5rem]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <Link href="/" className="text-2xl font-bold mb-4 md:mb-0">
            <Image
              src="/assets/logo.png"
              width={112}
              height={112}
              alt="Logo"
              className="w-28 sm:w-28"
            />
          </Link>
          <nav className="flex flex-col md:flex-row gap-4 md:gap-8">
            <Link href="/" className="hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link
              href="/blog"
              className="hover:text-gray-300 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="hover:text-gray-300 transition-colors"
            >
              About us
            </Link>
            <Link
              href="/contact"
              className="hover:text-gray-300 transition-colors"
            >
              Contact us
            </Link>
            <Link
              href="/privacy"
              className="hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>

        {/* News Letter Section */}
        
        <NewsLetter />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2 text-slate-400">
            <p>Finstreet 118 2561 Fintown</p>
            <p>Hello@finsweet.com 020 7993 2905</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="#"
              className="hover:text-gray-300 transition-colors text-2xl"
            >
              <FaFacebook className="text-gray-400" />
            </Link>
            <Link
              href="#"
              className="hover:text-gray-300 transition-colors text-2xl"
            >
              <FaTwitter className="text-gray-400" />
            </Link>
            <Link
              href="#"
              className="hover:text-gray-300 transition-colors text-2xl"
            >
              <FaInstagram className="text-gray-400" />
            </Link>
            <Link
              href="#"
              className="hover:text-gray-300 transition-colors text-2xl"
            >
              <FaLinkedin className="text-gray-400" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
