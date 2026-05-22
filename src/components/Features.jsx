import { GraduationCap, Award, ShieldAlert, BrainCircuit, Heart, Stethoscope } from "lucide-react";
import Link from 'next/link';
const Features = () => {
  const stats = [
    { value: "8,249+", label: "Successful Bookings", desc: "Premium clinical and academic sessions conducted." },
    { value: "412+", label: "Expert Tutors", desc: "Top faculty from elite medical institutions." },
    { value: "98.2%", label: "Satisfaction Rate", desc: "Proven track record of residency exam success." }
  ];

  const tracks = [
    { name: "Surgical Anatomy", icon: Stethoscope, color: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
    { name: "Clinical Oncology", icon: Heart, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
    { name: "Microsurgical Neurology", icon: BrainCircuit, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { name: "Emergency Pediatrics", icon: GraduationCap, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { name: "Molecular Virology", icon: ShieldAlert, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    { name: "Advanced Radiology", icon: Award, color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/20" }
  ];

  return (
    <div className="bg-slate-50 dark:bg-[#0B0F19]/50 transition-colors duration-200 divide-y divide-slate-200 dark:divide-slate-800">
      
      {/* Extra Section 1: Academic Statistics */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/60 dark:border-slate-800/80 shadow-md dark:shadow-2xl hover:border-cyan-500/40 dark:hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-center items-center text-center group"
            >
              <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </span>
              <h4 className="text-base font-extrabold text-slate-800 dark:text-slate-200 mt-3">
                {stat.label}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Extra Section 2: Specialized Learning Tracks */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-black tracking-widest text-cyan-500 dark:text-cyan-400 uppercase">
            Curriculum Departments
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            Specialized Learning Tracks
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto font-semibold">
            Broaden your medical horizons with our hand-picked interactive learning streams.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {tracks.map((track, i) => {
            const Icon = track.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-6 bg-white dark:bg-[#111827] border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-sm dark:shadow-xl hover:shadow-lg dark:hover:shadow-cyan-950/10 hover:border-cyan-500/40 dark:hover:border-cyan-500/30 transition-all duration-300 text-center"
              >
                <div className={`p-4 rounded-xl ${track.bg} ${track.color} border ${track.border} mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                  {track.name}
                </h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-8 md:p-12 shadow-2xl border border-slate-800">
          {/* Subtle glowing sphere background */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                Ready to Elevate Your <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Medical Career?</span>
              </h2>
              <p className="text-sm text-slate-400 font-medium">
                Join thousands of residency candidates and clinical specialists who have transformed their board scores and operational confidence.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center shrink-0">
              <Link href="/register">
                <button className="px-6 py-3 font-extrabold text-sm text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-lg shadow-cyan-400/10 transition-all">
                  Create Profile
                </button>
              </Link>
              <Link href="/tutors">
                <button className="px-6 py-3 font-extrabold text-sm text-white bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-xl transition-all">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Features;