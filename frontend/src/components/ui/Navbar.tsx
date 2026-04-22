// frontend/src/components/ui/Navbar.tsx
"use client";

import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50">
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="glass-panel mx-4 mt-4 px-6 py-3 flex justify-between items-center"
      >
        <span className="text-xl font-bold tracking-tight text-primary">
          FairLens
        </span>
        <UserButton afterSignOutUrl="/" />
      </motion.div>
    </nav>
  );
};
