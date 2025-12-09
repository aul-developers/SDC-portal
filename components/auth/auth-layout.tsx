"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

// Floating Card Components to match design
const InboxCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="absolute top-20 left-20 bg-white p-6 rounded-3xl shadow-2xl w-48 z-10 hidden lg:block"
  >
    <div className="flex justify-between items-start mb-4">
      <span className="text-orange-400 text-xs font-medium">Inbox</span>
    </div>
    <div className="text-2xl font-bold text-gray-900 mb-4">176,18</div>
    <div className="h-16 relative">
      <svg viewBox="0 0 100 40" className="w-full h-full">
        <path
          d="M0 30 Q 15 10, 30 25 T 60 20 T 90 30"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M20 35 Q 35 15, 50 30 T 80 25"
          fill="none"
          stroke="#4F46E5"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="50" cy="15" r="8" fill="#0F172A" />
        <text x="50" y="18" textAnchor="middle" fill="white" fontSize="6">
          45
        </text>
      </svg>
    </div>
  </motion.div>
);

const SecurityCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    className="absolute bottom-32 left-16 bg-white p-6 rounded-3xl shadow-2xl w-72 z-10 hidden lg:block"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-1 rounded-full bg-blue-500"></div>
      <div className="w-16 h-1 rounded-full bg-gray-100"></div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="w-full h-1 bg-gray-100 rounded-full"></div>
      <div className="w-3/4 h-1 bg-gray-100 rounded-full"></div>
      <div className="w-full h-1 bg-gray-100 rounded-full"></div>
    </div>

    <div className="flex justify-between items-center">
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 text-sm">
          Your data, your rules
        </h3>
        <p className="text-[10px] text-gray-400 mt-1 leading-tight">
          Your data belongs to you, and our encryption ensures that
        </p>
      </div>
      <div className="ml-2 text-orange-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
        </svg>
      </div>
    </div>
  </motion.div>
);

const SocialBubble = ({ icon: Icon, color, delay, top, right }: any) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
    className="absolute w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hidden lg:flex"
    style={{ top, right }}
  >
    <Icon className={`w-6 h-6 ${color}`} />
  </motion.div>
);

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
  </svg>
);

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white font-sans overflow-hidden">
      {/* Left Side - Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-20">
        {/* Mobile Header */}
        <div className="lg:hidden bg-[#1e1b4b] p-6 pb-12 rounded-b-[2.5rem] shadow-xl relative overflow-hidden mb-6 mx-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/20 rounded-full blur-xl -ml-5 -mb-5"></div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="h-10 w-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
              <Image
                src="/logo.png"
                width={24}
                height={24}
                alt="SDC Logo"
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none">
                SDC Portal
              </h1>
              <p className="text-blue-200 text-xs font-medium">
                Student Disciplinary Committee
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 pb-12">
          {/* Back Arrow (Mock) */}
          <div className="hidden lg:block absolute top-8 left-8">
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {children}

          <div className="mt-12 flex items-center gap-2 text-sm font-semibold text-gray-900 justify-center lg:justify-start">
            <span>🇬🇧 ENG</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Right Side - Art Panel */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#4F46E5]">
        {/* Curved Backgrounds */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-0 right-0 w-full h-full bg-[#4338CA] opacity-50"
            style={{ borderBottomLeftRadius: "30%" }}
          ></div>
          <div className="absolute -left-20 top-0 w-full h-full bg-[#6366F1] opacity-30 transform -skew-x-12"></div>

          {/* Top Blue shape */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0 H 100 V 20 Q 50 40 0 10 Z"
              fill="#312E81"
              opacity="0.2"
            />
          </svg>
        </div>

        {/* Dark Blue Header Blob */}
        <div className="absolute -top-10 -left-10 w-64 h-32 bg-[#312E81] rounded-full transform -rotate-12 z-0"></div>

        {/* Floating Elements */}
        <div className="relative w-full h-full max-w-lg mx-auto flex items-center justify-center">
          <div className="relative w-full h-full">
            <InboxCard />
            <SecurityCard />

            <SocialBubble
              icon={Instagram}
              color="text-pink-500"
              delay={0.6}
              top="20%"
              right="20%"
            />
            <SocialBubble
              icon={TiktokIcon}
              color="text-black"
              delay={0.8}
              top="40%"
              right="15%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
