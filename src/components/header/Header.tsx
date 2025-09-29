"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="bg-[#D9D9D9]">
        {/* 未認証 */}
        <div className="max-w-[2055px] mx-auto py-[30px] px-[30px]">
          <div className="flex justify-end items-center gap-x-[50px]">
            <Link
              className="flex justify-center items-center flex-col text-[25px] font-bold text-black border border-black w-[200px] rounded-full h-[60px] hover:opacity-70 transition duration-200 ease-in-out"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="flex justify-center items-center flex-col text-[25px] font-bold text-white border border-black w-[200px] rounded-full h-[60px] bg-[#383838] hover:opacity-70 transition duration-200 ease-in-out"
              href="/signup"
            >
              Signup
            </Link>
          </div>
        </div>
      </header>
      <header className="bg-[#D9D9D9] mt-[50px]">
        {/* 認証済 */}
        <div className="max-w-[2055px] mx-auto py-[30px] px-[30px]">
          <div className="flex justify-end items-center gap-x-[50px]">
            <Link
              className="flex justify-center items-center flex-col text-[25px] font-bold text-white border border-black w-[180px] rounded-full h-[60px] bg-[#383838] hover:opacity-70 transition duration-200 ease-in-out"
              href="/article/create"
            >
              Create
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-[80px] h-[80px] rounded-full hover:opacity-70 transition duration-200 ease-in-out"
              >
                <Image
                  src="/images/defaultAuthorIcon.svg"
                  alt="Author"
                  width={80}
                  height={80}
                />
              </button>

              {/* ドロップダウン */}
              {isOpen && (
                <div className="absolute right-[-30px] mt-[30px] bg-[#B3B3B3] rounded-[20px] px-[25px] py-[25px] shadow-lg">
                  <p className="text-[26px] font-semibold text-center">
                    User name
                  </p>
                  <button className="bg-[#FF31318F] text-black font-bold rounded-full w-[200px] h-[50px] text-[26px] font-semibold mt-[15px]">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
