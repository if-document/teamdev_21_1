"use client";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
  integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
  crossOrigin="anonymous"
  referrerPolicy="no-referrer"
/>;

export default function Login() {
  return (
    <div className="formContainer">
      <header className="bg-stone-300 w-full p-5 mr-5 text-right">
        <div className="px-6">
          <Link href="/login">
            <Button
              className="h-12 px-8 rounded-full border border-black
                         bg-[#D9D9D9] text-black text-lg font-bold
                         hover:bg-[#383838] hover:text-white "
            >
              Login
            </Button>
          </Link>
          <Link href="/signUp">
            <Button
              className="h-12 px-8 rounded-full border border-black
                         bg-[#1f1c1c] text-white text-lg font-bold
                         hover:bg-[#686262] hover:text-white
                         "
            >
              sign Up
            </Button>
          </Link>
        </div>
        <div>
          <link href="/burger"></link>
          <i className="fa-solid fa-bars"></i>
        </div>
      </header>

      <main className="items-center flex-1 flex  flex-col ">
        <form className="formfield  ">
          <div className="divide-y pt-24 ">
            <h1 className="text-black text-2xl flex  flex-col font-bold items-center">
              sign in
              <hr className="  w-11 border-black border-2 flex  flex-col  items-center" />
            </h1>
          </div>
          <div className="pt-5 ">
            <label htmlFor="email ">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              id="email"
              className=" flex flex-col items-center  border-2 gap-6 md:flex-row  w-full bg-stone-300"
            />
          </div>
          <div className="pt-5">
            <label htmlFor="password">password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              id="password"
              className=" flex flex-col items-center  border-2  gap-6  md:flex-row w-full bg-stone-300"
            />
          </div>
          <div className="flex flex-col items-center gap-4 pt-6">
            <Button className="submit h-14 w-48 rounded-full bg-[#18A0FB] text-white text-lg ">
              Login
            </Button>
            <p className="text-base sm:text-lg text-black font-semibold">
              Don't have an account ?
              <Link href="/login" className="text-[#18A0FB] font-semibold">
                {" "}
                signUp
              </Link>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
