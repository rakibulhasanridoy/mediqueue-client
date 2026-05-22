
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TutorCard from "@/components/TutorCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@heroui/react";
import { Filter, Calendar, ArrowUpDown, RefreshCw, Layers } from "lucide-react";
import toast from "react-hot-toast";

const TutorsPage = () => {
  const router = useRouter();
   const searchParams = useSearchParams();

  const searchTerm = searchParams.get("searchTerm") || "";
  const startDateGte = searchParams.get("startDateGte") || "";
  const startDateLte = searchParams.get("startDateLte") || "";



  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const loadTutors = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams();
        if (searchTerm) query.append("search", searchTerm);
        if (startDateGte) query.append("startDateGte", startDateGte);
        if (startDateLte) query.append("startDateLte", startDateLte);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors?${query.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch tutors");
        const data = await res.json();
        setTutors(data);
        setVisibleCount(6); // Reset visible count on filter change
      } catch (error) {
        console.error(error);
        toast.error("Could not fetch clinical specialists");
      } finally {
        setLoading(false);
      }
    };
    loadTutors();
  }, [searchTerm, startDateGte, startDateLte]);

    const handleDateChange = (type, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    router.push(`/tutors?${params.toString()}`);
  };

    
    const handleResetFilters = () => {
    router.push("/tutors");
    setSortBy("default");
  };



  const getSortedTutors = () => {
    const list = [...tutors];
    if (sortBy === "price_asc") {
      return list.sort((a, b) => parseFloat(a.price || 0) - parseFloat(b.price || 0));
    }
    if (sortBy === "price_desc") {
      return list.sort((a, b) => parseFloat(b.price || 0) - parseFloat(a.price || 0));
    }
      if (sortBy === "rating") {
      return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    if (sortBy === "experience") {
     


      const getYears = (str) => parseInt(str?.replace(/[^0-9]/g, "")) || 0;
      return list.sort((a, b) => getYears(b.experience) - getYears(a.experience));
    }
    return list;
  };

  const sortedTutors = getSortedTutors();
  const displayedTutors = sortedTutors.slice(0, visibleCount);
  const hasMore = sortedTutors.length > visibleCount;



  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        

        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-500 dark:text-cyan-400 text-xs font-black uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" /> Specialist Directory
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
            Clinical Mentorship Directory
          </h1>
          <p className="text-sm md:text-base font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
            Search, filter, and schedule live clinical rotations, theoretical tutoring, and case study sessions with vetted specialists.
          </p>
        </div>

        {/* Filter Bar Panel */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-md dark:shadow-2xl mb-12 space-y-6">
          
          <div className="flex flex-col xl:flex-row gap-6 items-end">
            
            {/* Search Input Section */}
            <div className="w-full xl:w-2/5 space-y-2">
              <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
                Search Specialist
              </label>
              <SearchBar />
            </div>

            {/* Date Inputs */}
            <div className="w-full xl:w-2/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
                  Registration Start Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="date"
                    value={startDateGte}
                    onChange={(e) => handleDateChange("startDateGte", e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
                  Registration End Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="date"
                    value={startDateLte}
                    onChange={(e) => handleDateChange("startDateLte", e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Sorting Dropdown */}
            <div className="w-full sm:w-1/2 xl:w-1/5 space-y-2">
              <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
                Sort Results
              </label>
              <div className="relative">
                <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 z-10" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-semibold transition-all appearance-none cursor-pointer"
                >
                  <option value="default">Default Match</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Rating (Highest First)</option>
                  <option value="experience">Experience (Highest First)</option>
                </select>
              </div>
            </div>

          </div>

          {(searchTerm || startDateGte || startDateLte || sortBy !== "default") && (
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-400">
                <span>Active Filters:</span>
                {searchTerm && (
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-500">
                    Search: &quot;{searchTerm}&quot;
                  </span>
                )}
                {startDateGte && (
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-500">
                    From: {startDateGte}
                  </span>
                )}
                {startDateLte && (
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-500">
                    To: {startDateLte}
                  </span>
                )}
                {sortBy !== "default" && (
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-500 text-capitalize">
                    Sort: {sortBy.replace("_", " ")}
                  </span>
                )}
              </div>
              <Button
                size="sm"
                color="danger"
                variant="flat"
                className="font-extrabold flex items-center gap-1.5"
                onClick={handleResetFilters}
              >
                <RefreshCw className="w-3.5 h-3.5" /> Clear Filters
              </Button>
            </div>
          )}

        </div>

        {/* Directory Listings Grid */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-32 gap-4">
            <div className="w-16 h-16 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin" />
            <p className="text-sm font-bold text-slate-400">Filtering Clinical Databases...</p>
          </div>
        ) : displayedTutors.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#111827]/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-10 max-w-lg mx-auto">
            <Filter className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-200 mb-1">
              No Matches Found
            </h3>
            <p className="text-xs font-semibold text-slate-400 leading-relaxed mb-6">
              We couldn&apos;t find any specialist matching your criteria. Try widening your date range or adjusting the search query.
            </p>
            <Button
              className="font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md"
              onClick={handleResetFilters}
            >
              Reset Search Directory
            </Button>
          </div>
        ) : (
          <div className="space-y-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedTutors.map((tutor) => (
                <TutorCard key={tutor._id} course={tutor} />
              ))}
            </div>

            {/* Load More Trigger */}
            {hasMore && (
              <div className="flex justify-center pt-4">
                <Button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="font-extrabold text-slate-800 dark:text-white bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 px-8 py-6 rounded-2xl shadow-md transition-all active:scale-[0.98]"
                >
                  Load More Specialists ({sortedTutors.length - visibleCount} Remaining)
                </Button>
                </div>
            )}
           </div>
        )}

        </div>
    </div>
  );
};

export default TutorsPage;