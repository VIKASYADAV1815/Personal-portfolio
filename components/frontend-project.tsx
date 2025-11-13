"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { MoveUpRight as ArrowIcon } from "lucide-react";

import p1 from "@/components/assets/frontend1.png"
import p2 from "@/components/assets/frontend2.png"
import p3 from "@/components/assets/frontend3.png"
import p4 from "@/components/assets/frontend4.png"

interface VisualItem {
  key: number;
  url: string;
  label: string;
  link?: string;
}

const visualData: VisualItem[] = [
  {
    key: 1,
    url: p1.src,
    label: "Finnegan",
    link: "https://renewed-arrow-540765.framer.app/"
  },
  {
    key: 2,
   url: p2.src,
    label: "Fuffy-Illuiminate",
    link: "https://fluffy-illuminate-689358.framer.app/"
  },
  {
    key: 3,
       url: p3.src,
    label: "Trusting Tour",
    link: "https://trusting-tours-828272.framer.app/"
  },
  {
    key: 4,
      url: p4.src,
    label: "Foolish (SAAS)",
    link: "https://foolish-ice-676325.framer.app/"
  },
];

const ImageReveal: React.FC = () => {
  const [focusedItem, setFocusedItem] = useState<VisualItem | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 300, damping: 40 });
  const smoothY = useSpring(cursorY, { stiffness: 300, damping: 40 });

  useEffect(() => {
    const updateScreen = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  const onMouseTrack = (e: React.MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  const onHoverActivate = (item: VisualItem) => {
    setFocusedItem(item);
  };

  const onHoverDeactivate = () => {
    setFocusedItem(null);
  };

  const handleClick = (item: VisualItem) => {
    if (item.link) {
      window.open(item.link, '_blank');
    }
  };

  return (
    <div
      className="relative w-full min-h-fit rounded-md overflow-hidden"
      onMouseMove={onMouseTrack}
      onMouseLeave={onHoverDeactivate}
      style={{ backgroundColor: "#121315", paddingTop: "4rem", paddingBottom: "4rem" }}
    >
      {visualData.map((item) => (
        <motion.div
          key={item.key}
          className="p-4 cursor-pointer relative sm:flex items-center justify-between"
          onMouseEnter={() => onHoverActivate(item)}
          onClick={() => handleClick(item)}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {!isLargeScreen && (
            <img
              src={item.url}
              className="sm:w-[400px] sm:h-[250px] w-full h-52 object-cover rounded-md"
              alt={item.label}
            />
          )}
          <motion.h2
            className={`newFont uppercase md:text-5xl sm:text-2xl text-xl font-semibold sm:py-6 py-2 leading-[100%] relative transition-colors duration-300 ${
              focusedItem?.key === item.key
                ? "mix-blend-difference z-20 text-gray-300"
                : "text-foreground"
            }`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {item.label}
          </motion.h2>
          {isLargeScreen && (
            <motion.button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-4 rounded-full transition-all duration-300 ease-out"
              style={{ color: "#DDFF00" }}
              animate={{
                opacity: focusedItem?.key === item.key ? 1 : 0,
                scale: focusedItem?.key === item.key ? 1.2 : 1,
              }}
              whileHover={{ scale: 1.4 }}
            >
              <ArrowIcon className="w-8 h-8" />
            </motion.button>
          )}
          <motion.div
            className="h-[2px] bg-white absolute bottom-0 left-0"
            initial={{ width: "0%" }}
            animate={{
              width: focusedItem?.key === item.key ? "100%" : "0%",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </motion.div>
      ))}

      <AnimatePresence>
        {isLargeScreen && focusedItem && (
          <motion.img
            src={focusedItem.url}
            alt={focusedItem.label}
            className="fixed z-30 object-cover w-[400px] h-[250px] rounded-lg pointer-events-none shadow-2xl"
            style={{
              left: smoothX,
              top: smoothY,
              x: "-50%",
              y: "-50%",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageReveal;
