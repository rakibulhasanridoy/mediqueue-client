"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import EnrollmentButton from "@/components/EnrollmentButton";
import { Button, Chip, Breadcrumbs, BreadcrumbsItem } from "@heroui/react";
import { 
  GraduationCap, 
  Briefcase, 
  Star, 
  Clock, 
  Globe, 
  MapPin, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Layers, 
  ArrowLeft,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function TutorDetails() {
  const { id } = useParams();
  const router = useRouter();
  
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchTutor = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`);
        if (!res.ok) {
          throw new Error("Tutor profile not found");
        }
        const data = await res.json();
        setTutor(data);
      } catch (error) {
        console.error(error);
        toast.error("Specialist profile not found or server error");
      } finally {
        setLoading(false);
      }
    };
    fetchTutor();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200">
        <div className="w-16 h-16 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin mb-4" />
        <p className="text-sm font-bold text-slate-400">Retrieving Clinical Credentials...</p>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 dark:bg-[#0B0F19] text-slate-850 dark:text-slate-100 p-6 text-center">
        <div className="max-w-md p-8 bg-white dark:bg-[#111827] border dark:border-slate-800 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-black text-red-500 mb-2">Specialist Not Found</h2>
          <p className="text-sm font-semibold text-slate-400 mb-6">
            The specialist profile you are trying to view does not exist or may have been deleted.
          </p>
          <Button
            className="font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600"
            onClick={() => router.push("/tutors")}
          >
            Back to Directory
          </Button>
        </div>
      </div>
    );
  }

  const isOnline = tutor.teachingMode === "Online" || tutor.teachingMode === "Both";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 py-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumbs & Back button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <Breadcrumbs className="text-sm font-semibold">
            <BreadcrumbsItem href="/">Home</BreadcrumbsItem>
            <BreadcrumbsItem href="/tutors">Tutors</BreadcrumbsItem>
            <BreadcrumbsItem className="text-cyan-500 font-bold max-w-[200px] truncate">
              {tutor.title}
            </BreadcrumbsItem>
          </Breadcrumbs>
          
          <Button
  as={Link}
  href="/tutors"
  variant="flat"
  size="sm"
  className="font-bold flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-850"
>
  <ArrowLeft className="w-4 h-4" />
  Back to Directory
</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 space-y-8">
            
            <div className="bg-white dark:bg-[#111827] border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-md dark:shadow-2xl flex flex-col md:flex-row gap-6 items-start md:items-center">
              

              
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden shrink-0 border-2 border-cyan-500/20 shadow-md">
                <Image
                   src={tutor.thumbnail || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600"}
                   onError={(e) => {
                     e.currentTarget.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600";
                   }}
                  alt={tutor.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Quick Details */}
              <div className="space-y-3 flex-grow w-full">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip
                    size="sm"
                    className="bg-cyan-500/10 text-cyan-500 font-extrabold text-[10px] uppercase tracking-wider"
                  >
                    {tutor.category || "General Medical"}
                  </Chip>
                  <Chip
                    size="sm"
                    variant="flat"
                    className={`${
                      isOnline
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                    } font-bold text-[10px] uppercase`}
                  >
                    {tutor.teachingMode || "Online"}
                  </Chip>
                </div>

                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  {tutor.title}
                </h1>

                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-slate-400" /> {tutor.institution || "Unknown Institution"}
                </p>

                <div className="flex items-center gap-4 pt-1.5">
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span>{(tutor.rating || 5.0).toFixed(1)}</span>
                    <span className="text-slate-400 text-xs font-semibold">({tutor.reviewsCount || 0} reviews)</span>
                  </div>
                  <span className="text-slate-350 dark:text-slate-700">|</span>
                  <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-semibold text-xs">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span>{tutor.experience || "No exp info"}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Biography & Details Tab */}
            <div className="bg-white dark:bg-[#111827] border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-md dark:shadow-2xl space-y-6">
              <div>
                <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white mb-3">
                  Clinical Overview & Specialty
                </h3>
                <p className="text-sm md:text-base font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                  {tutor.description || "No biography provided by the specialist."}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Success Rate</span>
                  <div className="flex items-center gap-1 text-emerald-500 font-black text-lg">
                    <TrendingUp className="w-4 h-4" />
                    <span>{tutor.successRate || "100%"}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Sessions Done</span>
                  <span className="text-slate-900 dark:text-white font-black text-lg">
                    {tutor.sessionsCount || "0"}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Teaching Mode</span>
                  <span className="text-slate-900 dark:text-white font-black text-sm block pt-1">
                    {tutor.teachingMode || "Both"}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Location</span>
                  <div className="flex items-center gap-1 text-slate-650 dark:text-slate-350 font-bold text-xs pt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{tutor.location || "Online"}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Credentials / Syllabus / Methodology Panel */}
            <div className="bg-white dark:bg-[#111827] border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-md dark:shadow-2xl space-y-6">
              <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                Mentorship Methodology & Value
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3 p-4 bg-slate-50 dark:bg-[#1A2332]/40 rounded-2xl border dark:border-slate-800/50">
                  <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-slate-950 dark:text-white">Case-Based Learning</h4>
                    <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                      Analyze diagnostic imaging, clinical charts, and pharmacological interventions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 p-4 bg-slate-50 dark:bg-[#1A2332]/40 rounded-2xl border dark:border-slate-800/50">
                  <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-slate-950 dark:text-white">Interactive Rotations</h4>
                    <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                      Participate in mock boards, clinical trials overview, and medical licensing review drills.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Booking Card panel (Right 1 column) */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="bg-white dark:bg-[#111827] border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-md dark:shadow-2xl space-y-6">
              
              {/* Pricing details */}
              <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800/80 pb-4">
                <span className="text-sm font-black text-slate-400 uppercase tracking-wider">Session Rate</span>
                <div className="flex items-baseline text-slate-900 dark:text-white">
                  <DollarSign className="w-5 h-5 text-cyan-500" />
                  <span className="text-3xl font-black">{tutor.price || "0"}</span>
                  <span className="text-sm text-slate-450 dark:text-slate-450 font-bold ml-1">/ hour</span>
                </div>
              </div>

              {/* Schedule and slot availability info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Available Slot Days</span>
                  <span className="text-slate-900 dark:text-white font-extrabold">{tutor.availableDaysSlot || "TBD"}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Start/Registration Date</span>
                  <span className="text-slate-900 dark:text-white font-extrabold">{tutor.startDate || "TBD"}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Current Slot Capacity</span>
                  <span className={`font-extrabold ${tutor.totalSlot > 0 ? "text-cyan-500" : "text-red-500"}`}>
                    {tutor.totalSlot > 0 ? `${tutor.totalSlot} slots available` : "Fully booked"}
                  </span>
                </div>
              </div>

              {/* Booking CTA button wrapper */}
              <div className="pt-2">
                <EnrollmentButton course={tutor} />
              </div>

              <p className="text-[10px] text-slate-450 dark:text-slate-500 font-bold text-center leading-relaxed">
                Secure slot bookings require an active account. Booking decreases slots dynamically. Cancellations free up slot counts.
              </p>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}