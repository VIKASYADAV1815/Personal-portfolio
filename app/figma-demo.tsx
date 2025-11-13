import design1 from "@/public/figma1.png"
import design2 from "@/public/figma2.png"
import design3 from "@/public/figma3.png"



import {
  Pyramid,
  Castle,
  Mountain,
  TowerControl,
  Building,
  Landmark,
  ExternalLink,
} from "lucide-react";
import { ExpandingCards, CardItem } from "@/components/ui/expanding-cards";
import figma from "@/components/assets/figma.png";
import framer  from "@/components/assets/framer.png"
import trustingTour from "@/components/assets/frontend3.png"
import FoolishIce from  "@/components/assets/frontend4.png"
import Foolish from  "@/components/assets/frontend5.png"
import Image from "next/image";

const architecturalWonders: CardItem[] = [

 {
    id: "Trusting Tour",
    title: "Trusting Tour",
    description: (
      <div className="flex items-center justify-between w-full" style={{ fontFamily: "Montserrat, sans-serif" }}>
        <div className="flex items-center gap-4">
          <Image src={framer} alt="Figma Logo" width={24} height={24} />
          <span>Trusting Tour: sleek Framer landing page beautifully showing how paid ads scale businesses with compelling visuals, clear messaging, and intuitive user flow.</span>
        </div>
        <a
          href="https://trusting-tours-828272.framer.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-transparent border-2 border-[#DDFF01] rounded-full animate-pulse"
        >
          <ExternalLink size={16} className="sm:w-5 sm:h-5 text-[#DDFF01]" />
        </a>
      </div>
    ),
    imgSrc: trustingTour.src,
    icon: <Landmark size={24} />,
    linkHref: "#",
  },

  {
    id: "Luma: AI-Driven Insights",
    title: "Luma: AI-Driven Insights",
    description: (
      <div className="flex items-center justify-between w-full" style={{ fontFamily: "Montserrat, sans-serif" }}>
        <div className="flex items-center gap-4">
          <Image src={figma} alt="Figma Logo" width={34} height={24} />
          <span>Unlock smarter investment decisions with Luma. Powered by AI, it offers real-time forecasts and risk alerts to help you make informed choices in a dynamic market.</span>
        </div>
        <a
          href="https://www.figma.com/proto/4xzd2CTDgCXaUx1R3f8Uex/Luma?node-id=29-5&t=q5TsxSm4zFzuBEeR-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A22"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-transparent border-2 border-[#DDFF01] rounded-full animate-pulse"
        >
          <ExternalLink size={16} className="sm:w-5 sm:h-5 text-[#DDFF01]" />
        </a>
      </div>
    ),
    imgSrc: design1.src,
    icon: <Pyramid size={24} />,
    linkHref: "https://www.figma.com/proto/jL8z3g4HMJ3iw7dnobfVRy/Stockly?node-id=1-2&p=f&t=4Cwm3NsJqRUXJ6T8-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
  },
  {
    id: "Stockly: Smarter Investment Decisions",
    title: "Stockly: Smarter Investment Decisions", 
    description: (
      <div className="flex items-center justify-between w-full" style={{ fontFamily: "Montserrat, sans-serif" }}>
        <div className="flex items-center gap-4">
          <Image src={figma} alt="Figma Logo" width={24} height={24} />
          <span>Built in Figma, Stockly’s landing page combines modern design with smooth, interactive elements to create an engaging user experience and visually appealing layout.</span>
        </div>
        <a
          href="https://www.figma.com/design/4xzd2CTDgCXaUx1R3f8Uex/Luma?node-id=0-1&p=f&t=SXaFjNWr5L3WcELt-0"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-transparent border-2 border-[#DDFF01] rounded-full animate-pulse"
        >
          <ExternalLink size={16} className="sm:w-5 sm:h-5 text-[#DDFF01]" />
        </a>
      </div>
    ),
   imgSrc: design2.src,
    icon: <Castle size={24} />,
    linkHref: "#",
  },
  {
    id: "Foolish",
    title: "Foolish Ice",
    description: (
      <div className="flex items-center justify-between w-full" style={{ fontFamily: "Montserrat, sans-serif" }}>
        <div className="flex items-center gap-4">
          <Image src={figma} alt="Figma Logo" width={24} height={24} />
          <span>
"Foolish" is a vibrant, modern landing page in Framer designed to promote a productivity app that tracks progress and motivates users.</span>
        </div>
        <a
          href="https://foolish-ice-676325.framer.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-transparent border-2 border-[#DDFF01] rounded-full animate-pulse"
        >
          <ExternalLink size={16} className="sm:w-5 sm:h-5 text-[#DDFF01]" />
        </a>
      </div>
    ),
    imgSrc: FoolishIce.src,
    icon: <Mountain size={24} />,
    linkHref: "#",
  },
  {
    id: "Fluffy Illuminate",
    title: "Fluffy Illuminate",
    description: (
      <div className="flex items-center justify-between w-full" style={{ fontFamily: "Montserrat, sans-serif" }}>
        <div className="flex items-center gap-4">
          <Image src={framer} alt="Figma Logo" width={24} height={24} />
          <span>Fluffy Illuminate is a sleek, modern UI design created in Framer, featuring smooth animations and a soft, glowing aesthetic for an engaging user experience."</span>
        </div>
        <a
          href="https://fluffy-illuminate-689358.framer.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-transparent border-2 border-[#DDFF01] rounded-full animate-pulse"
        >
          <ExternalLink size={16} className="sm:w-5 sm:h-5 text-[#DDFF01]" />
        </a>
      </div>
    ),
    imgSrc: Foolish.src,
    icon: <TowerControl size={24} />,
    linkHref: "#",
  },
  // {
  //   id: "burj-khalifa",
  //   title: "Burj Khalifa",
  //   description: (
  //     <div className="flex items-center justify-between w-full" style={{ fontFamily: "Montserrat, sans-serif" }}>
  //       <div className="flex items-center gap-4">
  //         <Image src={framer} alt="Figma Logo" width={24} height={24} />
  //         <span>The world's tallest building, a modern architectural marvel in Dubai that pierces the sky at over 828 meters.</span>
  //       </div>
  //       <a
  //         href="https://www.figma.com/design/4xzd2CTDgCXaUx1R3f8Uex/Luma?node-id=0-1&p=f&t=SXaFjNWr5L3WcELt-0"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         className="px-3 sm:px-4 py-1.5 sm:py-2 bg-transparent border-2 border-[#DDFF01] rounded-full animate-pulse"
  //       >
  //         <ExternalLink size={16} className="sm:w-5 sm:h-5 text-[#DDFF01]" />
  //       </a>
  //     </div>
  //   ),
  //   imgSrc: "https://images.unsplash.com/photo-1572364769167-198dcb7b520c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyaiUyMGtoYWxpZmF8ZW58MHwxfDB8fHww",
  //   icon: <Building size={24} />,
  //   linkHref: "#",
  // },
 
  // {
  //   id: "colosseum",
  //   title: "The Colosseum",
  //   description: (
  //     <div className="flex items-center justify-between w-full" style={{ fontFamily: "Montserrat, sans-serif" }}>
  //       <div className="flex items-center gap-4">
  //         <Image src={framer} alt="Figma Logo" width={24} height={24} />
  //         <span>The largest ancient amphitheater ever built, it remains the largest standing amphitheater in the world today.</span>
  //       </div>
  //       <a
  //         href="https://www.figma.com/design/4xzd2CTDgCXaUx1R3f8Uex/Luma?node-id=0-1&p=f&t=SXaFjNWr5L3WcELt-0"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         className="px-3 sm:px-4 py-1.5 sm:py-2 bg-transparent border-2 border-[#DDFF01] rounded-full animate-pulse"
  //       >
  //         <ExternalLink size={16} className="sm:w-5 sm:h-5 text-[#DDFF01]" />
  //       </a>
  //     </div>
  //   ),
  //   imgSrc: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200",
  //   icon: <Landmark size={24} />,
  //   linkHref: "#",
  // },
];

export default function Figma() {
  return (
    <div className="flex w-full flex-col items-center mt-50 justify-center space-y-8 bg-[#121315] p-8 md:p-8" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div className="text-center">
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-4xl" style={{ fontFamily: "Montserrat, sans-serif" }}>
        UI/UX Design Showcase
        </h1>
        <p className="mt-4 max-w-2xl text-sm sm:text-lg text-muted-foreground" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Explore a collection of curated UI/UX case studies—each card showcases the design process, prototypes, and polished Figma flows, alongside Framer’s interactive UI designs. Hover to preview, and click to dive deeper into each platform's unique approach
        </p>
      </div>
      <ExpandingCards items={architecturalWonders} defaultActiveIndex={0} />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 px-4 sm:px-0" style={{ fontFamily: "Montserrat, sans-serif" }}>
          <h1 className="text-lg sm:text-xl font-semibold text-neutral-200 text-center sm:text-left">Go to Project Page</h1>
          <button
            type="button"
            onClick={() => {
              window.location.assign('/projects');
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm sm:text-base text-neutral-400 hover:text-[#DDFF01] transition-all duration-300 border-2 border-[#DDFF01] rounded-full px-4 sm:px-6 py-2 bg-transparent hover:bg-[rgba(221,255,1,0.1)] cursor-pointer group animate-bounce"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <span>View Projects</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
    </div>
  );
}
