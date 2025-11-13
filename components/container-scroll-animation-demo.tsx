"use client"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import Skiper from "@/app/skiper-demo"

export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
           <>
            <h1 className="text-2.3xl md:text-[2.3rem] font-semibold text-black dark:text-white">
              My Life in a Nutshell <br />
              <span className="text-3.2xl md:text-[3.2rem] font-bold mt-3 text-[#DDFF01]  leading-none">Embracing Experiences and Inspirations</span>
            </h1>
          </>
        }
      >
        {/* <img
          src="https://wallpapercave.com/wp/wp6105894.jpg"
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        /> */}
        <Skiper />
      </ContainerScroll>
    </div>
  )
}
