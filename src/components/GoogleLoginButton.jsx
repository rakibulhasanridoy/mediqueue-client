"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error(error);
      toast.error("Google authentication failed");
    }
  };

    return (
        <div className="space-y-4">
            <Button
                variant="bordered"
                onClick={handleGoogleLogin}
                className="w-full h-12 font-bold rounded-2xl border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 transition-colors gap-3"
            >
                <Image
                    width={20}
                    height={20}
                    src="https://www.google.com/favicon.ico"
                    className="w-5 h-5"
                    alt="Google"
                />
                Sign in with Google
            </Button>
        </div>
    );
};

export default GoogleLoginButton;