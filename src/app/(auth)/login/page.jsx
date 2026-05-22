"use client";

import { useState } from "react";
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import { Mail, Lock, LogIn, ArrowRight ,ShieldCheck} from "lucide-react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "@/components/GoogleLoginButton";



export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const loginData = Object.fromEntries(formData.entries());

    if (!loginData.email.trim() || !loginData.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await signIn.email({
        email: loginData.email,
        password: loginData.password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Invalid email or password");
        return;
      }
      toast.success("Successfully logged in!");
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during log in");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 py-20 flex items-center justify-center transition-colors duration-200">
      <div className="w-full max-w-md px-4">      
        {/* Login Card */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 md:p-10 shadow-2xl space-y-8">



          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-sm font-semibold text-slate-400">
              Log in to your MediQueue clinical profile.
            </p>
          </div>




          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-450 dark:text-slate-500" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g., mail@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-450 dark:text-slate-500" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Enter password"
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all"
                />
              </div>
            </div>
            {/* Submit button */}
            <Button
              type="submit"
              isLoading={loading}
              className="w-full font-black text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/15"
            >
              {!loading && <LogIn className="w-4 h-4" />}
              Log In
            </Button>
          </form>
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">or</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
         </div>

          <GoogleLoginButton />

        
         <p className="text-xs font-bold text-center text-slate-450 dark:text-slate-400">
            New to MediQueue?{" "}
            <Link href="/register" className="text-cyan-500 hover:underline">
            Create an account
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}