"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: "***@***.***",
      password: "example2@example.com",
    });


  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-[792px] pt-24 pb-16 px-6 flex justify-center">
          <Card className="w-full bg-white border-none shadow-none">
            <CardHeader className="text-center">
              <h1 className="text-[40px] font-semibold text-black">Sign Up</h1>
            </CardHeader>

            <CardContent className="w-full max-w-[670px] mx-auto space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-[26px] font-normal text-black"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  className="h-12 sm:h-14 w-full rounded-2xl bg-[#E3E3E3]/80 border-0 px-4
                             text-base sm:text-lg text-[#5B5B5B] placeholder:text-base sm:placeholder:text-lg
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18A0FB]/40"
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-[26px] font-normal text-black"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 sm:h-14 w-full rounded-2xl bg-[#E3E3E3]/80 border-0 px-4
                             text-base sm:text-lg text-[#5B5B5B] placeholder:text-base sm:placeholder:text-lg
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18A0FB]/40"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-[26px] font-normal text-black"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="h-12 sm:h-14 w-full rounded-2xl bg-[#E3E3E3]/80 border-0 px-4
                             text-base sm:text-lg text-[#5B5B5B] placeholder:text-base sm:placeholder:text-lg
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18A0FB]/40"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col items-center gap-4 pt-6">
              <Button
                type="button"
                className="h-14 w-48 rounded-full bg-[#18A0FB] text-white text-lg font-semibold"
                onClick={handleSignup}
              >
                Sign Up
              </Button>

              <p className="text-base sm:text-lg text-black font-semibold">
                Already have an account ?{" "}
                <Link href="/login" className="text-[#18A0FB] font-semibold">
                  Login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
