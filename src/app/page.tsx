import Image from "next/image";
import { StaticImageData } from "next/image";
import Nikee from "/public/HomeImages/AirMaxPulse.jpg";
import AirMaxPulse from "/public/HomeImages/airmax1.png";
import AirMax from "/public/HomeImages/airmax97.png";
import Running from "/public/HomeImages/running.png";
import ManShortSleeves from "/public/menShortSleeves.png";
import VersatileShorts from "/public/HomeImages/versatileShorts.png";
import WomenTop from "/public/HomeImages/womenLongSleeves.png";
import Leggings from "/public/HomeImages/leggings.png";
import Jordan from "/public/HomeImages/jordan.png";
import Men from "/public/HomeImages/men.png";
import Women from "/public/HomeImages/women.png";
import Kids from "/public/HomeImages/kids.png";

type ProductCardProps = {
  image: StaticImageData;
  title?: string;
  description?: string;
  price?: string;
};

export default function Home() {
  return (
    <div className="w-screen bg-gray-100">
      {/* Hero Section */}
      <div className="flex justify-center items-center w-full max-w-[1225px] mx-auto h-[58px] bg-[#F5F5F5] text-black">
        <div className="h-[44px] flex flex-col justify-center items-center w-full">
          <h3 className="font-medium text-sm text-center">Hello Nike App</h3>
          <p className="text-[12px] font-normal mb-1 mt-1 text-center">
            Download the app to access everything Nike.
            <span className="font-medium underline ml-1 cursor-pointer hover:text-gray-800">
              Get Your Great
            </span>
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center px-4">
        <Image
          src={Nikee}
          alt="shoes"
          width={1150}
          height={700}
          className="w-full max-w-[1150px] h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="text-center px-6 py-12 bg-white">
        <p className="mt-4 text-lg font-bold text-black max-w-2xl mx-auto">First Look</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          NIKE AIR MAX PULSE
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Extreme comfort. Hyper durable. Max volume. Introducing the Air Max Pulse
          —designed to push you past your limits and help you go to the max.
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <button className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 hover:shadow-lg transition-all duration-300">
            Notify Me
          </button>
          <button className="px-6 py-3 text-white bg-black rounded-full hover:bg-gray-800 hover:shadow-lg transition-all duration-300">
            Shop Air Max
          </button>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Best of Air Max</h2>
          <div className="flex space-x-2">
            <button className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200 transition">
              ←
            </button>
            <button className="p-2 bg-gray-300 rounded-full shadow hover:bg-gray-400 transition">
              →
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard
            image={AirMaxPulse}
            title="Nike Air Max Pulse"
            description="Women's Shoes"
            price="₹ 13,995"
          />
          <ProductCard
            image={AirMaxPulse}
            title="Nike Air Max Pulse"
            description="Men's Shoes"
            price="₹ 13,995"
          />
          <ProductCard
            image={AirMax}
            title="Nike Air Max 97 SE"
            description="Men's Shoes"
            price="₹ 16,995"
          />
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <Image
            src={Running}
            alt="Running Man"
            width={1200}
            height={600}
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <h1 className="mt-8 text-3xl md:text-4xl font-semibold text-gray-900">
            STEP INTO WHAT FEELS GOOD
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Cause everyone should know the feeling of running in that perfect pair.
          </p>
          <button className="mt-6 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 hover:shadow-lg transition-all duration-300">
            Find Your Shoe
          </button>
        </div>
      </div>

      <div className="px-6 py-16 bg-white">
        <h2 className="text-2xl md:text-3xl font-normal text-gray-900 mb-8">Gear Up</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            image={ManShortSleeves}
            title="Nike Dri-FIT ADV TechKnit Ultra"
            description="Men's Top"
            price="₹ 3,895"
          />
          <ProductCard
            image={VersatileShorts}
            title="Nike Dri-FIT Challenger"
            description="Men's Shorts"
            price="₹ 2,495"
          />
          <ProductCard
            image={WomenTop}
            title="Nike Dri-FIT ADV Run Division"
            description="Women's Top"
            price="₹ 5,295"
          />
          <ProductCard
            image={Leggings}
            title="Nike Fast"
            description="Women's Leggings"
            price="₹ 3,795"
          />
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="text-center">
          <Image
            src={Jordan}
            alt="Jordan Flight Essentials"
            width={1200}
            height={600}
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <h1 className="mt-8 text-3xl md:text-4xl font-semibold text-gray-900">
            FLIGHT ESSENTIALS
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Your built-to-last, all-week wears—but with style only Jordan Brand can deliver.
          </p>
          <button className="mt-6 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 hover:shadow-lg transition-all duration-300">
            Shop
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 py-16 bg-white">
        <div className="text-center group">
          <Image
            src={Men}
            alt="Shop Men"
            width={300}
            height={300}
            className="rounded-lg mx-auto group-hover:scale-105 transition-transform duration-300"
          />
          <h3 className="mt-4 text-xl font-bold group-hover:text-gray-700">
            Men
          </h3>
        </div>
        <div className="text-center group">
          <Image
            src={Women}
            alt="Shop Women"
            width={300}
            height={300}
            className="rounded-lg mx-auto group-hover:scale-105 transition-transform duration-300"
          />
          <h3 className="mt-4 text-xl font-bold group-hover:text-gray-700">
            Women
          </h3>
        </div>
        <div className="text-center group">
          <Image
            src={Kids}
            alt="Shop Kids"
            width={300}
            height={300}
            className="rounded-lg mx-auto group-hover:scale-105 transition-transform duration-300"
          />
          <h3 className="mt-4 text-xl font-bold group-hover:text-gray-700">
            Kids
          </h3>
        </div>
      </div>
    </div>
  );
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title = "", description = "", price = "" }) => (
  <div className="text-center group">
    <Image
      src={image}
      alt={title}
      width={300}
      height={300}
      className="rounded-lg mx-auto shadow-lg group-hover:scale-105 transition-transform duration-300"
    />
    <h3 className="text-lg font-semibold mt-4 group-hover:text-gray-700">{title}</h3>
    <p className="text-gray-500">{description}</p>
    <p className="text-gray-900 font-bold">{price}</p>
  </div>
);
