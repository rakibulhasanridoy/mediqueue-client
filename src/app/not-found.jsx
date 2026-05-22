"use client";

import { Search, Home, ArrowLeft , ShieldCheck} from "lucide-react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const NotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 px-4 py-24 text-center transition-colors duration-200">
      <div className="max-w-md w-full bg-white dark:bg-[#111827] border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 md:p-10 shadow-2xl space-y-6">
        

        <div className="w-24 h-24 bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center justify-center mx-auto text-cyan-500 animate-pulse">
          <Search className="w-12 h-12" />
        </div>
        
        {/* 404 Text */}
        <div className="space-y-2">
          <h1 className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
            404
          </h1>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Page Not Found
          </h2>
          <p className="text-xs font-semibold text-slate-450 dark:text-slate-455 leading-relaxed">
            The medical directory path or dashboard link you requested does not exist or has been relocated to another clinic department.
          </p>
        </div>

        


        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            variant="flat"
            onClick={() => router.back()}
            className="font-bold flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </Button>
          <Link href="/">
          <Button
  className="w-full sm:w-auto font-black text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/15"
>
  <ShieldCheck className="w-4 h-4" /> Back Home
</Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;