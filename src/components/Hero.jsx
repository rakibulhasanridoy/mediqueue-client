"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, GraduationCap, ShieldCheck, HeartPulse } from "lucide-react";
import { Button } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    tag: "GENOMIC FRONTIERS",
    title: "Master Complex Clinical Diagnostics",
    description: "Accelerate your residency with 1-on-1 sessions from world-leading specialists in neurosurgery and cardiovascular medicine.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
    color: "from-cyan-500/20 to-blue-500/20",
    icon: HeartPulse
  },
  {
    tag: "ELITE MENTORSHIP",
    title: "Surgical Navigation & Anatomy",
    description: "Gain hands-on clinical experience, case analysis reviews, and 3D anatomical modeling tutorials with active practitioners.",
    image: "https://i.ibb.co.com/TB7d5TPr/pexels-photo-8199604.jpg",
    color: "from-purple-500/20 to-pink-500/20",
    icon: GraduationCap
  },
  {
    tag: "BOARD PREPARATION",
    title: "Excel in Your Medical Career",
    description: "Prepare thoroughly for board exams and clinical trials with personalized tutoring tracks built around real-world medical cases.",
    image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34",
    color: "from-emerald-500/20 to-teal-500/20",
    icon: ShieldCheck
  }
];

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative overflow-hidden bg-slate-100 dark:bg-[#0B0F19] transition-colors duration-200 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Carousel Block */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-800/50 bg-[#1A2332] h-[500px] md:h-[600px] group">
          
          {/* Image Slides */}
          {slides.map((slide, index) => {
            const Icon = slide.icon;
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === activeSlide ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    className="object-cover opacity-30 dark:opacity-20 transition-transform duration-10000 ease-linear scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} mix-blend-overlay`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/70 to-[#0F172A]/20" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 text-white max-w-3xl space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-bold text-xs tracking-wider uppercase w-fit animate-pulse">
                    <Icon className="w-4 h-4" />
                    {slide.tag}
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                    {slide.title}
                  </h1>

                  <p className="text-base md:text-lg text-slate-300 leading-relaxed font-medium">
                    {slide.description}
                  </p>

                  <div className="pt-4 flex flex-wrap gap-4">
                    <Link href="/tutors">
                      <Button
                        size="lg"
                        className="font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 shadow-lg shadow-cyan-500/20"
                        endContent={<ArrowRight className="w-5 h-5" />}
                      >
                        Explore Tutors
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button
                        size="lg"
                        variant="bordered"
                        className="font-bold border-white/20 hover:border-white/50 text-white backdrop-blur-sm bg-white/5"
                      >
                        Join as Student
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Slider Controllers */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0F172A]/60 hover:bg-[#0F172A]/90 border border-white/10 text-white backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 hidden md:block"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0F172A]/60 hover:bg-[#0F172A]/90 border border-white/10 text-white backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 hidden md:block"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slider Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2.5 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  index === activeSlide ? "bg-cyan-400 scale-125" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;