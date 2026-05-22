import { Button, Chip } from "@heroui/react";
import { GraduationCap, Briefcase, Star, Clock, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TutorCard = ({ course }) => {
  const {
    _id,
    title,
    thumbnail,
    category,
    price,
    availableDaysSlot,
    experience,
    institution,
    teachingMode,
    rating = 4.9,
    reviewsCount = 120,
    totalSlot = 5,
  } = course;

  // Render Status Badge
  const isOnline = teachingMode === "Online" || teachingMode === "Both";

  return (
    <div className="flex flex-col bg-white dark:bg-[#111827] border border-slate-200/60 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-md dark:shadow-2xl hover:shadow-xl dark:hover:shadow-cyan-950/20 hover:-translate-y-1 transition-all duration-300 group">
      
      {/* Tutor Profile Image */}
      <div className="relative h-64 w-full bg-slate-900 overflow-hidden">
        <Image
          src={thumbnail || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600"}
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600";
          }}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Online/Offline Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <Chip
            size="sm"
            variant="flat"
            className={`${
              isOnline
                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30"
                : "bg-slate-500/10 text-slate-400 border border-slate-500/30"
            } font-bold tracking-wider text-[10px] uppercase shadow-md backdrop-blur-md`}
            startcontent={
              <span className={`w-1.5 h-1.5 rounded-full mr-1 ${isOnline ? "bg-emerald-500" : "bg-slate-400"}`} />
            }
          >
            {isOnline ? "Online" : "Offline"}
          </Chip>
        </div>

        {/* Teaching Mode Badge */}
        <div className="absolute bottom-4 left-4 z-10">
          <Chip
            size="sm"
            className="bg-slate-900/80 text-white dark:bg-[#1A2332]/90 font-bold text-[10px] uppercase shadow-md backdrop-blur-md border border-slate-700/50"
            startcontent={<Globe className="w-3.5 h-3.5 mr-1 text-cyan-400" />}
          >
            {teachingMode || "Online"}
          </Chip>
        </div>
      </div>

      {/* Tutor Info Content */}
      <div className="flex-grow p-6 flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          {/* Category/Subject and Price */}
          <div className="flex justify-between items-center">
            <span className="text-xs font-black tracking-widest text-cyan-500 dark:text-cyan-400 uppercase">
              {category || "Medical"}
            </span>
            <div className="flex items-baseline">
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">${price || "0"}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-1 font-bold">/ hr</span>
            </div>
          </div>

          {/* Tutor Name */}
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors duration-200">
            {title}
          </h3>

          {/* Meta Info List */}
          <ul className="space-y-2.5 pt-1 text-slate-600 dark:text-slate-400 text-xs font-semibold">
            <li className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-cyan-500/80 shrink-0" />
              <span>{experience || "No experience details"}</span>
            </li>
            <li className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-cyan-500/80 shrink-0" />
              <span>{institution || "No institution details"}</span>
            </li>
            {availableDaysSlot && (
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-500/80 shrink-0" />
                <span>{availableDaysSlot}</span>
              </li>
            )}
          </ul>
        </div>

        {/* Rating and Booking Button */}
        <div className="flex flex-col space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center text-xs font-semibold">
            {/* Rating */}
            <div className="flex items-center gap-1.5 text-amber-500">
              <Star className="w-4 h-4 fill-amber-500" />
              <span className="text-slate-900 dark:text-slate-100 font-extrabold">{rating.toFixed(1)}</span>
              <span className="text-slate-400">({reviewsCount} Reviews)</span>
            </div>
            
            {/* Slots Counter */}
            <div className={`text-[11px] font-bold ${totalSlot > 0 ? "text-slate-400" : "text-red-500"}`}>
              {totalSlot > 0 ? `${totalSlot} Slots Left` : "Fully Booked"}
            </div>
          </div>

          <Link href={`/tutors/${_id}`} className="w-full block">
            <Button
              className="w-full font-bold text-slate-800 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/60 dark:hover:bg-slate-800 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-700/60 transition-all duration-300"
              size="md"
            >
              Book Session
            </Button>
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default TutorCard;