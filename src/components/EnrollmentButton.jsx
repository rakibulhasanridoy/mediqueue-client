"use client";

import { useState } from "react";
import { Button, Modal, ModalContainer, ModalDialog, ModalHeader, ModalBody, ModalFooter, Input } from "@heroui/react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ShieldCheck, Phone, User, Mail, Tag, Key, Info } from "lucide-react";
import toast from "react-hot-toast";

export default function EnrollmentButton({ course }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [booking, setBooking] = useState(false);

  const {
    _id,
    title,
    price,
    totalSlot,
    startDate,
  } = course;

  // Validation Checks
  const isFullyBooked = totalSlot <= 0;
  
  const currentDate = new Date().toISOString().split("T")[0];
  const isDateRestricted = currentDate < startDate;

  const handleOpen = () => {
    // If not logged in, redirect to login page with toast
    if (!session?.user) {
      toast.error("Please log in to book a tutoring session");
      router.push("/login");
      return;
    }
    
    // Check total slots
    if (isFullyBooked) {
      toast.error("No available slots left. This session is fully booked.");
      return;
    }

    // Check date restriction
    if (isDateRestricted) {
      toast.error("Booking is not available yet for this tutor.");
      return;
    }

    setIsOpen(true);
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!phone.trim()) {
      toast.error("Please enter a valid phone number");
      return;
    }

    try {
      setBooking(true);
      const { data: jwtData } = await authClient.token();
      const token = jwtData?.token;
      if (!token) {
        toast.error("Authentication failed. Please log in again.");
        return;
      }

      const bookingData = {
        tutorId: _id,
        studentName: session?.user?.name,
        studentPhone: phone,
      };

      const res = await fetch(`/api/backend/enrollments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      
      if (!res.ok) {
        toast.error(data.error || "Failed to book session");
        return;
      }

      toast.success("Successfully booked your session!");
      setIsOpen(false);
      
      // Navigate to My Booked Sessions page (which is located at /dashboard in the client routes)
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during booking");
    } finally {
      setBooking(false);
    }
  };

  return (
    <>
      <div className="w-full space-y-3">
        {/* Helper Alerts */}
        {isFullyBooked && (
          <div className="flex items-start gap-2 p-3 text-xs font-bold text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>This session is fully booked. You can’t join at the moment. No available slots left.</span>
          </div>
        )}

        {isDateRestricted && !isFullyBooked && (
          <div className="flex items-start gap-2 p-3 text-xs font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Booking is not available yet for this tutor (Registration starts {startDate}).</span>
          </div>
        )}

        <Button
          onClick={handleOpen}
          disabled={isFullyBooked || isDateRestricted}
          className={`w-full font-extrabold text-white text-base py-6 rounded-2xl shadow-xl transition-all duration-300 ${
            isFullyBooked || isDateRestricted
              ? "bg-slate-300 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 shadow-cyan-500/20 active:scale-[0.98]"
          }`}
        >
          {isFullyBooked ? "Fully Booked" : isDateRestricted ? "Booking Unavailable" : "Book Session Now"}
        </Button>
      </div>

      {/* Booking Form Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        backdrop="blur"
      >
        <ModalContainer className="dark:bg-[#0F172A] border dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-3xl max-w-lg mx-4">
          <ModalDialog>
            {({ close }) => (
              <form onSubmit={handleBook}>
                <ModalHeader className="flex flex-col gap-1 text-2xl font-black tracking-tight border-b border-slate-100 dark:border-slate-800">
                  Confirm Your Booking
                </ModalHeader>
                
                <ModalBody className="py-6 space-y-4">
                  
                  {/* Tutor Info */}
                  <div className="p-4 bg-slate-50 dark:bg-[#1A2332]/50 border dark:border-slate-800/80 rounded-2xl space-y-2">
                    <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Tutor Target</span>
                    <div className="flex justify-between items-center">
                      <span className="text-base font-extrabold text-cyan-500">{title}</span>
                      <span className="text-sm font-black text-slate-900 dark:text-white">${price}/hr</span>
                    </div>
                  </div>

                  {/* Tutor ID (Auto-filled) */}
                  <Input
                    label="Tutor ID"
                    value={_id}
                    disabled
                    placeholder="Auto-filled"
                    startcontent={<Key className="w-4 h-4 text-slate-400" />}
                    className="font-bold text-xs"
                  />

                  {/* Student Name (Auto-filled) */}
                  <Input
                    label="Student Name"
                    value={session?.user?.name || ""}
                    disabled
                    placeholder="Auto-filled"
                    startcontent={<User className="w-4 h-4 text-slate-400" />}
                    className="font-bold text-xs"
                  />

                  {/* Student Email (Auto-filled) */}
                  <Input
                    label="Student Email"
                    value={session?.user?.email || ""}
                    disabled
                    placeholder="Auto-filled"
                    startcontent={<Mail className="w-4 h-4 text-slate-400" />}
                    className="font-bold text-xs"
                  />

                  {/* Book Status (Auto-generated) */}
                  <Input
                    label="Book Status"
                    value="Pending"
                    disabled
                    placeholder="Pending"
                    startcontent={<Tag className="w-4 h-4 text-slate-400" />}
                    className="font-bold text-xs"
                  />

                  {/* Student Phone (Input Field) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g., +1 (555) 019-2834"
                        className="block w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#111827] text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent text-sm font-semibold transition-all duration-300"
                      />
                    </div>
                  </div>

                </ModalBody>
                
                <ModalFooter className="border-t border-slate-100 dark:border-slate-800 gap-3">
  <Button
    color="danger"
    variant="flat"
    onPress={close}
    className="font-bold"
  >
    Cancel
  </Button>
  <Button
    type="submit"
    isLoading={booking}
    className="font-black text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/15"
  >
    {!booking && <ShieldCheck className="w-4 h-4" />}
    Confirm Booking
  </Button>
</ModalFooter>
              </form>
            )}
          </ModalDialog>
        </ModalContainer>
      </Modal>
    </>
  );
}