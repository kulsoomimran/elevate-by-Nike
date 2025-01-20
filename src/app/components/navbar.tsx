import Link from "next/link"
import Image from "next/image"
import Jumpman from "/public/Jumpman.png"
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";

const Navbar = () => {
    return (
  <div>
          <header className="bg-[#F5F5F5] border-b font-[Helvetica Neue] flex justify-between items-center px-10 py-2">
            {/* Logo Section */}
            <Image src={Jumpman} alt="Logo" className="w-[50px]" />
      
            {/* Links Section */}
            <nav>
              <ul className="flex items-center space-x-3 text-black text-[11px] font-medium">
                <li>
                  <Link href="../Products">Home</Link>
                </li>
                <span className="h-[14px] w-px bg-gray-400" />
                <li>
                  <Link href="../ContactUs">Help</Link>
                </li>
                <span className="h-[14px] w-px bg-gray-400" />
                <li>
                  <Link href="../JoinUs">Join Us</Link>
                </li>
                <span className="h-[14px] w-px bg-gray-400" />
                <li>
                  <Link href="../SignIn">Sign In</Link>
                </li>
                <li><a href="../wishlist"><AiOutlineHeart className="text-black text-lg" /></a></li>
                <li><a href="../cart"><HiOutlineShoppingBag className="text-black text-lg"/></a></li>
              </ul>
            </nav>
        </header>
      </div>
    )
  };
  
export default Navbar;