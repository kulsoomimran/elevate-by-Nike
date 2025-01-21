import Link from "next/link"
import Image from "next/image"
import Jumpman from "/public/Jumpman.png"
import Nike from "/public/Nike.png"
import { GiHamburgerMenu } from "react-icons/gi"
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";

const Navbar = () => {
    return (
  <div>
          <header className="bg-[#F5F5F5] border-b font-[Helvetica Neue] flex justify-between items-center px-10 py-2">

            <Image src={Jumpman} alt="Logo" className="w-[50px]" />

            <nav>
              <ul className="flex items-center space-x-3 text-black text-[11px] font-medium">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <span className="h-[14px] w-px bg-gray-400" />
                <li>
                  <Link href="../JoinUs">Join Us</Link>
                </li>
                <span className="h-[14px] w-px bg-gray-400" />
                <li>
                  <Link href="../SignIn">Sign In</Link>
                </li>
              </ul>
            </nav>
        </header>

      
      <header className="bg-white border-b shadow-sm">

        <div className="flex justify-between items-center px-4 md:px-8 py-2">

          <Image src={Nike} alt="Logo" className="w-[60px]" />

          <nav className="hidden md:flex space-x-6 items-center font-medium">
            <a href="../Products" className="text-black hover:underline">
             Shop Now
            </a>
            <a href="../ContactUs" className="text-black hover:underline">
              Contact Us
            </a>
            <a href="../CheckOut" className="text-black hover:underline">
              Check Out
            </a>
          </nav>
  
          <div className="flex items-center space-x-4">
  
            <a href="../wishlist"><AiOutlineHeart className="text-black text-lg" /></a>
            <a href="../cart"><HiOutlineShoppingBag className="text-black text-lg"/></a>
             
          </div>
  
          <button className="md:hidden text-black text-lg">
         Menu   <GiHamburgerMenu />
        
          </button>
        </div>
        <div className="md:hidden bg-white w-full px-4 py-3 hidden" id="mobile-menu">
        <a href="../Products" className="text-black hover:underline">
             Shop Now
            </a>
            <a href="../ContactUs" className="text-black hover:underline">
              Contact Us
            </a>
            <a href="../CheckOut" className="text-black hover:underline">
              Check Out
            </a>
        </div>
      </header>
      </div>
    )
  };
  
export default Navbar;