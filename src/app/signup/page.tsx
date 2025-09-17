"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Poppins } from "next/font/google"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] })

// 入力欄の共通クラス（フォント大/中央寄せ/フォーカスリング）
const inputCls =
  "h-12 sm:h-14 w-full rounded-lg bg-[#E3E3E3]/80 border-0 px-4 \
   text-base sm:text-lg text-[#5B5B5B] placeholder:text-base sm:placeholder:text-lg \
   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18A0FB]/40";

export default function SignupPage() {
  return (
    <div className={`${poppins.className} min-h-screen bg-white flex flex-col`}>
      {/* Navbar */}
      <nav className="w-full bg-[#D9D9D9]">
        <div className="mx-auto max-w-[1200px] h-20 flex items-center justify-end gap-3 px-6">
          <Link href="/login">
            <Button
              className="h-12 px-8 rounded-full border border-black
                         bg-[#D9D9D9] text-black text-lg font-bold
                         hover:bg-[#383838] hover:text-white"
            >
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              className="h-12 px-8 rounded-full border border-black
                         bg-[#D9D9D9] text-black text-lg font-bold
                         hover:bg-[#383838] hover:text-white"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-[792px] pt-24 pb-16 px-6 flex justify-center">
          <Card className="w-full bg-white border-none shadow-none">
          <CardHeader className="text-center mt-16">
            <h1 className="text-[40px] font-semibold text-black">Sign Up</h1>
          </CardHeader>

            <CardContent className="w-full max-w-[670px] mx-auto space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label className="text-[26px] font-normal text-black">Name</Label>
                <Input placeholder="Enter your name"   className="h-12 sm:h-14 w-full rounded-2xl bg-[#E3E3E3]/80 border-0 px-4
             text-base sm:text-lg text-[#5B5B5B] placeholder:text-base sm:placeholder:text-lg
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18A0FB]/40" autoComplete="name" />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-[26px] font-normal text-black">Email</Label>
                <Input type="email" placeholder="Enter your email"   className="h-12 sm:h-14 w-full rounded-2xl bg-[#E3E3E3]/80 border-0 px-4
             text-base sm:text-lg text-[#5B5B5B] placeholder:text-base sm:placeholder:text-lg
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18A0FB]/40" autoComplete="email" />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label className="text-[26px] font-normal text-black">Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                    className="h-12 sm:h-14 w-full rounded-2xl bg-[#E3E3E3]/80 border-0 px-4
             text-base sm:text-lg text-[#5B5B5B] placeholder:text-base sm:placeholder:text-lg
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18A0FB]/40"
                  autoComplete="new-password"
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col items-center gap-4 pt-6">
            <Button className="h-14 w-48 rounded-full bg-[#18A0FB] text-white text-lg font-semibold">
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
  )
}
