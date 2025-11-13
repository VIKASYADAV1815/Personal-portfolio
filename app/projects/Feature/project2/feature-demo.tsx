import {FeatureHighlights} from "./feature";
import chart from "./assets/excel-chart.png"
import dashboard from "./assets/excel-dashboard.png"
import profile from "./assets/excel-profile.png"
import upload from "./assets/excel-upload.png"
import setting from "./assets/excel-setting.png"

export function Feature2() {
  const features = [
    {
      id: "item-1",
      title: "Interactive Analytics Dashboard",
      image: dashboard,
      description: "Modern, intuitive dashboard featuring dynamic KPI cards and interactive data visualization charts for comprehensive business insights",
    },
    {
      id: "item-2", 
      title: "Advanced Data Visualization",
      image: chart,
      description: "User-friendly chart interface with customizable data visualization options for in-depth analysis",
    },
    {
      id: "item-3",
      title: "Excel File Integration",
      image: upload,
      description: "Seamless Excel file upload functionality with animated progress indicators and data validation",
    },
    {
      id: "item-4",
      title: "User Profile Management",
      image: profile,
      description: "Minimalist and sleek profile interface for efficient user information management",
    },
    {
      id: "item-5",
      title: "System Configuration",
      image: setting,
      description: "Comprehensive settings panel with extensive customization options for optimal user experience",
    },
  ];

  return <FeatureHighlights features={features} />;
}
