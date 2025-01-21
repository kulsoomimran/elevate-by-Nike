"use client";

import { IoIosSearch } from "react-icons/io";

import { RiMessage2Fill } from "react-icons/ri";

import { TbMessageFilled } from "react-icons/tb";

import { IoLocation } from "react-icons/io5";

import { BiSolidLike } from "react-icons/bi";

import { BiSolidDislike } from "react-icons/bi";


import React from "react";

const ContactUsPage = () => {

  return (

    <main className="bg-white flex flex-col items-center w-full">

      <section className="w-full max-w-[1440px] px-4 py-8">

        <h1 className="text-center text-2xl font-medium text-[#111111]">

          GET HELP

        </h1>

        <div className="mt-4 flex justify-center ">

          <div className= "w-[457px] rounded-lg border  ml-5 text-gray-500/80 py-3 border-slate-800 " >

            What can we help you with?

            </div>

            <div className="-ml-11 mt-4"><IoIosSearch/></div>      

        </div>

        <div className="mt-8 flex flex-col lg:flex-row gap-8">

          <article className="flex-1">

            <h2 className="text-xl ml-4 font-semibold  text-[#111111]">

              WHAT PAYMENT OPTIONS CAN I USE ON NIKE ORDERS?

            </h2>

            <p className="ml-5 mt-4 text-sm text-[#111111]">

              We want to make buying your favourite Nike shoes and gear online

              fast and easy, and we accept the following payment options:

            </p>

            <ul className="mt-2 ml-5 list-none pl-5 text-sm text-[#111111]">

              <li>Visa, Mastercard, Diners Club, Discover, American Express</li>

              <li>Visa Electron, Maestro</li>

              <li>Apple Pay</li>

            </ul>

            <p className="mt-4 ml-5 text-sm text-[#111111]">

              Nike Members can store multiple debit or credit cards in their

              profile for faster checkout. If you&apos;re not already a Member,{" "}

              <a href="#" className="underline">

                join us

              </a>{" "}

              today.

            </p>

            <div className="mt-4 flex space-x-4">

              <button className="bordder bg-slate-900 rounded-full py-2 px-4 text-white">JOIN US</button>

              <button className="bordder bg-slate-900 rounded-full py-2 px-4 text-white">SHOP NIKE</button>

            </div>

            <div className="ml-2 mt-8">

              <h1>Faq&apos;s</h1>

            <h1 className="text-slate-900 font-semibold mt-2">Does my card need international purchases enabled?</h1>

            <p className="text-slate-900/90" >Yes, we recommend asking your bank to enable international purchases on your card. You will be notified at checkout if international purchases need to be enabled.</p>

            <p className="mt-4  text-slate-900/90">Please note, some banks may charge a small transaction fee for international orders.</p>

            <h1 className="text-slate-900 font-semibold mt-2">Can I pay for my order with multiple methods?</h1>

            <p className="text-slate-900/90" >No, payment for Nike orders can&apos;t be split between multiple payment methods.</p>

            <h1 className="text-slate-900 font-semibold mt-2">What payment method is accepted for SNKRS orders?</h1>

            <p>You can use any accepted credit card to pay for your SNKRS order.

            five business days</p>

            <h1 className="text-slate-900 font-semibold mt-2">Why don&apos;t I see Apple Pay as an option?</h1>

            <p className="text-slate-900/90" >To see Apple Pay as an option in the Nike App or on Nike.com, you&apos;ll need to use a compatible Apple device running the latest OS, be signed in to your iCloud account and have a supported card in your Wallet. Additionally,
 you&apos;ll need to use Safari to use Apple Pay on Nike.com.</p>

            <h1 className="text-slate-900 font-semibold mt-5">Was this answer helpful?</h1>

            <div className="flex mt-2">

            <BiSolidLike     className="flex w-8 h-8"  />

            <BiSolidDislike  className="flex w-8 h-8" />

            </div>

            <p className="text-gray-500/80 font-[600] mt-2">RELATED</p>

            </div>

           <div>

            <h1 className="font-semibold text-slate-900/80 ml-9 mt-11 underline underline-offset-2rli">WHAT ARE NIKE&apos;S DELIVERY OPTIONS?</h1>

            <h1 className="font-semibold text-slate-900/80 ml-9 mt-4 underline underline-offset-2rli">HOW DO I GET FREE DELIVERY ON NIKE ORDERS?</h1>

           </div>

          </article>

          <aside className="w-full lg:w-[300px] text-center border h-[650px] border-r-0 border-t-0 border-b-0">

            <h3 className="text-lg font-semibold text-[#111111]">CONTACT US</h3>

            <ul className="mt-4 space-y-4 text-sm text-[#111111]">

              <li className="font-medium">000 800 919 0566</li>

              <li>Products & Orders: 24 hours a day,<br/> 7 days a week</li>

              <li>Company Info & Enquiries: 07:30 -<br/> 16:30, Monday - Friday</li>

            </ul>

            <div className="flex flex-col mt-4 items-center">


            <RiMessage2Fill  className="w-9 h-9 mt-11" />

            <p>24 hours a day</p>

            <p>7 days a week</p>

            <TbMessageFilled className="w-9 h-9 mt-11" />

            <p>we ll reply within</p>

            <p>five business days</p>

            <IoLocation  className="w-9 h-9 mt-11" />

            <p>STORE LOCATION</p>

            <p>Find nike retail stores near you</p>

            </div>

          </aside>

        </div>

      </section>

    </main>

  );

};
export default ContactUsPage