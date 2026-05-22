"use client";

import { useEffect, useState } from "react";
import TutorCard from "./TutorCard";
import { fetchFeaturedTutors } from "@/lib/tutors/data";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const FeaturedTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTutors = async () => {
      try {
        setLoading(true);
        const data = await fetchFeaturedTutors();
        setTutors(data);
      } catch (error) {
        console.error("Failed to fetch featured tutors:", error);
      } finally {
        setLoading(false);
      }
    };
    getTutors();
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-[#0B0F19] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-500 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Elite Faculty
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Top Performing Specialists
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl font-medium">
              Book live, interactive clinical tutoring sessions with industry-leading practitioners and researchers.
            </p>
          </div>
          <Link
            href="/tutors"
            className="inline-flex items-center gap-1 text-sm font-extrabold text-cyan-500 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300 group"
          >
            View Full Directory{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Content & Spinner */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin" />
            <p className="text-sm font-bold text-slate-400">Loading Elite Faculty...</p>
          </div>
        ) : tutors.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-10">
            <p className="text-slate-500 dark:text-slate-400 font-bold">No tutors featured at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors.map((tutor) => (
              <TutorCard key={tutor._id} course={tutor} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedTutors;