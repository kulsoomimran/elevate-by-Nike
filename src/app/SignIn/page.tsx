"use client";
import { SiNike } from "react-icons/si";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-md p-6 sm:p-8 md:p-12 shadow-lg">
        <div className="flex flex-col items-center text-center mb-6">
          <SiNike className="text-4xl text-gray-800" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
            YOUR ACCOUNT FOR EVERYTHING NIKE
          </h2>
        </div>

        <SignedIn>
          <div className="flex flex-col items-center">
            <UserButton />
            <p className="mt-4 text-lg text-center">
              Use coupon code <span className="text-red-500 font-bold">NIKE2021</span> for 10% off on your first few purchases.
            </p>
          </div>
        </SignedIn>

        <SignedOut>
          <div className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="checkbox"
                className="w-4 h-4 border-gray-400 rounded focus:ring-gray-500"
              />
              <label htmlFor="checkbox">Keep me signed in</label>
            </div>
            <button className="text-gray-500 hover:underline">Forgotten your password?</button>
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
            By logging in, you agree to Nike&apos;s <a href="#" className="underline hover:text-gray-800">Privacy Policy</a> and <a href="#" className="underline hover:text-gray-800">Terms of Use</a>.
          </p>

          <p className="w-full flex items-center justify-center bg-black text-white py-3 rounded-md mt-6 hover:bg-gray-800 transition duration-300">
            <SignInButton mode="modal" />
          </p>
          

          <p className="mt-6 text-center text-sm text-gray-600">
            Not a Member? <Link href="../JoinUs" className="text-black underline hover:text-gray-800">Join Us.</Link>
          </p>
        </SignedOut>
      </div>
    </div>
  );
};

export default SignIn;
