"use client";

import Link from "next/link"
import Image from "next/image"
import Jumpman from "/public/Jumpman.png"
import Nike from "/public/Nike.png"
import { GiHamburgerMenu } from "react-icons/gi"
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      {/* 🔹 First Header (Top Header) */}
      <header className="bg-[#F5F5F5] border-b font-[Helvetica Neue] flex justify-between items-center px-10 py-2">
        {/* Left - Jumpman Logo */}
        <Image src={Jumpman} alt="Logo" className="w-[50px]" />

        {/* Center - Navigation */}
        <nav>
          <ul className="flex items-center space-x-3 text-black text-[11px] font-medium">
            <li><Link href="/">Home</Link></li>
            <span className="h-[14px] w-px bg-gray-400" />
            <li><Link href="/JoinUs">Join Us</Link></li>
            <span className="h-[14px] w-px bg-gray-400" />
            <li><Link href="/SignIn">Sign In</Link></li>
          </ul>
        </nav>
      </header>

      {/* 🔹 Second Header (Main Navigation) */}
      <header className="bg-white border-b shadow-sm">
        <div className="flex justify-between items-center px-4 md:px-8 py-3">
          
          {/* Left - Nike Logo */}
          <Link href="/">
            <Image src={Nike} alt="Logo" className="w-[60px]" />
          </Link>

          {/* Center - Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center font-medium">
            <Link href="/Products" className="text-black hover:underline">Shop Now</Link>
            <Link href="/ContactUs" className="text-black hover:underline">Contact Us</Link>
            <Link href="/CheckOut" className="text-black hover:underline">Check Out</Link>
          </nav>

          {/* Right - Icons & Auth Links */}
          <div className="flex items-center space-x-4">
            <Link href="/wishlist"><AiOutlineHeart className="text-black text-lg" /></Link>
            <Link href="/cart"><HiOutlineShoppingBag className="text-black text-lg"/></Link>
          </div>

          {/* Hamburger Menu Button */}
          <button 
            className="md:hidden text-black text-lg flex items-center space-x-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <GiHamburgerMenu />
          </button>
        </div>

        {/* Mobile Menu - Slide Down Effect */}
        <div className={`md:hidden bg-white w-full px-4 py-3 transition-all duration-300 ${menuOpen ? "block" : "hidden"}`}>
          <Link href="/Products" className="block text-black hover:underline py-2">Shop Now</Link>
          <Link href="/ContactUs" className="block text-black hover:underline py-2">Contact Us</Link>
          <Link href="/CheckOut" className="block text-black hover:underline py-2">Check Out</Link>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
