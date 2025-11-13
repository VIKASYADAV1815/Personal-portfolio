'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BorderBeam } from '@/components/magicui/border-beam'
import Link from 'next/link'
import { 
    SiReact, SiRedux, SiTailwindcss, SiTypescript, 
    SiNodedotjs, SiMongodb, SiFirebase, SiHtml5, SiCss3,
    SiJavascript, SiFramer, SiExpress, SiMongoose, SiGraphql,
    SiDocker, SiKubernetes, SiVercel, SiNetlify,
    SiReactrouter
} from 'react-icons/si'
import { TbBrandThreejs } from 'react-icons/tb'

export default function Features() {
    type ImageKey = 'item-1' | 'item-2' | 'item-3' | 'item-4'
    const [activeItem, setActiveItem] = useState<ImageKey>('item-1')

    const getIconColor = (icon: string, isActive: boolean) => {
        if (!isActive) return 'text-gray-400'
        
        const colors = {
            html: 'text-orange-500',
            css: 'text-blue-500',
            js: 'text-yellow-400',
            nodejs: 'text-green-500',
            mongodb: 'text-green-600',
            react: 'text-blue-400',
            next: 'text-white',
            framer: 'text-purple-500',
            tailwind: 'text-cyan-400',
            typescript: 'text-blue-600',
            redux: 'text-purple-600',
            express: 'text-gray-200',
            mongoose: 'text-red-500',
            graphql: 'text-pink-500',
            docker: 'text-blue-500',
            kubernetes: 'text-blue-600',
            vercel: 'text-white',
            netlify: 'text-teal-400',
            firebase: 'text-orange-500',
            threejs: 'text-white-500',
            reactrouter: 'text-red-500'
        }
        return `${colors[icon]} drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]`
    }

    const images = {
        'item-1': {
            image: 'https://substack-post-media.s3.amazonaws.com/public/images/8c79c258-1009-46e9-a7d4-e81f4db26d7f_1280x720.gif',
            alt: 'VISION PRO',
            stacks: (isActive: boolean) => [
                <SiHtml5 key="html" className={`size-4 transition-all duration-300 ${getIconColor('html', isActive)}`} />,
                <SiCss3 key="css" className={`size-4 transition-all duration-300 ${getIconColor('css', isActive)}`} />,
                <SiJavascript key="js" className={`size-4 transition-all duration-300 ${getIconColor('js', isActive)}`} />,
                <SiFramer key="framer" className={`size-4 transition-all duration-300 ${getIconColor('framer', isActive)}`} />,
            ],
            link: 'https://vikasyadav1815.github.io/VISION-PRO/'
        },
        'item-2': {
            image: 'https://i.postimg.cc/4dRH78s3/Screenshot-311.png',
            alt: 'JARVIS',
            stacks: (isActive: boolean) => [
                <SiHtml5 key="html" className={`size-4 transition-all duration-300 ${getIconColor('html', isActive)}`} />,
                <SiCss3 key="css" className={`size-4 transition-all duration-300 ${getIconColor('css', isActive)}`} />,
                <SiJavascript key="js" className={`size-4 transition-all duration-300 ${getIconColor('js', isActive)}`} />,
            ],
            link: 'https://vikasyadav1815.github.io/_JARVIS_/'
        },
        'item-3': {
            image: 'https://i.postimg.cc/YCydfsRs/Screenshot-318.png',
            alt: '3D BEE MODEL',
            stacks: (isActive: boolean) => [
                <SiHtml5 key="html" className={`size-4 transition-all duration-300 ${getIconColor('html', isActive)}`} />,
                <SiCss3 key="css" className={`size-4 transition-all duration-300 ${getIconColor('css', isActive)}`} />,
                <SiJavascript key="js" className={`size-4 transition-all duration-300 ${getIconColor('js', isActive)}`} />,
                <TbBrandThreejs key="threejs" className={`size-4 transition-all duration-300 ${getIconColor('threejs', isActive)}`} />
            ],
            link: '/identity-management'
        },
        'item-4': {
            image: '/assets/food-fleet-demo.webp', // Use local optimized image instead
            alt: 'FOOD FLEET',
            stacks: (isActive: boolean) => [
                <SiReact key="react" className={`size-4 transition-all duration-300 ${getIconColor('react', isActive)}`} />,
                <SiTailwindcss key="tailwind" className={`size-4 transition-all duration-300 ${getIconColor('tailwind', isActive)}`} />,
                <SiNetlify key="netlify" className={`size-4 transition-all duration-300 ${getIconColor('netlify', isActive)}`} />,
                <SiReactrouter key="reactrouter" className={`size-4 transition-all duration-300 ${getIconColor('reactrouter', isActive)}`} />
            ],
            link: '/analytics-dashboard'
        },
    }

    return (
        <section className="py-12 md:py-20 lg:py-32">
            <div className="bg-[#121315] absolute inset-0 -z-10 sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]"></div>
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16 lg:space-y-20 dark:[--color-border:color-mix(in_oklab,var(--color-white)_10%,transparent)]">
                <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
                    <h2 className="text-balance text-2xl sm:text-3xl md:text-4xl font-semibold lg:text-6xl text-gray-200 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">…ever wonder where I first hit “<span className="text-[#DDFF01]">run</span>”?</h2>
                    <p className="text-sm sm:text-base text-gray-400">Step into the time-machine: my earliest UI experiments—messy, magical, and the moment web-dev became an obsession.</p>
                </div>

                <div className="grid gap-12 sm:px-12 md:grid-cols-2 lg:gap-20 lg:px-0">
                    <Accordion
                        type="single"
                        value={activeItem}
                        onValueChange={(value) => setActiveItem(value as ImageKey)}
                        className="w-full">
                        {Object.entries(images).map(([key, value]) => (
                            <AccordionItem key={key} value={key}>
                                <AccordionTrigger>
                                    <div className="flex items-center gap-4 text-sm sm:text-base">
                                        <Link 
                                            href={value.link} 
                                            className={`text-gray-200 hover:text-[#DDFF01] transition-colors ${
                                                activeItem === key ? 'text-[#DDFF01] drop-shadow-[0_0_8px_rgba(221,255,1,0.5)]' : ''
                                            }`}
                                        >
                                            {value.alt}
                                        </Link>
                                        <div className="flex gap-4">
                                            {value.stacks(activeItem === key)}
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-xs sm:text-sm text-gray-400">
                                    {key === 'item-1' 
                                        ? "This project leverages the Apple Vision Pro to create an engaging augmented application using HTML, CSS, and JavaScript. By using GSAP animations lenis for smooth scrolling."
                                        : key === 'item-2'
                                        ? "The Jarvis voice assistant is developed using HTML, CSS, and JavaScript to create an interactive user interface. This version operates on predefined commands only. (use desktop for male jarvis voice)"
                                        : key === 'item-3'
                                        ? "The Bee Zone project is an interactive project that showcases a beautifully crafted 3D model of a bee using Three.js, GSAP, HTML, CSS, and JavaScript. (for better experience use Laptop,computer)"
                                        : "Developed a responsive food ordering app using React.js for the frontend. The application allows users to browse menus, enhancing the overall user experience."
                                    }
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <div className="bg-background relative flex overflow-hidden rounded-3xl border p-2">
                        <div className="w-15 absolute inset-0 right-0 ml-auto border-l bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_8px)]"></div>
                        <div className="aspect-76/59 bg-background relative w-[calc(3/4*100%+3rem)] rounded-2xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${activeItem}-id`}
                                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                    className="size-full overflow-hidden rounded-2xl border bg-zinc-900 shadow-md">
                                    <Link href={images[activeItem].link}>
                                        <div className="relative size-full rounded-2xl overflow-hidden cursor-pointer">
                                            <Image
                                                src={images[activeItem].image}
                                                className="size-full object-cover rounded-2xl dark:mix-blend-lighten hover:scale-105 transition-transform duration-300"
                                                alt={images[activeItem].alt}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                priority
                                            />
                                        </div>
                                    </Link>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <BorderBeam
                            duration={6}
                            size={200}
                            className="from-transparent via-yellow-700 to-transparent dark:via-white/50"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
