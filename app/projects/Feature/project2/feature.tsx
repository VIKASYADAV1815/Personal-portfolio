"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function FeatureHighlights({ features }: any) {
  return (
    <div className="flex flex-col w-9/10 mx-auto overflow-y-auto scrollbar-hide bg-[#1A1A1A]/10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">TOP-Features</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Explore our standout features that make this project unique
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AnimatePresence>
          {features.map((feature: any) => (
            <AccordionItem
              key={feature.id}
              value={feature.id}
              className="border-b border-gray-200 dark:border-neutral-700 bg-[#1A1A1A]/5 transition-all duration-300 ease-in-out"
            >
              <AccordionTrigger className="flex items-center gap-3 py-3 text-left px-2 cursor-pointer no-underline transition-transform duration-300">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={28}
                  height={28}
                  className="rounded-md"
                />
                <span className="flex-1 font-medium">{feature.title}</span>
              </AccordionTrigger>

              <AccordionContent className="px-2 pt-2 space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full flex justify-center relative mb-8"
                >
                  {/* Double border effect */}
                  <div className="relative">
                    <div className="absolute inset-0 border border-gray-200/30 rounded-lg"></div>
                    <div className="absolute inset-[-4px] border border-gray-200/20 rounded-lg"></div>
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={400}
                        height={280}
                        className="rounded-lg shadow-md object-cover relative z-10"
                      />
                    </motion.div>
                  </div>
                </motion.div>
                {/* Text below the image */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6"
                >
                  {feature.description}
                </motion.p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </AnimatePresence>
      </Accordion>
    </div>
  );
}
