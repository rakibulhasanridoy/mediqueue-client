"use client";

import { useState } from "react";
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import { User, Mail, Lock, Image as ImageIcon, Check, X, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "@/components/GoogleLoginButton";


export default function Register() {
   const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
   const hasLowercase = /[a-z]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase;

  const handleRegister = async (e) => {
    e.preventDefault();
     const formData = new FormData(e.currentTarget);
    const registerData = Object.fromEntries(formData.entries());

    if (!registerData.name.trim()) {
      toast.error("Please enter your name");
        return;
    }
    if (!registerData.email.trim()) {
      toast.error("Please enter your email");
       return;
    }
    if (!isPasswordValid) {
      toast.error("Please ensure your password meets all safety criteria");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        name: registerData.name,
          email: registerData.email,
        password: registerData.password,
      };
      if (registerData.image && registerData.image.trim()) {
        payload.image = registerData.image;
      }
      const { data, error } = await signUp.email(payload);
      if (error) {
        toast.error(error.message || "Registration failed. Try another email.");
        return;
      }
      toast.success("Successfully registered your account!");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 py-16 flex items-center justify-center transition-colors duration-200">
      <div className="w-full max-w-lg px-4 sm:px-6">
        
        {/* Main Card */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 md:p-10 shadow-2xl space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Create Your Account
            </h1>
            <p className="text-sm font-semibold text-slate-400">
              Join MediQueue to manage specialist schedules or book appointments.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">           
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-450 dark:text-slate-500" />
                <input
                 type="text"
                  name="name"
                  required
              placeholder="e.g., Jane Doe"
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-450 dark:text-slate-500" />
                <input
                  type="email"
                  name="email"
                  required
                placeholder="e.g., jane@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all"
                />
              </div>
            </div>
          
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Profile Image URL (Optional)
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-450 dark:text-slate-500" />
                <input
                  type="url"
                  name="image"
                  placeholder="e.g., https://images.unsplash.com/photo-..."
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all"
                />
              </div>
            </div>
            {/* Password input */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-450 dark:text-slate-500" />
                <input
                  type="password"
                name="password"
                  required
                  value={password}
                onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create safe password"
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all"
                />
             </div>
              </div>

            <div className="p-4 bg-slate-50 dark:bg-[#1A2332]/40 border dark:border-slate-800/80 rounded-2xl space-y-2">
              <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase block mb-1">
                Password Requirements
              </span>
              
              <div className="flex items-center gap-2 text-xs font-bold">
                {hasMinLength ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <X className="w-4 h-4 text-red-500" />
                )}
                <span className={hasMinLength ? "text-emerald-500" : "text-slate-450 dark:text-slate-400"}>
                  Minimum 6 characters
                </span>
              </div>



              <div className="flex items-center gap-2 text-xs font-bold">
                {hasUppercase ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <X className="w-4 h-4 text-red-500" />
                )}
                <span className={hasUppercase ? "text-emerald-500" : "text-slate-450 dark:text-slate-400"}>
                  At least one uppercase letter (A-Z)
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold">
                {hasLowercase ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <X className="w-4 h-4 text-red-500" />
                )}
                <span className={hasLowercase ? "text-emerald-500" : "text-slate-450 dark:text-slate-400"}>
                  At least one lowercase letter (a-z)
                </span>
              </div>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={loading}
              className={`w-full font-black text-white py-6 rounded-xl shadow-xl transition-all duration-300 ${
                isPasswordValid && !loading
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 shadow-cyan-500/10 active:scale-[0.98]"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none"
              }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

          </form>

          {/* Social Sign In Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">or</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>




          <GoogleLoginButton />

          <p className="text-xs font-bold text-center text-slate-450 dark:text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-500 hover:underline">
              Log in instead
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}
