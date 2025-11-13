// import React, { useState, useEffect } from 'react';
// import { Camera, MapPin, Calendar, Clock, Instagram, Linkedin, Github, Twitter, MessageCircle, X, ArrowLeft } from 'lucide-react';
// import { SVGProps } from "react";

// export interface Iphone15ProProps extends SVGProps<SVGSVGElement> {
//   width?: number;
//   height?: number;
// }

// export function Iphone15Pro({
//   width = 43,
//   height = 82,
//   ...props
// }: Iphone15ProProps) {
//   return (
//     <div className="relative" style={{ width, height }}>
//       {/* iPhone Frame */}
//       <svg
//         width={width}
//         height={height}
//         viewBox={`0 0 ${width} ${height}`}
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         {...props}
//       >
//         {/* Main body - black */}
//         <path
//           d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
//           className="fill-[#1a1a1a]"
//         />
//         {/* Side buttons - black */}
//         <path
//           d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z"
//           className="fill-[#1a1a1a]"
//         />
//         <path
//           d="M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z"
//           className="fill-[#1a1a1a]"
//         />
//         <path
//           d="M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z"
//           className="fill-[#1a1a1a]"
//         />
//         <path
//           d="M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z"
//           className="fill-[#1a1a1a]"
//         />
//         {/* Screen bezel */}
//         <path
//           d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
//           className="fill-black"
//         />
//         {/* Screen area */}
//         <path
//           d="M21.25 75C21.25 44.2101 46.2101 19.25 77 19.25H355C385.79 19.25 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 21.25 837.79 21.25 807V75Z"
//           className="fill-black stroke-[#1a1a1a] stroke-[0.5]"
//         />
//         {/* Dynamic Island */}
//         <path
//           d="M154 48.5C154 38.2827 162.283 30 172.5 30H259.5C269.717 30 278 38.2827 278 48.5C278 58.7173 269.717 67 259.5 67H172.5C162.283 67 154 58.7173 154 48.5Z"
//           className="fill-[#0a0a0a]"
//         />
//         {/* Front Camera in Dynamic Island */}
//         <circle
//           cx="259.5"
//           cy="48.5"
//           r="8"
//           className="fill-[#1a1a1a]"
//         />
//         <circle
//           cx="259.5"
//           cy="48.5"
//           r="4"
//           className="fill-[#333]"
//         />
//         {/* Speaker in Dynamic Island */}
//         <ellipse
//           cx="185"
//           cy="48.5"
//           rx="15"
//           ry="3"
//           className="fill-[#333]"
//         />
//       </svg>
      
//       {/* iOS Interface positioned inside the iPhone screen */}
//       <div 
//         className="absolute overflow-hidden"
//         style={{ 
//           top: '19px', 
//           left: '21px', 
//           width: '390px', 
//           height: '844px',
//           borderRadius: '55px'
//         }}
//       >
//         <IOSInterface />
//       </div>
//     </div>
//   );
// }

// function IOSInterface() {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [currentView, setCurrentView] = useState<'home' | 'whatsapp' | 'camera' | 'maps'>('home');
//   const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     return () => {
//       if (cameraStream) {
//         cameraStream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, [cameraStream]);

//   const formatTime = (date: Date) => {
//     return date.toLocaleTimeString('en-US', {
//       hour: 'numeric',
//       minute: '2-digit',
//       hour12: false
//     });
//   };

//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const openWhatsApp = () => {
//     setCurrentView('whatsapp');
//   };

//   const openCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: { facingMode: 'user' },
//         audio: false 
//       });
//       setCameraStream(stream);
//       setCurrentView('camera');
//     } catch (error) {
//       console.error('Error accessing camera:', error);
//       // Fallback to camera view without stream
//       setCurrentView('camera');
//     }
//   };

//   const openMaps = () => {
//     setCurrentView('maps');
//   };

//   const goHome = () => {
//     if (cameraStream) {
//       cameraStream.getTracks().forEach(track => track.stop());
//       setCameraStream(null);
//     }
//     setCurrentView('home');
//   };

//   const AppIcon = ({ icon: Icon, label, gradient, onClick }: {
//     icon: React.ComponentType<any>;
//     label: string;
//     gradient: string;
//     onClick?: () => void;
//   }) => {
//     return (
//       <div 
//         className="flex flex-col items-center space-y-1 cursor-pointer transform transition-transform hover:scale-105"
//         onClick={onClick}
//       >
//         <div className={`w-14 h-14 sm:w-16 sm:h-16 ${gradient} rounded-[22%] flex items-center justify-center shadow-lg border border-white/10`}>
//           <Icon className="w-7 h-7 sm:w-9 sm:h-9 text-white" strokeWidth={1.5} />
//         </div>
//         <span className="text-white text-xs font-medium text-center leading-tight max-w-[60px] truncate">{label}</span>
//       </div>
//     );
//   };

//   const DockIcon = ({ icon: Icon, gradient, href }: {
//     icon: React.ComponentType<any>;
//     gradient: string;
//     href: string;
//   }) => {
//     return (
//       <div 
//         className="w-12 h-12 sm:w-14 sm:h-14 cursor-pointer transform transition-transform hover:scale-105"
//         onClick={() => window.open(href, '_blank')}
//       >
//         <div className={`w-full h-full ${gradient} rounded-[22%] flex items-center justify-center shadow-lg`}>
//           <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={1.5} />
//         </div>
//       </div>
//     );
//   };

//   if (currentView === 'whatsapp') {
//     return (
//       <div className="w-full h-full bg-[#128C7E] flex flex-col">
//         {/* WhatsApp Header */}
//         <div className="flex items-center justify-between px-4 pt-16 pb-4 bg-[#075E54]">
//           <button onClick={goHome} className="text-white">
//             <ArrowLeft className="w-6 h-6" />
//           </button>
//           <h1 className="text-white text-lg font-semibold">WhatsApp Web</h1>
//           <div></div>
//         </div>
        
//         {/* QR Code Section */}
//         <div className="flex-1 flex flex-col items-center justify-center px-8 bg-white">
//           <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
//             {/* Dummy QR Code - replace with your actual QR */}
//             <div className="w-48 h-48 bg-black flex items-center justify-center">
//               <div className="w-44 h-44 bg-white flex items-center justify-center">
//                 <div className="grid grid-cols-8 gap-1">
//                   {Array.from({ length: 64 }).map((_, i) => (
//                     <div 
//                       key={i} 
//                       className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <h2 className="text-xl font-semibold text-gray-800 mb-2">Scan QR Code</h2>
//           <p className="text-gray-600 text-center text-sm">
//             Scan this code with your phone to connect
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (currentView === 'camera') {
//     return (
//       <div className="w-full h-full bg-black flex flex-col">
//         {/* Camera Header */}
//         <div className="flex items-center justify-between px-4 pt-16 pb-4 bg-black/50 absolute top-0 left-0 right-0 z-10">
//           <button onClick={goHome} className="text-white">
//             <ArrowLeft className="w-6 h-6" />
//           </button>
//           <h1 className="text-white text-lg font-semibold">Camera</h1>
//           <div></div>
//         </div>
        
//         {/* Camera View */}
//         <div className="flex-1 relative">
//           {cameraStream ? (
//             <video
//               ref={(video) => {
//                 if (video && cameraStream) {
//                   video.srcObject = cameraStream;
//                   video.play();
//                 }
//               }}
//               className="w-full h-full object-cover"
//               autoPlay
//               playsInline
//               muted
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center bg-gray-900">
//               <div className="text-center">
//                 <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <p className="text-white">Camera access not available</p>
//                 <p className="text-gray-400 text-sm">Please allow camera permissions</p>
//               </div>
//             </div>
//           )}
//         </div>
        
//         {/* Camera Controls */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
//           <div className="w-16 h-16 bg-white rounded-full border-4 border-gray-300"></div>
//         </div>
//       </div>
//     );
//   }

//   if (currentView === 'maps') {
//     return (
//       <div className="w-full h-full bg-blue-100 flex flex-col">
//         {/* Maps Header */}
//         <div className="flex items-center justify-between px-4 pt-16 pb-4 bg-white shadow-sm">
//           <button onClick={goHome} className="text-blue-600">
//             <ArrowLeft className="w-6 h-6" />
//           </button>
//           <h1 className="text-gray-800 text-lg font-semibold">Maps</h1>
//           <div></div>
//         </div>
        
//         {/* Map View */}
//         <div className="flex-1 relative bg-green-200">
//           {/* Simplified map representation */}
//           <div className="w-full h-full relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-green-500"></div>
            
//             {/* Roads */}
//             <div className="absolute top-1/3 left-0 right-0 h-2 bg-gray-400"></div>
//             <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-gray-400"></div>
            
//             {/* Location marker for Dehradun */}
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//               <div className="relative">
//                 <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg" fill="currentColor" />
//                 <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg">
//                   <p className="text-xs font-semibold text-gray-800">Dehradun</p>
//                   <p className="text-xs text-gray-600">Uttarakhand</p>
//                 </div>
//               </div>
//             </div>
            
//             {/* Map elements */}
//             <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded"></div>
//             <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-yellow-400 rounded"></div>
//             <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-red-400 rounded"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div 
//       className="w-full h-full relative overflow-hidden"
//       style={{
//         backgroundImage: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
//         borderRadius: '55px'
//       }}
//     >
//       {/* Status Bar */}
//       <div className="flex justify-between items-center px-6 sm:px-8 pt-16 pb-4">
//         <div className="text-white text-sm font-semibold">
//           {formatTime(currentTime)}
//         </div>
//         <div className="flex items-center space-x-1">
//           <div className="flex space-x-1">
//             <div className="w-1 h-1 bg-white rounded-full"></div>
//             <div className="w-1 h-1 bg-white rounded-full"></div>
//             <div className="w-1 h-1 bg-white rounded-full"></div>
//             <div className="w-1 h-1 bg-white rounded-full"></div>
//           </div>
//           <div className="w-6 h-3 border border-white rounded-sm ml-2">
//             <div className="w-full h-full bg-white rounded-sm"></div>
//           </div>
//         </div>
//       </div>

//       {/* Time Widget */}
//       <div className="text-center mb-6 sm:mb-8">
//         <div className="text-white text-5xl sm:text-7xl font-thin mb-2 tracking-tight">
//           {formatTime(currentTime)}
//         </div>
//         <div className="text-white text-base sm:text-lg font-medium opacity-90">
//           {formatDate(currentTime)}
//         </div>
//       </div>

//       {/* App Grid */}
//       <div className="px-6 sm:px-8 space-y-6 sm:space-y-8">
//         {/* Top Row - Camera, WhatsApp, Maps */}
//         <div className="grid grid-cols-3 gap-4 sm:gap-6 justify-items-center">
//           <AppIcon 
//             icon={Camera} 
//             label="Camera" 
//             gradient="bg-gradient-to-br from-gray-600 to-gray-800"
//             onClick={openCamera}
//           />
//           <AppIcon 
//             icon={MessageCircle} 
//             label="WhatsApp" 
//             gradient="bg-gradient-to-br from-green-400 to-green-600"
//             onClick={openWhatsApp}
//           />
//           <AppIcon 
//             icon={MapPin} 
//             label="Maps" 
//             gradient="bg-gradient-to-br from-green-500 to-green-700"
//             onClick={openMaps}
//           />
//         </div>

//         {/* Calendar Widget */}
//         <div className="bg-white/20 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 mx-auto max-w-sm border border-white/10">
//           <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
//             <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-[22%] flex items-center justify-center shadow-lg">
//               <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={1.5} />
//             </div>
//             <div>
//               <h3 className="text-white font-semibold text-base sm:text-lg">Calendar</h3>
//               <p className="text-white/80 text-xs sm:text-sm">{formatDate(currentTime)}</p>
//             </div>
//           </div>
//           <div className="space-y-2 sm:space-y-3">
//             <div className="text-white text-xs sm:text-sm">
//               <div className="flex justify-between items-center py-2 px-3 bg-white/10 rounded-xl">
//                 <span className="font-medium">Team Meeting</span>
//                 <span className="text-white/70">10:00 AM</span>
//               </div>
//             </div>
//             <div className="text-white text-xs sm:text-sm">
//               <div className="flex justify-between items-center py-2 px-3 bg-white/10 rounded-xl">
//                 <span className="font-medium">Lunch Break</span>
//                 <span className="text-white/70">12:30 PM</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Connect with me heading */}
//         <div className="text-center">
//           <h2 className="text-white text-lg sm:text-xl font-semibold">Connect with me</h2>
//         </div>
//       </div>

//       {/* Dock with Social Media Apps */}
//       <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
//         <div className="bg-white/30 backdrop-blur-md rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-3 sm:py-4 border border-white/20">
//           <div className="flex space-x-3 sm:space-x-6">
//             <DockIcon 
//               icon={Instagram} 
//               gradient="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400"
//               href="https://instagram.com"
//             />
//             <DockIcon 
//               icon={Linkedin} 
//               gradient="bg-gradient-to-br from-blue-600 to-blue-800"
//               href="https://linkedin.com"
//             />
//             <DockIcon 
//               icon={Github} 
//               gradient="bg-gradient-to-br from-gray-800 to-black"
//               href="https://github.com"
//             />
//             <DockIcon 
//               icon={Twitter} 
//               gradient="bg-gradient-to-br from-gray-900 to-black"
//               href="https://x.com"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }