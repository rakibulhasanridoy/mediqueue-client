"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


import { 
  Button, 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell,
  Card,
  Chip,
  Avatar
} from "@heroui/react";

import { 
  LayoutDashboard, 
  Calendar, 
  User, 
  Phone, 
   Mail, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  ChevronRight,
  TrendingUp,
  Info
} from "lucide-react";
import CancelEnrollButton from "@/components/CancelEnrollButton";
import Link from "next/link";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFetchingRef = useRef(false); 

  
  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please log in to view your booked sessions");
      router.push("/login");
    }
  }, [session, isPending, router]);

  
  
  const loadBookings = useCallback(async () => {
                           
    
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      setLoading(true);

      

      const tokenResult = await authClient.token();
      const token = tokenResult?.data?.token;

      if (!token) {
        toast.error("Authentication session expired. Please log in again.");
        router.push("/login");
        return;
      }

      const userId = session?.user?.id || "me";
      const res = await fetch(`${/api/backend}/enrollments/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

        if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || `Server error: ${res.status}`);
      }

      const data = await res.json();
      setBookings(data || []);
    } catch (error) {
      console.error("loadBookings error:", error);
      toast.error(error.message || "Could not fetch session bookings");
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [session, router]);

  useEffect(() => {
    if (session?.user) {
      loadBookings();
    }
  }, [session?.user?.id, loadBookings]);

      if (isPending || (loading && !bookings.length)) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 dark:bg-[#0B0F19]">
        <div className="w-16 h-16 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin mb-4" />
        <p className="text-sm font-bold text-slate-400">Loading Student Dashboard...</p>
      </div>
    );
  }

       if (!session?.user) return null;

  // Handle local state update after successful cancellation
  const handleCancelSuccess = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b._id === bookingId ? { ...b, status: "cancelled" } : b))
    );
  };

  const totalSessions = bookings.length;
  const activeSessions = bookings.filter((b) => b.status !== "cancelled").length;
  const cancelledSessions = bookings.filter((b) => b.status === "cancelled").length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white dark:bg-[#111827] border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-md dark:shadow-2xl mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
          <Avatar 
  size="lg" 
  src={session.user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150"} 
  color="primary"
  className="w-16 h-16 shrink-0 ring-2 ring-cyan-500 ring-offset-2"
/>
            <div className="space-y-1">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Welcome back, {session.user.name || "Student"}
              </h1>
              <p className="text-xs font-semibold text-slate-450 dark:text-slate-400 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> {session.user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-[#1A2332]/40 border dark:border-slate-800 rounded-2xl">
            <TrendingUp className="w-4 h-4 text-cyan-500" />
            <span className="text-xs font-bold text-slate-450 dark:text-slate-400">Account status:</span>
            <Chip size="sm" color="success" className="font-extrabold text-[10px] text-white">Active Student</Chip>
          </div>
        </div>

        {/* Stats Grid cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <Card className="border border-slate-200/60 dark:border-slate-800/80 dark:bg-[#111827] shadow-lg rounded-2xl">
            <Card.Content className="p-6 flex flex-row items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Bookings</p>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{totalSessions}</h4>
              </div>
            </Card.Content>
          </Card>

          <Card className="border border-slate-200/60 dark:border-slate-800/80 dark:bg-[#111827] shadow-lg rounded-2xl">
            <Card.Content className="p-6 flex flex-row items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Sessions</p>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{activeSessions}</h4>
              </div>
            </Card.Content>
          </Card>

          <Card className="border border-slate-200/60 dark:border-slate-800/80 dark:bg-[#111827] shadow-lg rounded-2xl">
            <Card.Content className="p-6 flex flex-row items-center gap-4">
              <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cancelled Sessions</p>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{cancelledSessions}</h4>
              </div>
            </Card.Content>
          </Card>
        </div>

        {/* Sessions list Table */}
        <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-500" /> Booked Tutoring Sessions
        </h2>

        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#111827]/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-10 max-w-lg mx-auto space-y-6">
            <Calendar className="w-12 h-12 text-slate-350 dark:text-slate-650 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">
                No Booked Sessions Found
              </h3>
              <p className="text-xs font-semibold text-slatnpme-400 leading-relaxed">
                You havent scheduled any theoretical lectures or clinical consultation sessions with our specialists yet.
              </p>
            </div>
            <Link href="/tutors">
              <Button className="font-extrabold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md">
                Browse Directory & Book Now
              </Button>
            </Link>
               </div>
        ) : (
          <div className="bg-white dark:bg-[#111827] border border-slate-200/60 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <Table.Content 
                aria-label="Student Bookings Table" 
                className="dark:bg-[#111827]"
              >
                <TableHeader>
                  <TableColumn isRowHeader className="font-black text-xs uppercase tracking-wider py-4 pl-6">Specialist</TableColumn>
                  <TableColumn className="font-black text-xs uppercase tracking-wider py-4">Student Details</TableColumn>
                   <TableColumn className="font-black text-xs uppercase tracking-wider py-4">Contact Phone</TableColumn>
                  <TableColumn className="font-black text-xs uppercase tracking-wider py-4">Book Date</TableColumn>
                   <TableColumn className="font-black text-xs uppercase tracking-wider py-4">Status</TableColumn>
                  <TableColumn className="font-black text-xs uppercase tracking-wider py-4 text-center pr-6">Management</TableColumn>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => {
                    const isCancelled = booking.status === "cancelled";
                    return (
                      <TableRow key={booking._id} className="border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                        <TableCell className="py-4 pl-6">
                          <Link href={`/tutors/${booking.tutorId}`} className="group flex items-center gap-2 hover:opacity-90">
                            <span className="font-black text-sm text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                              {booking.tutorName}
                            </span>
                            <ChevronRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </Link>
                        </TableCell>
                        <TableCell className="py-4">
                          <span className="font-bold text-xs text-slate-500 dark:text-slate-400">
                            {booking.studentName}
                          </span>
                        </TableCell>
                        <TableCell className="py-4">
                          <span className="font-bold text-xs text-slate-400 flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            {booking.studentPhone}
                          </span>
                        </TableCell>
                        <TableCell className="py-4 font-bold text-xs text-slate-400">
                          {new Date(booking.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </TableCell>
                        <TableCell className="py-4">
                          <Chip
                            size="sm"
                            className={`font-black text-[10px] uppercase ${
                              isCancelled
                                ? "bg-red-500/10 text-red-500"
                                : "bg-emerald-500/10 text-emerald-500"
                            }`}
                          >
                            {booking.status}
                          </Chip>
                        </TableCell>
                        <TableCell className="py-4 text-center pr-6">
                          {isCancelled ? (
                            <span className="text-xs font-bold text-slate-400 italic">Cancelled</span>
                          ) : (
                            <div className="flex items-center justify-center">
                              <CancelEnrollButton
                                bookingId={booking._id}
                                onCancelSuccess={handleCancelSuccess}
                              />
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table.Content>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}