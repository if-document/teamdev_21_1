"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setErr(error.message);
      return;
    }
    router.push("/"); // 成功時の遷移先を必要に応じて変更
  };

  return (
    <div className="formContainer">
      <main className="items-center flex-1 flex flex-col w-full">
        <form className="formfield" onSubmit={onSubmit}>
          <div className="divide-y pt-24 max-w-[792px] pb-16 px-6">
            <h1 className="text-black text-5xl flex flex-col font-bold items-center">
              Login
              <hr className="mt-6 w-1/3 border-black border-2" />
            </h1>
          </div>

          <div className="pt-5 w-96">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 sm:h-10 w-full rounded-xl bg-[#E3E3E3]/80 border-0 px-4
                         text-base sm:text-lg text-[#5B5B5B] placeholder:text-base sm:placeholder:text-lg
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18A0FB]/40"
              required
            />
          </div>

          <div className="pt-5">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 sm:h-10 w-full rounded-xl bg-[#E3E3E3]/80 border-0 px-4
                         text-base sm:text-lg text-[#5B5B5B] placeholder:text-base sm:placeholder:text-lg
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18A0FB]/40"
              required
            />
          </div>

          <div className="flex flex-col items-center gap-3 pt-6">
            <Button
              type="submit"
              disabled={loading}
              className="submit h-14 w-48 rounded-full bg-[#18A0FB] text-white text-lg"
            >
              {loading ? "Signing in..." : "Login"}
            </Button>

            {err && <p className="text-sm text-red-600">{err}</p>}

            {/* サインアップページが無ければこの行は外してOK */}
            {/* <p className="text-base sm:text-lg text-black font-semibold">
              Don't have an account ? <Link href="/signup" className="text-[#18A0FB] font-semibold">SignUp</Link>
            </p> */}
          </div>
        </form>
      </main>
    </div>
  );
}
