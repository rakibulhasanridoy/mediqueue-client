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
  Modal, 
  ModalContainer,
  ModalDialog,
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Chip,
  User as UserCell
} from "@heroui/react";
import { 
  Edit3, 
  Trash2, 
  PlusCircle, 
  AlertTriangle, 
  Calendar, 
  DollarSign, 
  User,
  Users, 
  Award, 
  GraduationCap, 
  MapPin, 
  Globe, 
  Image as ImageIcon,
  FileText,
  Clock,
  BookOpen
} from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function MyTutorsPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // State Lists
  const [myTutors, setMyTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFetchingRef = useRef(false); // guard against React StrictMode double-invoke

  // Edit Modal States
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTutor, setEditingTutor] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    category: "",
    price: "",
      totalSlot: "5",
      startDate: "",
      institution: "",
      experience: "",
    location: "",
    teachingMode: "Online",
    thumbnail: "",
    description: "",
  });
  const [updating, setUpdating] = useState(false);




  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingTutorId, setDeletingTutorId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please log in to manage your tutors");
      router.push("/login");
    }
  }, [session, isPending, router]);

  const loadMyTutors = useCallback(async () => {
   
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      setLoading(true);
      const res = await fetch(`${/api/backend}/tutors`);
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || `Server error: ${res.status}`);
      }
      const data = await res.json();

      // Filter client-side by owner email
      if (session?.user?.email) {
        const filtered = data.filter((t) => t.ownerEmail === session.user.email);
        setMyTutors(filtered);
      }
    } catch (error) {
      console.error("loadMyTutors error:", error);
      toast.error("Could not load your tutor directory listings");
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [session]);

  useEffect(() => {
    if (session?.user?.email) {
      loadMyTutors();
    }
  }, [session?.user?.email, loadMyTutors]);

  if (isPending || (loading && !myTutors.length)) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 dark:bg-[#0B0F19]">
        <div className="w-16 h-16 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin mb-4" />
        <p className="text-sm font-bold text-slate-400">Loading Your Specialists...</p>
      </div>
    );
  }

  if (!session?.user) return null;

  // -- Edit Actions --
  const handleEditClick = (tutor) => {
    setEditingTutor(tutor);
    setEditForm({
      title: tutor.title || "",
      category: tutor.category || "",
      price: tutor.price || "",
        totalSlot: tutor.totalSlot !== undefined ? String(tutor.totalSlot) : "5",
        startDate: tutor.startDate || "",
        institution: tutor.institution || "",
      experience: tutor.experience || "",
      location: tutor.location || "",
      teachingMode: tutor.teachingMode || "Online",
      thumbnail: tutor.thumbnail || "",
      description: tutor.description || "",
    });
    setIsEditOpen(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFormSelectChange = (value) => {
    setEditForm((prev) => ({ ...prev, teachingMode: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingTutor) return;

    if (!editForm.title.trim()) return toast.error("Please enter the specialist name");
      if (!editForm.category.trim()) return toast.error("Please enter a medical specialty");
      if (!editForm.price || parseFloat(editForm.price) <= 0) return toast.error("Please enter a valid price");
    if (parseInt(editForm.totalSlot) < 0) return toast.error("Slots cannot be negative");
    if (!editForm.startDate) return toast.error("Please select a session start date");

    try {
      setUpdating(true);
      const { data: jwtData } = await authClient.token();
      const token = jwtData?.token;
      if (!token) {
        toast.error("Session expired. Please log in again.");
        return;
      }

      const payload = {
        ...editForm,
        instructor: editForm.title,
        totalSlot: parseInt(editForm.totalSlot) || 0,
      };

      const res = await fetch(`${/api/backend}/tutors/${editingTutor._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update tutor profile");
      }

      toast.success("Successfully updated specialist details!");
      setIsEditOpen(false);
      
      setMyTutors((prev) =>
        prev.map((t) => (t._id === editingTutor._id ? { ...t, ...payload } : t))
      );
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeletingTutorId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingTutorId) return;

    try {
      setDeleting(true);
      const { data: jwtData } = await authClient.token();
      const token = jwtData?.token;
      if (!token) {
        toast.error("Session expired. Please log in again.");
        return;
      }
      const res = await fetch(`${/api/backend}/tutors/${deletingTutorId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete tutor profile");
      }

      toast.success("Successfully deleted tutor profile!");
      setIsDeleteOpen(false);
      setMyTutors((prev) => prev.filter((t) => t._id !== deletingTutorId));
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to delete specialist profile");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              My Tutor Catalog
            </h1>
            <p className="text-sm font-semibold text-slate-400">
              Manage clinical rotation schedules, slot capacities, rates, and detailed bios for specialist profiles you created.
            </p>
          </div>

          <Button
  onClick={() => router.push("/add-tutor")}
  className="font-extrabold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/15 rounded-2xl py-6"
>
  <PlusCircle className="w-5 h-5" />
  Create New Tutor Profile
</Button>
        </div>

        {myTutors.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#111827]/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-10 max-w-lg mx-auto space-y-6">
            <Users className="w-12 h-12 text-slate-350 dark:text-slate-650 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">
                No Tutor Profiles Yet
              </h3>
              <p className="text-xs font-semibold text-slate-400 leading-relaxed">
                You havent registered any medical specialists or clinical instructor profiles under this email yet.
              </p>
            </div>
            <Button
              className="font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md"
              onClick={() => router.push("/add-tutor")}
            >
              Add Your First Specialist
            </Button>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#111827] border border-slate-200/60 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <Table.Content 
                aria-label="My Created Tutors Table"
                className="dark:bg-[#111827]"
                removeWrapper
              >
                <TableHeader>
                  <TableColumn isRowHeader className="font-black text-xs uppercase tracking-wider py-4 pl-6">Specialist Info</TableColumn>
                  <TableColumn className="font-black text-xs uppercase tracking-wider py-4">Specialty</TableColumn>
                    <TableColumn className="font-black text-xs uppercase tracking-wider py-4">Hourly Rate</TableColumn>
                  <TableColumn className="font-black text-xs uppercase tracking-wider py-4">Session Date</TableColumn>
                    <TableColumn className="font-black text-xs uppercase tracking-wider py-4">Capacity Slots</TableColumn>
                  <TableColumn className="font-black text-xs uppercase tracking-wider py-4 text-center pr-6">Management</TableColumn>
                </TableHeader>
                <TableBody items={myTutors.map((t) => ({ ...t, id: t._id }))}>
                  {(tutor) => (
                    <TableRow key={tutor._id} className="border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                      <TableCell className="py-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                            <Image
                              src={tutor.thumbnail || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=150"}
                              alt={tutor.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-black text-sm text-slate-900 dark:text-white leading-none mb-1">{tutor.title}</p>
                            <p className="text-[11px] font-bold text-slate-400">{tutor.institution}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Chip size="sm" className="bg-cyan-500/10 text-cyan-500 font-extrabold text-[10px] uppercase">
                          {tutor.category}
                        </Chip>
                      </TableCell>
                      <TableCell className="py-4 font-black text-sm text-slate-900 dark:text-white">
                        ${tutor.price}
                      </TableCell>
                      <TableCell className="py-4 font-bold text-xs text-slate-400">
                        {tutor.startDate}
                      </TableCell>
                      <TableCell className="py-4">
                        <span className={`font-black text-xs ${tutor.totalSlot > 0 ? "text-slate-900 dark:text-white" : "text-red-500"}`}>
                          {tutor.totalSlot > 0 ? `${tutor.totalSlot} slots` : "Fully Booked"}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 text-center pr-6">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant="flat"
                            className="font-bold flex items-center gap-1 hover:bg-cyan-500 hover:text-white transition-all"
                            onClick={() => handleEditClick(tutor)}
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            variant="flat"
                            className="font-bold flex items-center gap-1 hover:bg-red-650 hover:text-white transition-all"
                            onClick={() => handleDeleteClick(tutor._id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table.Content>
            </div>
          </div>
        )}

      </div>

      <Modal
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        backdrop="blur"
      >
        <ModalContainer className="dark:bg-[#0F172A] border dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-3xl max-w-2xl mx-4">
          <ModalDialog>
            {({ close }) => (
              <form onSubmit={handleUpdateSubmit}>
              <ModalHeader className="text-xl font-black border-b border-slate-100 dark:border-slate-800">
                Edit Specialist Profile
              </ModalHeader>
              
              <ModalBody className="py-6 max-h-[70vh] overflow-y-auto space-y-4">
                


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Specialist Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="title"
                        required
                        value={editForm.title}
                        onChange={handleEditFormChange}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 text-sm font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Specialty Category</label>
                    <div className="relative">
                      <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="category"
                        required
                        value={editForm.category}
                        onChange={handleEditFormChange}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 text-sm font-semibold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Price & Slots */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Hourly Rate ($)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="number"
                        name="price"
                        required
                        min="1"
                        value={editForm.price}
                        onChange={handleEditFormChange}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 text-sm font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Available Slots</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="number"
                        name="totalSlot"
                        required
                        min="0"
                        value={editForm.totalSlot}
                        onChange={handleEditFormChange}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 text-sm font-semibold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Start Date & Schedule */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Start Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        name="startDate"
                        required
                        value={editForm.startDate}
                        onChange={handleEditFormChange}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 text-sm font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Schedule Details</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="availableDaysSlot"
                        required
                        value={editForm.availableDaysSlot}
                        onChange={handleEditFormChange}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 text-sm font-semibold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Clinical Institution</label>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="institution"
                        required
                        value={editForm.institution}
                        onChange={handleEditFormChange}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 text-sm font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Years of Experience</label>
                    <div className="relative">
                      <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="experience"
                        required
                        value={editForm.experience}
                        onChange={handleEditFormChange}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 text-sm font-semibold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

          
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="location"
                        required
                        value={editForm.location}
                        onChange={handleEditFormChange}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 text-sm font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Teaching Mode</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                       <select
                        name="teachingMode"
                        value={editForm.teachingMode}
                        onChange={(e) => handleEditFormSelectChange(e.target.value)}
                        className="w-full pl-10 pr-8 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-105 text-sm font-semibold focus:outline-none cursor-pointer appearance-none"
                      >
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Both">Both</option>
                      </select>
                    </div>
                   </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Photo/Thumbnail URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="url"
                      name="thumbnail"
                        value={editForm.thumbnail}
                      onChange={handleEditFormChange}
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 text-sm font-semibold focus:outline-none"
                    />
                  </div>
                </div>
 
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Biography</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <textarea
                      name="description"
                      required
                      rows={3}
                      value={editForm.description}
                      onChange={handleEditFormChange}
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-[#1A2332]/40 text-slate-850 dark:text-slate-100 text-sm font-semibold focus:outline-none resize-none"
                    />
                  </div>
                </div>

              </ModalBody>
              
              <ModalFooter className="border-t border-slate-100 dark:border-slate-800">
                <Button variant="flat" onPress={close} className="font-bold">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updating}
                  className="font-black text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md"
                >
                  {updating ? "Saving Changes..." : "Save Details"}
                </Button>
              </ModalFooter>
              </form>
            )}
          </ModalDialog>
        </ModalContainer>
      </Modal>

      <Modal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        backdrop="blur"
      >
        <ModalContainer className="dark:bg-[#0F172A] border dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-3xl max-w-md mx-4">
          <ModalDialog>
            {({ close }) => (
              <>
                <ModalHeader className="flex items-center gap-2 text-xl font-black text-red-500 border-b border-slate-100 dark:border-slate-800">
                  <AlertTriangle className="w-5 h-5" /> Delete Specialist Profile
                </ModalHeader>
                
                <ModalBody className="py-6 space-y-2">
                  <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Are you absolutely sure you want to delete this profile?
                  </p>
                  <p className="text-xs font-semibold text-slate-400 leading-relaxed">
                    This action is permanent and cannot be undone. All clinical slots, schedules, and active configurations for this specialist will be permanently removed.
                  </p>
                </ModalBody>
                
                <ModalFooter className="border-t border-slate-100 dark:border-slate-800">
                  <Button variant="flat" onPress={close} className="font-bold">
                    Keep Profile
                  </Button>
                  <Button
                    color="danger"
                    disabled={deleting}
                    onClick={confirmDelete}
                    className="font-bold text-white bg-red-650"
                  >
                    {deleting ? "Deleting..." : "Yes, Delete Profile"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalDialog>
        </ModalContainer>
      </Modal>

    </div>
  );
}