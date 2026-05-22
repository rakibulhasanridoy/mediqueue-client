"use client";

import { useState, useEffect } from "react";
import { BookOpen, Menu, X, User, LogOut, LayoutDashboard, Moon, Sun, ChevronDown, PlusCircle, Users } from "lucide-react";
import Link from "next/link";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeContext";
import toast from "react-hot-toast";

export function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        toast.error(error.message || "Logout failed");
      } else {
        toast.success("Successfully logged out");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const isActive = (path) => pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md shadow-md border-b border-slate-200/50 dark:border-slate-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-tr from-cyan-400 to-blue-600 p-2 rounded-xl text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
                <BookOpen className="h-6 w-6" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
                MediQueue
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`text-sm font-semibold transition-colors duration-200 ${
                isActive("/")
                  ? "text-cyan-500 dark:text-cyan-400"
                  : "text-slate-600 hover:text-cyan-500 dark:text-slate-300 dark:hover:text-cyan-400"
              }`}
            >
              Home
            </Link>
            <Link
              href="/tutors"
              className={`text-sm font-semibold transition-colors duration-200 ${
                isActive("/tutors")
                  ? "text-cyan-500 dark:text-cyan-400"
                  : "text-slate-600 hover:text-cyan-500 dark:text-slate-300 dark:hover:text-cyan-400"
              }`}
            >
              Tutors
            </Link>

            {/* Authenticated Links */}
            {session?.user && (
              <>
                <Link
                  href="/add-tutor"
                  className={`text-sm font-semibold flex items-center gap-1 transition-colors duration-200 ${
                    isActive("/add-tutor")
                      ? "text-cyan-500 dark:text-cyan-400"
                      : "text-slate-600 hover:text-cyan-500 dark:text-slate-300 dark:hover:text-cyan-400"
                  }`}
                >
                  <PlusCircle className="w-4 h-4" /> Add Tutor
                </Link>
                <Link
                  href="/my-tutors"
                  className={`text-sm font-semibold flex items-center gap-1 transition-colors duration-200 ${
                    isActive("/my-tutors")
                      ? "text-cyan-500 dark:text-cyan-400"
                      : "text-slate-600 hover:text-cyan-500 dark:text-slate-300 dark:hover:text-cyan-400"
                  }`}
                >
                  <Users className="w-4 h-4" /> My Tutors
                </Link>
                <Link
                  href="/dashboard"
                  className={`text-sm font-semibold flex items-center gap-1 transition-colors duration-200 ${
                    isActive("/dashboard")
                      ? "text-cyan-500 dark:text-cyan-400"
                      : "text-slate-600 hover:text-cyan-500 dark:text-slate-300 dark:hover:text-cyan-400"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" /> My Booked Sessions
                </Link>
              </>
            )}
          </div>

          {/* Action Buttons (Right Aligned) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors duration-200 shadow-sm"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            {isPending ? (
              <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            ) : session?.user ? (
              /* User Dropdown */
              <Dropdown 
                placement="bottom-end"
                classNames={{
                  content: "bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 shadow-xl rounded-2xl min-w-[200px] p-1"
                }}
              >
                <DropdownTrigger>
                  <div
                    role="button"
                    tabIndex={0}
                    className="flex items-center gap-2 cursor-pointer outline-none select-none"
                  >
                    <span className="ring-2 ring-cyan-500 rounded-full inline-block hover:scale-105 transition-transform">
                      <Avatar
                        color="primary"
                        size="sm"
                        src={session?.user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150"}
                        className="cursor-pointer"
                      />
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </div>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Profile Actions" 
                  variant="flat"
                  onAction={(key) => {
                    if (key === "logout") {
                      handleLogOut();
                    }
                  }}
                  classNames={{
                    base: "p-0"
                  }}
                >
                  <DropdownItem 
                    key="profile_header" 
                    className="h-16 gap-2 opacity-100 cursor-default rounded-xl mb-1 bg-slate-50 dark:bg-slate-800/60" 
                    textValue="Signed in as"
                    isReadOnly
                  >
                    <p className="font-semibold text-xs text-slate-400">Signed in as</p>
                    <p className="font-bold text-sm text-cyan-500 truncate max-w-[160px]">{session?.user?.email}</p>
                  </DropdownItem>

                  <DropdownItem 
                    key="profile" 
                    onPress={() => router.push("/dashboard")}
                    textValue="My Profile"
                    className="rounded-xl text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 data-[hover=true]:bg-slate-100 dark:data-[hover=true]:bg-slate-800"
                  >
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      My Profile
                    </span>
                  </DropdownItem>

                  <DropdownItem
                    key="logout"
                    color="danger"
                    className="rounded-xl text-red-500 font-semibold mt-0.5 data-[hover=true]:bg-red-50 dark:data-[hover=true]:bg-red-950/30"
                    textValue="Log Out"
                    onPress={handleLogOut}
                  >
                    <span className="flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              /* Login/Register Buttons */
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="light" size="sm" className="font-semibold text-slate-700 dark:text-slate-200">
                    Log In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 shadow-md shadow-cyan-500/20"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center md:hidden gap-3">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-3 bg-white dark:bg-[#0B0F19] border-b border-slate-200 dark:border-slate-800 shadow-lg">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg font-semibold text-sm ${
              isActive("/") ? "bg-cyan-500/10 text-cyan-500" : "text-slate-700 dark:text-slate-300"
            }`}
          >
            Home
          </Link>
          <Link
            href="/tutors"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg font-semibold text-sm ${
              isActive("/tutors") ? "bg-cyan-500/10 text-cyan-500" : "text-slate-700 dark:text-slate-300"
            }`}
          >
            Tutors
          </Link>

          {session?.user ? (
            <>
              <Link
                href="/add-tutor"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-semibold text-sm ${
                  isActive("/add-tutor") ? "bg-cyan-500/10 text-cyan-500" : "text-slate-700 dark:text-slate-300"
                }`}
              >
                Add Tutor
              </Link>
              <Link
                href="/my-tutors"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-semibold text-sm ${
                  isActive("/my-tutors") ? "bg-cyan-500/10 text-cyan-500" : "text-slate-700 dark:text-slate-300"
                }`}
              >
                My Tutors
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-semibold text-sm ${
                  isActive("/dashboard") ? "bg-cyan-500/10 text-cyan-500" : "text-slate-700 dark:text-slate-300"
                }`}
              >
                My Booked Sessions
              </Link>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center px-3">
                <div className="flex items-center gap-2">
                  <Avatar size="sm" src={session?.user?.image || ""} />
                  <span className="text-sm font-bold truncate max-w-[150px]">{session?.user?.email}</span>
                </div>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogOut();
                  }}
                  className="flex items-center gap-1 text-sm font-semibold text-red-500"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="light" className="w-full font-semibold text-slate-700 dark:text-slate-200">
                  Log In
                </Button>
              </Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}