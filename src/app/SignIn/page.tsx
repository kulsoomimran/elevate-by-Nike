import { SiNike } from "react-icons/si";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-md p-6 sm:p-8 md:p-12 shadow-lg">
        
        <div className="flex justify-center mb-6">
          <SiNike className="text-4xl text-gray-800" />
        </div>

        <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          YOUR ACCOUNT FOR EVERYTHING NIKE
        </h2>

        <div className="mt-6 space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
          </div>
          <div>
            <input
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
          By Logging in, you agree to Nike&apos;s{" "}
          <a href="#" className="underline hover:text-gray-800">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-gray-800">
            Terms of Use
          </a>.
        </p>

        <button className="w-full bg-black text-white py-3 rounded-md mt-6 hover:bg-gray-800 transition duration-300">
          SIGN IN
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Not a Member?{" "}
          <Link href="../JoinUs" className="text-black underline hover:text-gray-800">Join Us.</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;