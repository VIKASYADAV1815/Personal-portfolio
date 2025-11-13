import {FeatureHighlights} from "./feature";
import AI from "./assets/blog-AI.png"
import Comment from "./assets/blog-comment.png"
import mode from "./assets/blog-mode.png"
import highlight from "./assets/blog-highlight.png"
import voice from "./assets/blog-voices.png"


export function Feature1() {
  const features = [
    {
      id: "item-1",
      title: "Advanced AI Content Generation",
      image: AI,
      description: "Leverage Google Gemini API to automatically generate sophisticated, context-aware content descriptions that enhance user engagement and readability.",
    },
    {
      id: "item-2",
      title: "Interactive Blog Commentary System",
      image: Comment,
      description: "Engage with content through a moderated commenting system, allowing users to share insights while maintaining quality through admin approval workflow.",
    },
    {
      id: "item-3",
      title: "Adaptive Reading Modes",
      image: mode,
      description: "Customize your reading experience with multiple viewing modes, including standard and focused reading layouts optimized for different scenarios.",
    },
    {
      id: "item-4",
      title: "Dynamic Text Highlighting",
      image: highlight,
      description: "Experience seamless audio-text synchronization with intelligent highlighting that follows along with audio playback in real-time.",
    },
    {
      id: "item-5",
      title: "Multi-Voice Audio Integration",
      image: voice,
      description: "Personalize your listening experience with a diverse selection of high-quality voice options for audio content playback.",
    },
  ];

  return <FeatureHighlights features={features} />;
}
