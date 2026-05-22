import Link from "next/link";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-[#0B0F19] border-t border-slate-200 dark:border-slate-800 transition-colors duration-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-tr from-cyan-400 to-blue-600 p-2 rounded-xl text-white shadow-md shadow-cyan-500/10">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                MediQueue
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Advanced academic medical tutoring for residents, fellows, and undergraduate medical students. Master complex diagnostics today.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-200 hover:bg-cyan-500 hover:text-white dark:bg-slate-800 dark:hover:bg-cyan-500 dark:text-slate-400 dark:hover:text-white transition-all duration-200">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-200 hover:bg-cyan-500 hover:text-white dark:bg-slate-800 dark:hover:bg-cyan-500 dark:text-slate-400 dark:hover:text-white transition-all duration-200">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-200 hover:bg-cyan-500 hover:text-white dark:bg-slate-800 dark:hover:bg-cyan-500 dark:text-slate-400 dark:hover:text-white transition-all duration-200">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-200 hover:bg-cyan-500 hover:text-white dark:bg-slate-800 dark:hover:bg-cyan-500 dark:text-slate-400 dark:hover:text-white transition-all duration-200">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Learning Streams */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Learning Tracks
            </h3>
            <ul className="space-y-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/tutors?search=Anatomy" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                  Surgical Anatomy
                </Link>
              </li>
              <li>
                <Link href="/tutors?search=Genomics" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                  Genomic Medicine
                </Link>
              </li>
              <li>
                <Link href="/tutors?search=Neurology" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                  Microsurgical Neurology
                </Link>
              </li>
              <li>
                <Link href="/tutors?search=Cardiology" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                  Clinical Cardiology
                </Link>
              </li>
              <li>
                <Link href="/tutors?search=Oncology" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                  Oncology Pathways
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                  Curriculum & Syllabus
                </Link>
              </li>
              <li>
                <Link href="/tutors" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                  Tutor Directory
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                  Institutional Access
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                  Ethics & Guidelines
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                  Privacy Statement
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm font-semibold text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-500 dark:text-cyan-400 mt-0.5 shrink-0" />
                <span>Medical Academic Block 4, Baltimore, MD 21205</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                <span>+1 (555) 349-2041</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                <span>support@mediqueue.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-10 border-slate-200 dark:border-slate-800" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
          <p>© 2026 MediQueue. Advanced Medical Tutoring for the Genomic Age.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400">Terms of Use</a>
            <a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;