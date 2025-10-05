"use client";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <div className="formContainer">
      <main className="items-center flex-1 flex  flex-col w-full">
        <form className="formfield  ">
          <div className=" divide-y pt-24  max-w-[792px]  pb-16 px-6 ">
            <h1 className="text-black text-5xl flex  flex-col font-bold items-center">
              Login
              <hr className=" mt-6 w-1/3 border-black border-2 flex  flex-col  items-center" />
            </h1>
          </div>
          <div className="pt-5 w-96">
            <label htmlFor="email ">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              id="email"
              className=" h12 sm:h-10 w-full rounded-xl  bg-[#E3E3E3]/80 border-0 px-4
                             text-base sm:text-lg text-[#5B5B5B] placeholder:text-base sm:placeholder:text-lg
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18A0FB]/40"
            />
          </div>
          <div className="pt-5 ">
            <label htmlFor="password">password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              id="password"
              className=" h-12 sm:h-1o w-full rounded-xl bg-[#E3E3E3]/80 border-0 px-4
                             text-base sm:text-lg text-[#5B5B5B] placeholder:text-base sm:placeholder:text-lg
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18A0FB]/40"
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
                SignUp
              </Link>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
