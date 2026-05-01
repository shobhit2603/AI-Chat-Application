"use client";

import {
  GoogleLogo,
  Sparkle,
  MagicWand,
  Shapes,
  Lightning,
  MountainsIcon,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import React from "react";

export default function Auth() {
  const handleGoogleLogin = () => {
    // Connect to backend Google Auth route
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center p-4 lg:p-4 font-sans selection:bg-violet-600 selection:text-white">
      {/* Main Container Box */}
      <div className="w-full max-w-[1400px] min-h-[50vh] flex flex-col lg:flex-row gap-3 relative">
        {/* Left Panel: Auth Form */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full lg:w-1/2 bg-[#111111] rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col border-2 border-white/5 relative overflow-hidden group min-h-[300px]"
        >
          {/* Top Logo */}
          <div className="flex justify-center lg:justify-start w-full relative z-10 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white">
                <MountainsIcon size={18} weight="fill" />
              </div>
              <span className="text-white text-2xl tracking-tight">
                Aura.ai
              </span>
            </div>
          </div>

          {/* Center Form Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="w-full max-w-sm mx-auto flex flex-col items-center lg:items-start text-center lg:text-left relative z-10 my-auto py-12"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-3xl bg-white/3 border border-white/8 mb-8"
            >
              <Sparkle size={14} className="text-violet-600" />
              <span className="text-[10px] font-medium text-white/70 uppercase tracking-widest">
                Chat, learn, and explore
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl lg:text-5xl tracking-tight text-white mb-4 leading-tight"
            >
              Sign in to
              <br />
              account
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/40 text-sm mb-12">
              Sign in to securely access your AI assistant and start exploring
              new ideas.
            </motion.p>

            <motion.div variants={fadeUp} className="w-full">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-violet-600 text-white py-4 px-6 rounded-4xl font-medium text-[15px] transition-all duration-400 cursor-pointer hover:rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
              >
                <GoogleLogo size={22} weight="bold" />
                <span>Continue with Google</span>
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="w-full mt-8 flex items-center justify-center gap-4"
            >
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-white/30 text-xs uppercase tracking-wider font-medium">
                Or
              </span>
              <div className="h-px bg-white/10 flex-1" />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-center w-full mt-8 text-white/40 text-sm"
            >
              Secured by advanced encryption.
            </motion.p>
          </motion.div>

          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8b5cf6]/5 rounded-full blur-[100px] pointer-events-none transition-opacity duration-1000 opacity-50 group-hover:opacity-100" />
        </motion.div>

        {/* Right Panel: Bento Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="hidden lg:grid grid-cols-3 grid-rows-3 gap-3 w-full lg:w-1/2 min-h-[700px] h-full"
        >
          {/* Top Left: Large Image */}
          <motion.div
            variants={scaleIn}
            className="col-span-2 row-span-2 rounded-3xl overflow-hidden relative group"
          >
            <img
              src="https://images.unsplash.com/photo-1687618054649-9dd4b7d4eafe?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Abstract Violet Gradient"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          {/* Top Right: Small Image */}
          <motion.div
            variants={scaleIn}
            className="col-span-1 row-span-1 rounded-3xl overflow-hidden relative group"
          >
            <img
              src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Violet Sphere"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
          </motion.div>

          {/* Middle Right: Violet Feature Box */}
          <motion.div
            variants={scaleIn}
            className="col-span-1 row-span-1 bg-violet-600 rounded-3xl p-6 lg:p-8 flex flex-col justify-between text-white relative overflow-hidden group"
          >
            <div className="relative z-10">
              <h3 className="text-xl lg:text-2xl font-medium leading-tight mb-2">
                Learn &
                <br />
                Research
              </h3>
              <p className="text-white/70 text-xs leading-relaxed">
                Engage in deep conversations to research complex topics and
                learn faster.
              </p>
            </div>
            <div className="w-full flex justify-end mt-4 relative z-10">
              <Shapes
                size={32}
                weight="fill"
                className="group-hover:rotate-12 transition-transform duration-500 text-white"
              />
            </div>
          </motion.div>

          {/* Bottom Left: Dark Feature Box */}
          <motion.div
            variants={scaleIn}
            className="col-span-1 row-span-1 bg-[#111111] rounded-3xl p-6 lg:p-8 flex flex-col justify-end relative overflow-hidden border border-white/5 group"
          >
            <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/3 flex items-center justify-center border border-white/5">
              <Lightning
                size={20}
                className="text-violet-600 group-hover:scale-125 transition-transform"
                weight="fill"
              />
            </div>
            <h3 className="text-white text-lg font-medium mb-1 relative z-10">
              Instant Answers
            </h3>
            <p className="text-white/40 text-xs relative z-10">
              Get accurate, real-time responses to your questions instantly.
            </p>
          </motion.div>

          {/* Bottom Middle: Small Image */}
          <motion.div
            variants={scaleIn}
            className="col-span-1 row-span-1 rounded-3xl overflow-hidden relative group"
          >
            <img
              src="https://images.unsplash.com/photo-1740174459718-fdcc63ee3b4f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Violet 3D Render"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-500 grayscale hover:grayscale-0"
            />
          </motion.div>

          {/* Bottom Right: Purple Accent Box */}
          <motion.div
            variants={scaleIn}
            className="col-span-1 row-span-1 bg-[#d8b4fe] rounded-3xl p-6 flex items-center justify-center relative overflow-hidden group cursor-pointer"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 border-2 border-[#8b5cf6]/30 rounded-3xl relative z-10"
            />
            <Sparkle
              size={48}
              className="text-violet-600 absolute z-20"
              weight="fill"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
