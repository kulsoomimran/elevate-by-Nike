import Link from "next/link";
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

const Footer = () => {
    return (
        <div className="bg-black text-white py-8 px-6 md:px-12">
            {/* Top Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-600 pb-8">
                
                {/* FIND A STORE Section */}
                <div className="font-helveticaNeue font-normal">
                    <h3 className="text-xs mb-4">FIND A STORE</h3>
                    <ul className="space-y-2 text-xs">
                        <li><Link href="#" className="hover:underline">BECOME A MEMBER</Link></li>
                        <li><Link href="#" className="hover:underline">SIGN UP FOR EMAIL</Link></li>
                        <li><Link href="#" className="hover:underline">Send Us Feedback</Link></li>
                        <li><Link href="#" className="hover:underline">STUDENT DISCOUNTS</Link></li>
                    </ul>
                </div>

                {/* GET HELP Section */}
                <div className="text-xs font-helveticaNeue font-normal ">
                    <h3 className="mb-4">GET HELP</h3>
                    <ul className="space-y-2 text-darkGray">
                        <li><Link href="#" className="hover:underline">Order Status</Link></li>
                        <li><Link href="#" className="hover:underline">Delivery</Link></li>
                        <li><Link href="#" className="hover:underline">Returns</Link></li>
                        <li><Link href="#" className="hover:underline">Payment Options</Link></li>
                        <li><Link href="#" className="hover:underline">Contact Us on Nike.com</Link></li>
                        <li><Link href="#" className="hover:underline">Contact Us on All Other Inquiries</Link></li>
                    </ul>
                </div>

                {/* ABOUT NIKE Section */}
                <div className="text-xs font-helveticaNeue font-normal">
                    <h3 className="mb-4">ABOUT NIKE</h3>
                    <ul className="space-y-2 text-darkGray">
                        <li><Link href="#" className="hover:underline">News</Link></li>
                        <li><Link href="#" className="hover:underline">Careers</Link></li>
                        <li><Link href="#" className="hover:underline">Investors</Link></li>
                        <li><Link href="#" className="hover:underline">Sustainability</Link></li>
                    </ul>
                </div>

                {/* Social Media Icons */}
                <div className="flex justify-start lg:justify-end items-start gap-4">
                <FaTwitter className="text-lg cursor-pointer hover:text-gray-400" />
                    <FaFacebook className="text-lg cursor-pointer hover:text-gray-400" />
                    <FaYoutube className="text-lg cursor-pointer hover:text-gray-400" />
                    <FaInstagram className="text-lg cursor-pointer hover:text-gray-400" />
                </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                {/* Country and Copyright */}
                <div className="flex items-center space-x-2 mb-4 text-white sm:mb-0">
                    <IoLocationOutline className="text-lg" />
                    <p>India</p>
                    <p className=" text-darkGray">© 2023 Nike, Inc. All Rights Reserved</p>
                </div>

                {/* Footer Links */}
                <div className="flex flex-wrap gap-4 justify-center sm:justify-end text-darkGray">
                    <Link href="#" className="hover:underline">Guides</Link>
                    <Link href="#" className="hover:underline">Terms of Sale</Link>
                    <Link href="#" className="hover:underline">Terms of Use</Link>
                    <Link href="#" className="hover:underline">Nike Privacy Policy</Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
