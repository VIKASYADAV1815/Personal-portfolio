import virat2 from "@/components/assets/virat2.png"
import shiftCard from "@/components/assets/v1.jpg"
import family from "@/components/assets/v2.jpg"
import carousel from "@/components/assets/v3.jpg"
import textureFull from "@/components/assets/v4.jpg"
import textureCard from "@/components/assets/hero2.jpg"

import { cn } from "@/lib/utils"
import { SkiperCard } from "@/components/ui/skiper-card"

export function SkiperCardDemo() {
  return (
    <section className="relative w-full h-full m-0 p-0 overflow-hidden" id="features">
      <div className="absolute inset-0 w-full h-full">
        <SkiperCard
          step1img1Class={cn(
            "pointer-events-none w-[48%] border border-stone-100/10 transition-all duration-500 dark:border-stone-700/50 shadow-[0_10px_15px_rgba(0,0,0,0.4),0_20px_25px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_15px_rgba(0,0,0,0.6),0_20px_25px_rgba(0,0,0,0.3)]",
            "left-1/4 top-[87%] rounded-[14px]",
            "max-md:scale-[160%] max-md:left-[20%] max-md:top-[33%]",
            "md:left-[35px] md:top-[29%]",
            "md:group-hover:translate-y-2"
          )}
          step1img2Class={cn(
            "pointer-events-none w-[48%] border border-stone-100/10 transition-all duration-500 dark:border-stone-700/50 shadow-[0_10px_15px_rgba(0,0,0,0.4),0_20px_25px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_15px_rgba(0,0,0,0.6),0_20px_25px_rgba(0,0,0,0.3)]",
            "left-[60%] top-[53%] rounded-[18px]",
            "max-md:scale-[120%] max-md:left-[62%] max-md:top-[40%]",
            "md:left-[calc(50%+35px+1rem)] md:top-[16%]",
            "md:group-hover:-translate-y-6"
          )}
          step2img1Class={cn(
            "pointer-events-none w-[48%] border border-stone-100/10 transition-all duration-500 dark:border-stone-700/50 shadow-[0_10px_15px_rgba(0,0,0,0.4),0_20px_25px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_15px_rgba(0,0,0,0.6),0_20px_25px_rgba(0,0,0,0.3)]",
            "left-1/4 top-[87%] rounded-[14px]",
            "max-md:scale-[160%] max-md:left-[20%] max-md:top-[85%]",
            "md:left-[35px] md:top-[29%]",
            "md:group-hover:translate-y-2"
          )}
          step2img2Class={cn(
            "pointer-events-none w-[30%] aspect-[9/16] border border-stone-100/10 transition-all duration-500 dark:border-stone-700 shadow-[0_10px_15px_rgba(0,0,0,0.4),0_20px_25px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_15px_rgba(0,0,0,0.6),0_20px_25px_rgba(0,0,0,0.3)]",
            "left-[60%] top-[20%] rounded-[15px]",
            "max-md:w-[40%] max-md:left-[50%] max-md:top-[25%]",
            "md:group-hover:-translate-y-6"
          )}
          // step2img3Class={cn(
          //   "pointer-events-none w-[28%] aspect-[3/4] border border-stone-100/10 transition-all duration-500 dark:border-stone-700 overflow-hidden rounded-[24px] shadow-[0_10px_15px_rgba(0,0,0,0.4),0_20px_25px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_15px_rgba(0,0,0,0.6),0_20px_25px_rgba(0,0,0,0.3)]",
          //   "left-[20%] top-[30%]",
          //   "max-md:w-[40%] max-md:aspect-[3/4] max-md:left-[40%] max-md:top-[20%]",
          //   "md:left-[calc(50%+10px)] md:top-[16%]",
          //   "md:group-hover:-translate-y-4"
          // )}
          step3imgClass={cn(
            "pointer-events-none w-[90%] border border-stone-100/10 transition-all duration-500 dark:border-stone-700 shadow-[0_10px_15px_rgba(0,0,0,0.4),0_20px_25px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_15px_rgba(0,0,0,0.6),0_20px_25px_rgba(0,0,0,0.3)]",
            "left-[5%] top-[50%] max-md:left-[5%] max-md:top-[40%]",
            "md:left-1/2 md:left-[68px] md:top-[30%]"
          )}
          step4new1Class={cn(
            "pointer-events-none w-[93%] border border-stone-100/10 transition-all duration-500 dark:border-stone-700 shadow-[0_10px_15px_rgba(0,0,0,0.4),0_20px_25px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_15px_rgba(0,0,0,0.6),0_20px_25px_rgba(0,0,0,0.3)]",
            "left-1/6 top-[49%] rounded-[16px]",
            "md:left-[35px] md:top-[25%]",
            "md:group-hover:translate-y-2",
            "max-md:w-[90%] max-md:h-auto max-md:left-[5%] max-md:bottom-[15%] max-md:top-auto object-contain"
          )}
          step4new2Class={cn(
            "pointer-events-none w-[35%] border border-stone-100/10 transition-all duration-500 dark:border-stone-700 shadow-[0_10px_15px_rgba(0,0,0,0.4),0_20px_25px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_15px_rgba(0,0,0,0.6),0_20px_25px_rgba(0,0,0,0.3)]",
            "left-[60%] top-[3%] rounded-[16px]",
            "md:left-[calc(50%+75px+1rem)] md:top-[15%]",
            "md:group-hover:-translate-y-6",
            "max-md:w-[60%] max-md:h-auto max-md:left-[64%] max-md:top-[32%] object-contain"
          )}

          bgClass="lg:bg-gradient-to-tr"
          image={{
            step1light1: family,
            step1light2: shiftCard,
            step2light1: carousel,
            step2light2: textureFull,
            step2light3: null, // explicitly set to null instead of undefined/omitted
            step3light: textureCard,
            step4new1: virat2,
            step4new2: virat2,
            alt: "Something",
          }}
        />
      </div>
    </section>
  )
}

export default SkiperCardDemo
