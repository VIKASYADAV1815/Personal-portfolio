"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/leetcard";
import leet from "@/components/assets/leet.png";

export function Leet() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-[#121315] w-full sm:w-[30rem] rounded-xl p-4 border border-black/[0.1] relative">
        
        {/* leet.png centered, animated, minimal gap */}
        <CardItem translateZ="50" className="flex justify-center -mb-4">
          <img
            src={leet.src}
            alt="Leet Logo"
            className="h-32 w-32 sm:h-36 sm:w-36 object-contain transition-transform duration-500 transform-gpu group-hover/card:scale-110"
          />
        </CardItem>

        {/* LeetCode stats image full width with shadow */}
        <CardItem translateZ="100" className="w-full flex justify-center">
          <img
            src="https://leetcard.jacoblin.cool/vikasyadav1815?theme=dark&font=Noto%20Sans%20Nabataean&ext=heatmap"
            className="w-full max-w-[500px] h-auto object-contain rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 transform-gpu hover:scale-105"
            alt="LeetCode stats"
          />
        </CardItem>

        {/* Description */}
        <div className="mt-2 flex justify-center">
          <CardItem
            translateZ={20}
            as="p"
            className="text-gray-400 text-xs sm:text-sm text-center"
          >
            This card updates automatically to showcase my most recent progress on LeetCode.
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

export default Leet;
