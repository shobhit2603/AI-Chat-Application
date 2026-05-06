"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/useAuth";
import { motion, AnimatePresence } from "motion/react";
import { CircleNotch, Sparkle } from "@phosphor-icons/react";

export default function AuthGuard({ children }) {
    const { checkAuth } = useAuth();
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated && pathname !== "/auth") {
                router.push("/auth");
            }
            if (isAuthenticated && pathname === "/auth") {
                router.push("/");
            }
        }
    }, [isAuthenticated, isLoading, pathname, router]);

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center transition-colors duration-300">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center">
                            <Sparkle size={28} weight="fill" className="text-white" />
                        </div>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                            className="absolute -bottom-2 -right-2"
                        >
                            <CircleNotch size={20} weight="bold" className="text-violet-400" />
                        </motion.div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-(--app-text) text-lg tracking-tight">Aura.ai</span>
                        <span className="text-(--app-text-subtle) text-xs tracking-wider uppercase">Loading</span>
                    </div>
                </motion.div>
            </div>
        );
    }

    // On auth page and not authenticated, show auth page
    if (pathname === "/auth" && !isAuthenticated) {
        return children;
    }

    // Not authenticated elsewhere, don't render (will redirect)
    if (!isAuthenticated) {
        return null;
    }

    return children;
}
