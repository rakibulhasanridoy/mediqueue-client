"use client";

import { useState, useEffect } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button, Input, Select, SelectItem, Textarea, Card, CardContent } from "@heroui/react";
import { PlusCircle, User, Award, DollarSign, Calendar, MapPin, Globe, Image as ImageIcon, BookOpen, Clock, FileText, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AddTutorPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
     price: "",
    totalSlot: "5",
    startDate: "",
    availableDaysSlot: "",
    institution: "",
    experience: "",
    location: "",
     teachingMode: "Online",
    thumbnail: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please log in to add a tutor profile");
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 dark:bg-[#0B0F19]">
          <div className="w-16 h-16 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin mb-4" />
        <p className="text-sm font-bold text-slate-400">Verifying Credentials...</p>
      </div>
    );
  }



  if (!session?.user) {
     return null; 
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, teachingMode: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return toast.error("Please enter the specialist name");
    if (!formData.category.trim()) return toast.error("Please enter a medical category (e.g. Cardiology)");
     if (!formData.price || parseFloat(formData.price) <= 0) return toast.error("Please enter a valid price rate");
    if (parseInt(formData.totalSlot) < 0) return toast.error("Available slots cannot be negative");
    if (!formData.startDate) return toast.error("Please select a session start/registration date");
    if (!formData.institution.trim()) return toast.error("Please specify associated clinical/academic institution");
     if (!formData.experience.trim()) return toast.error("Please enter years of clinical experience");
    if (!formData.description.trim() || formData.description.length < 50) {
      return toast.error("Please provide a description of at least 50 characters outlining clinical expertise");
    }


    try {
      setSubmitting(true);
       const { data: jwtData } = await authClient.token();
      const token = jwtData?.token;
      if (!token) {
        toast.error("Authentication expired. Please log in again.");
        return;
      }

        const payload = {
        ...formData,
        instructor: formData.title,
        totalSlot: parseInt(formData.totalSlot) || 0,
      };



      const res = await fetch(`${/api/backend}/tutors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });


      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create tutor profile");
      }
      toast.success("Specialist profile successfully created!");
      router.push("/my-tutors");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An error occurred while creating profile");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 py-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Title Block */}
        <div className="mb-10 text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Register Specialist Tutor
          </h1>
          <p className="text-sm font-semibold text-slate-400">
            Publish a new medical specialist, clinical instructor, or academic mentor profile under your account.
          </p>
        </div>

        {/* Form Card */}
        <Card className="border border-slate-200/60 dark:border-slate-800/80 dark:bg-[#111827] shadow-xl rounded-3xl overflow-hidden">
          <CardContent className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Specialist Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Dr. Julian Thorne"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Medical Category/Specialty <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="category"
                       required
                      value={formData.category}
                      onChange={handleChange}
                       placeholder="e.g., Anatomy, Cardiology, Oncology"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all"
                    />
                  </div>
                </div>
              </div>



              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Session Rate ($ / Hour) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                       name="price"
                      required
                      min="1"
                      value={formData.price}
                      onChange={handleChange}
                        placeholder="e.g., 150"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all"
                    />
                  </div>
                </div>



                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Available Slots Capacity <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                       name="totalSlot"
                      required
                      min="0"
                       value={formData.totalSlot}
                      onChange={handleChange}
                        placeholder="e.g., 5"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all"
                    />
                  </div>
                </div>
              </div>



              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Session Start/Registration Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                       name="startDate"
                      required
                      value={formData.startDate}
                       onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all"
                    />
                  </div>
                </div>



                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Weekly Schedule Slots (Days & Time) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="availableDaysSlot"
                      required
                      value={formData.availableDaysSlot}
                      onChange={handleChange}
                      placeholder="e.g., Mon - Wed 8:00 AM - 11:00 AM"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all"
                    />
                  </div>
                </div>
              </div>



              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Clinical/Academic Institution <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="institution"
                      required
                      value={formData.institution}
                      onChange={handleChange}
                      placeholder="e.g., Johns Hopkins Medicine"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Years of Clinical Experience <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="experience"
                        required
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="e.g., 12+ Years Exp. or 10 Years Experience"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all"
                    />
                  </div>
                </div>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Physical/Clinic Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Baltimore, MD"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all"
                    />
                   </div>
                 </div>

                 <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Teaching/Mentorship Mode <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                    <select
                      name="teachingMode"
                      value={formData.teachingMode}
                      onChange={(e) => handleSelectChange(e.target.value)}
                      className="w-full pl-10 pr-8 py-2.5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all appearance-none cursor-pointer"
                    >
                      <option value="Online">Online Sessions Only</option>
                      <option value="Offline">In-Person/Offline Clinic Only</option>
                      <option value="Both">Both (Hybrid Mentorship)</option>
                    </select>
                   </div>
                </div>
               </div>
 


              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Profile Photo / Thumbnail Image URL
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    placeholder="e.g., https://images.unsplash.com/photo-..."
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all"
                  />
                </div>
              </div>


              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Clinical Overview & Biography <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-bold">
                    {formData.description.length} / 50 characters min
                  </span>
                </div>
                <div className="relative">
                  <FileText className="absolute left-3 top-4 w-4 h-4 text-slate-400" />
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Outline your research specialties, surgical procedures, clinical rounds, case review details, and tutoring approach..."
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all resize-y"
                  />
                </div>
              </div>



              <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                                  <Button
                                    type="button"
                                    variant="flat"
                                    className="font-bold rounded-2xl"
                                    onClick={() => router.push("/my-tutors")}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    type="submit"
                                    isLoading={submitting}
                                    className="font-black text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/15 rounded-2xl"
                                  >
                                    {!submitting && <CheckCircle2 className="w-4 h-4" />}
                                    Create Specialist Profile
                                  </Button>
                                </div>

                    </form>
                  </CardContent>
                </Card>

              </div>
            </div>
          );
        }