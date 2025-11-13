import { ArcTimeline, type ArcTimelineItem } from "@/components/magicui/arc-timeline"
import {
  CodeIcon,
  DesktopIcon,
  Pencil2Icon,
  GlobeIcon,
  MobileIcon,
  CubeIcon,
  StarIcon,
  RocketIcon,
  PersonIcon,
  LayersIcon,
  MagicWandIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons"

export default function ArcTimelineDemo() {
  return (
    <ArcTimeline
      data={TIMELINE}
      defaultActiveStep={{ time: "2024", stepIndex: 0 }}
      arcConfig={{
        circleWidth: 2500,
        angleBetweenMinorSteps: 0.4,
        lineCountFillBetweenSteps: 10,
        boundaryPlaceholderLinesCount: 50,
      }}
      timeLabelClassName="relative top-6 " // time ko thoda neeche shift
    />
  )
}

const TIMELINE: ArcTimelineItem[] = [
  {
    time: "2020",
    steps: [
      {
        icon: <CodeIcon width={20} height={20} />,
        content: (
          <span className="text-xs text-purple-500 relative -top-4 block ">

            Started journey as a self-taught web developer, mastering HTML, CSS, and JavaScript fundamentals.
          </span>
        ),
      },
      {
        icon: <DesktopIcon width={20} height={20} />,
        content: (
          <span className="text-xs text-purple-500 relative -top-4 block">
            Built first portfolio website using vanilla JavaScript and responsive design principles.
          </span>
        ),
      },
    ],
  },
  {
    time: "2021",
    steps: [
      {
        icon: <CubeIcon width={20} height={20} />,
        content: (
          <span className="text-xs text-purple-500 relative -top-4 block">
            Learned React.js and modern frontend frameworks, created dynamic web applications.
          </span>
        ),
      },
      {
        icon: <Pencil2Icon width={20} height={20} />,
        content: (
          <span className="text-xs text-purple-500 relative -top-4 block">
            Started freelance content editing and copywriting for tech startups and blogs.
          </span>
        ),
      },
      {
        icon: <MagicWandIcon width={20} height={20} />,
        content: (
          <span className="text-xs text-purple-500 relative -top-4 block">
            Discovered passion for UI/UX design, began learning Figma and design principles.
          </span>
        ),
      },
    ],
  },
  {
    time: "2022",
    steps: [
      {
        icon: <LayersIcon width={20} height={20} />,
        content: (
          <span className="text-xs text-purple-500 relative -top-4 block">
            Mastered advanced CSS, animations, and modern design systems like Tailwind CSS.
          </span>
        ),
      },
      {
        icon: <GlobeIcon width={20} height={20} />,
        content: (
          <span className="text-xs text-purple-500 relative -top-4  block">
            Launched first client project - a complete e-commerce website with custom CMS.
          </span>
        ),
      },
      {
        icon: <PersonIcon width={20} height={20} />,
        content: (
          <span className="text-xs text-purple-500 relative -top-4 block">
            Conducted user research and usability testing for mobile app redesign project.
          </span>
        ),
      },
    ],
  },
  {
    time: "2023",
    steps: [
      {
        icon: <RocketIcon width={20} height={20} />,
        content: (
          <span className="text-xs text-purple-500 relative -top-4 block">
            Specialized in Next.js and full-stack development, built scalable web applications.
          </span>
        ),
      },
      {
        icon: <MobileIcon width={20} height={20} />,
        content: (
          <span className="text-xs text-purple-500 relative -top-4 block">
            Designed and developed responsive SaaS dashboard with complex data visualizations.
          </span>
        ),
      },
      {
        icon: <StarIcon width={20} height={20} />,
        content: (
          <span className="text-xs text-purple-500 relative -top-4 block">
            Won 'Best UI Design' award at local tech meetup for innovative mobile app interface.
          </span>
        ),
      },
    ],
  },
  {
    time: "2024",
    steps: [
      {
        icon: <LightningBoltIcon width={20} height={20} />,
        content: (
          <span className="text-xs text-purple-500 relative -top-4 block">
            Integrated AI tools into workflow, creating intelligent content editing solutions.
          </span>
        ),
      },
      {
        icon: <CubeIcon width={20} height={20} />,
        content: (
          <span className="text-xs text-purple-500 relative -top-4 block">
            Built comprehensive design system and component library for enterprise client.
          </span>
        ),
      },
      {
        icon: <GlobeIcon width={20} height={20} />,
        content: (
          <span className="text-xs text-purple-500 relative -top-4 block">
            Expanded services globally, working with clients across 3 continents remotely.
          </span>
        ),
      },
    ],
  },
  {
    time: "2025 Q3",
    steps: [
      {
        icon: <CubeIcon width={20} height={20} />,
        content: (
          <span className="text-xs text-purple-500 relative -top-4 block">
            Launched self-driving AI platform for industrial automation.
          </span>
        ),
      },
      {
        icon: <MagicWandIcon width={20} height={20} />,
        content: (
          <span className="text-xs text-purple-500 relative-top-4 block">
            Added virtual reality integration to the product suite.
          </span>
        ),
      },
    ],
  },
  {
    time: "2025 Q4",
    steps: [
      {
        icon: <StarIcon width={20} height={20} />,
        content: (
          <span className="text-xs text-purple-500 relative -top-4 block">
            Introduced AI-driven analytics dashboard for enterprise clients.
          </span>
        ),
      },
      {
        icon: <LightningBoltIcon width={20} height={20} />,
        content: (
          <span className="text-xs text-purple-500 relative -top-4 block">
            Launched international expansion into Asian and European markets.
          </span>
        ),
      },
      {
        icon: <RocketIcon width={20} height={20} />,
        content: (
          <span className="text-xs text-purple-500 relative -top-4 block">
            Hosted first global conference showcasing AI innovations.
          </span>
        ),
      },
    ],
  },
]
