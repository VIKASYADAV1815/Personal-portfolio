"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import LinesDemo from "@/components/lines-demo"
import Instagram from "@/components/kokonutui/instagram.png"
import Twitter from "@/components/kokonutui/twitter.png"
import Youtube from "@/components/kokonutui/youtube.png"
import Linkedin from "@/components/kokonutui/linkedin.png"
import Message from "@/components/kokonutui/messages.png"
import Spotify from "@/components/kokonutui/spotify.png"
import Whatsapp from "@/components/kokonutui/whatsapp.png"
import Github from "@/components/kokonutui/github.png"
import Apple from "@/components/kokonutui/apple.png"
import Photos from "@/components/kokonutui/photos.png"
import Page from "@/app/contact/tech-demo"




import { Send } from 'lucide-react'; // Make sure 'some-library' is correct.
import { motion } from "framer-motion"





const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "", 
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  return (
    <div className="flex flex-col justify-between p-6 bg-[#161616] text-white border border-white/10 rounded-2xl relative">
      <div>
        <h2 className="text-xl font-bold mb-2">FORM</h2>
        <p className="text-slate-300 mb-1 text-sm">Get in Touch</p>
      </div>

      {/* Success Animation */}
      {showSuccess && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl z-10"
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-green-500/20 p-4 rounded-lg backdrop-blur-md border border-green-500/30"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="text-green-400 text-3xl mb-2"
            >
              ✓
            </motion.div>
            <p className="text-white text-sm font-medium">Message Sent Successfully!</p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="mt-2 px-3 py-1 bg-green-500/20 hover:bg-green-500/30 rounded text-xs transition-all"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Error Animation */}
      {showError && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl z-10"
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-red-500/20 p-4 rounded-lg backdrop-blur-md border border-red-500/30"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="text-red-400 text-3xl mb-2"
            >
              ✕
            </motion.div>
            <p className="text-white text-sm font-medium">Failed to send message</p>
            <button 
              onClick={() => setShowError(false)}
              className="mt-2 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded text-xs transition-all"
            >
              Try Again
            </button>
          </motion.div>
        </motion.div>
      )}

      <form onSubmit={async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
          const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              service_id: 'service_dshxrts',
              template_id: 'template_7yo0uss',
              user_id: 'TRpAqBnNCZwvnHBvA',
              template_params: {
                to_email: 'vikas.web365@gmail.com',
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
              }
            }),
          });

          if (response.ok) {
            setShowSuccess(true);
            setFormData({ name: '', email: '', message: '' });
          } else {
            throw new Error('Failed to send message');
          }
        } catch (error) {
          console.error('Error sending message:', error);
          setShowError(true);
        } finally {
          setIsLoading(false);
        }
      }} 
      className="space-y-3 flex-1">
        <Input
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border-0 bg-white/10 text-white placeholder:text-slate-400 focus:bg-white/20 h-10"
          required
          disabled={isLoading}
        />
        <Input
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border-0 bg-white/10 text-white placeholder:text-slate-400 focus:bg-white/20 h-10"
          required
          disabled={isLoading}
        />
        <Textarea
          placeholder="Tell us about your project..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="border-0 bg-white/10 text-white placeholder:text-slate-400 resize-none focus:bg-white/20"
          rows={3}
          required
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          className="w-full bg-white text-slate-900 hover:bg-slate-100 h-10 transition-all duration-300 relative"
          disabled={isLoading}
        >
          {isLoading ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full"
            />
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  )
}

const IPhoneMockup = () => {
  const socialApps = [
    { icon: Instagram, color: "bg-gradient-to-br from-purple-500 to-pink-500", name: "Instagram" },
    { icon: Twitter, color: "bg-blue-400", name: "Twitter" },
    { icon: Youtube, color: "bg-red-500", name: "YouTube" },
    { icon: Linkedin, color: "bg-blue-600", name: "LinkedIn" },
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 bg-[#161616] border-white/10 text-white ">
      <div className="relative">
        {/* iPhone 15 Frame */}
        <div className="w-[230px] h-[460px] bg-[#2c2c2c] rounded-[40px] relative overflow-hidden shadow-xl shadow-black/50 hover:shadow-2xl hover:shadow-black/60 transition-shadow duration-300">
          {/* Screen bezel */}
          <div className="absolute inset-1 bg-black rounded-[37px]">
            {/* Screen area */}
            <div className="absolute inset-1 bg-black rounded-[32px] border border-[#1a1a1a]">
              
              {/* iOS Interface */}
              <div className="absolute inset-0 overflow-hidden rounded-[33px]">
                <div 
                  className="w-full h-full bg-cover bg-center "
                  style={{
                    backgroundImage: `url('https://blogger.googleusercontent.com/img/a/AVvXsEjCzUpPGWpB4iivZlGO7WE_v3ZGrdd9Ru4YoVBcTGCYvxN4fokHnb9cfxfkec5H3SXtu7dyKXo6EzrxWXA4CVAsS04EINfSNoEfQYdvA-ICJ_i-BlRBcZHSizGBzFF9XaY-i7OFp7emCrtdZq7IgcOtb3MSPjJB8RcxwrFIYtSd0boOivV5NalcPrfyf9E=s0')`
                  }}
                >
                  {/* Rest of the code remains exactly the same */}
                  {/* Content Area (adjusted to account for Dynamic Island) */}
                  <div className="pt-8 px-3">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center text-white text-[10px] mb-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                      <span className="animate-pulse">{new Date().toLocaleTimeString()}</span>
                    </div>

                    {/* Large Clock Display */}
                    <div className="mt-4 text-center">
                      <div className="text-3xl font-bold text-green-200 mb-2">
                        {new Date().toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </div>
                      <div className="text-sm mt-2 animate-gradient bg-gradient-to-r from-[#d4f404] via-[#4ade80] to-[#d4f404] bg-clip-text text-transparent bg-300% font-medium">
                        social media
                      </div>
                      <style jsx>{`
                        @keyframes gradient {
                          0% { background-position: 0% center }
                          100% { background-position: -200% center }
                        }
                        .animate-gradient {
                          animation: gradient 3s linear infinite;
                        }
                        .bg-300\% {
                          background-size: 300% 100%;
                        }
                      `}</style>
                    </div>

                    {/* App Grid */}
                    <div className="grid grid-cols-4 gap-4 mt-6">
                      {/* Rest of the app grid code remains exactly the same */}
                      {[
                        { icon: Instagram, label: "Instagram", color: "from-pink-500 to-purple-500", link: "https://www.instagram.com/vikasthatics/profilecard/?igsh=azU1eXhlMWJoZGZ4", embedLink: "https://www.instagram.com/vikasthatics/embed", imageUrl: "https://i.postimg.cc/dt2GkRL9/insta.jpg" },
                          { icon: Twitter, label: "Twitter", link: "https://www.instagram.com/vikasthatics/profilecard/?igsh=azU1eXhlMWJoZGZ4", embedLink: "https://www.instagram.com/vikasthatics/embed", imageUrl: "https://i.postimg.cc/tgKsBNmV/x.jpg" },
                        { icon: Youtube, label: "YouTube", color: "from-red-500 to-red-700", link: "https://youtube.com", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Virat_Kohli_in_PMO_New_Delhi.jpg" },
                        { icon: Linkedin, label: "LinkedIn", color: "from-blue-500 to-blue-700", link: "https://www.linkedin.com/in/vikas-yadav-4510242a4/", imageUrl: "https://i.postimg.cc/yxjYCMs2/linkedin.jpg" },
                        { icon: Message, label: "Message", color: "from-green-500 to-green-700", link: "mailto:example@email.com", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Virat_Kohli_in_PMO_New_Delhi.jpg" },
                        { icon: Spotify, label: "Spotify", color: "from-gray-600 to-gray-800", link: "#", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Virat_Kohli_in_PMO_New_Delhi.jpg" },
                        { icon: Apple, label: "Map", color: "from-gray-600 to-gray-800", link: "https://www.google.com/maps/place/Clement+Town,+Dehradun,+Uttarakhand/@30.2683118,77.9998997,8120m/data=!3m1!1e3!4m6!3m5!1s0x39092befa7608ead:0xe723fed2168f7a8d!8m2!3d30.2685607!4d78.0071039!16zL20vMGYxOXB2?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3Dhttps://earth.google.com/web/search/Dehradun,+Uttarakhand/@30.3287811,77.99509686,663.32280211a,23187.39847794d,35y,-120.33053138h,59.86845619t,0r/data=CiwiJgokCaL7xdUx2D5AEa5tC-1Tnj5AGWFzeTD2lFNAIQ2ol6JthFNAQgIIATIpCicKJQohMUJlZEktelI3R3k1MzRZM1p2WEhfNDQ5T2h0YnpYV1UxIAE6AwoBMEICCABKCAjWsa6tBhAB", imageUrl: "https://i.ibb.co/yn7DP5dS/screenrecorder-2025-08-18-00-55-37-806-0-t-Mx8-Ra-OL-1.gif" },
                        { icon: Photos, label: "Photos", color: "from-gray-600 to-gray-800", link: "#", imageUrl: "hhttps://i.pinimg.com/736x/71/48/83/71488314b1c64cb117a94d44b2686b2e.jpg" }
                      ].map((app, i) => (
                        // Rest of the mapping code remains exactly the same
                        <motion.div 
                          key={i}
                          className="flex flex-col items-center cursor-pointer relative group"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          onClick={(e) => {
                            // Click handler code remains exactly the same
                            e.preventDefault();
                            const screenArea = document.querySelector('.bg-cover.bg-center');
                            if (screenArea && app.imageUrl) {
                              screenArea.innerHTML = '';
                              
                              const container = document.createElement('div');
                              container.className = 'relative w-full h-full';
                              
                              const img = document.createElement('img');
                              img.src = app.imageUrl;
                              img.className = 'w-full h-full object-cover rounded-[33px]';
                              container.appendChild(img);
                              
                              const buttonContainer = document.createElement('div');
                              buttonContainer.className = 'absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex gap-2 cursor-pointer';

                              const backButton = document.createElement('button');
                              backButton.className = 'flex items-center h-8 px-3 bg-white/10 backdrop-blur-md text-white text-xs border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer rounded-[12px]';
                              backButton.innerHTML = '<svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" cursor-pointer stroke-width="2" d="M15 19l-7-7 7-7"/></svg>Back';
                              backButton.onclick = (e) => {
                                e.stopPropagation();
                                window.location.reload();
                              };
                              
                              const visitButton = document.createElement('button');
                              visitButton.className = 'flex items-center h-8 px-3 bg-black/30 backdrop-blur-md text-white text-xs border border-white/20 hover:bg-black/40 transition-all duration-300 cursor-pointer rounded-[12px]';
                              visitButton.innerHTML = 'Visit<svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" cursor-pointer viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>';
                              visitButton.onclick = (e) => {
                                e.stopPropagation();
                                window.open(app.link, '_blank');
                              };
                              
                              buttonContainer.appendChild(backButton);
                              buttonContainer.appendChild(visitButton);
                              container.appendChild(buttonContainer);
                              
                              screenArea.appendChild(container);
                            }
                          }}
                        >
                          {/* Rest of the component structure remains exactly the same */}
                          <div className="relative">
                            <div className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300`}></div>
                            <img 
                              src={app.icon.src}
                              alt={app.label}
                              className="w-8 h-8 mb-1 object-contain relative z-10 transition-transform duration-300 group-hover:transform group-hover:brightness-110"
                            />
                          </div>
                          <span className="text-white text-[8px] opacity-70 group-hover:opacity-100 transition-opacity duration-300">{app.label}</span>
                          
                          {/* Hover glow effect */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-all duration-300"></div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Calendar Widget */}
                    <div className="mt-4 bg-white/10 backdrop-blur-md rounded-xl p-3">
                      <div className="text-white text-sm font-semibold mb-2">
                        {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-4xl font-bold text-green-400">
                          {new Date().getDate()}
                        </div>
                        <div className="text-right">
                          <div className="text-white/70 text-sm">
                            {new Date().toLocaleString('default', { weekday: 'long' })}
                          </div>
                          <div className="text-white/50 text-xs">
                            {new Date().toLocaleString('default', { month: 'short' })} {new Date().getFullYear()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dock */}
                  <div className="absolute bottom-3 rounded-[12px] left-1/2 transform -translate-x-1/2">
                    <div className="flex items-end space-x-1 bg-white/10 rounded-[12px] backdrop-blur-md p-1">
                       {/* Dock items remain exactly the same */}
                       {[
                         { icon: Instagram, label: "Instagram", color: "from-pink-500 to-purple-500", link: "https://www.instagram.com/vikasthatics/profilecard/?igsh=azU1eXhlMWJoZGZ4", embedLink: "https://www.instagram.com/vikasthatics/embed", imageUrl: "https://i.postimg.cc/dt2GkRL9/insta.jpg" },
                        { icon: Linkedin, label: "LinkedIn", color: "from-blue-500 to-blue-700", link: "https://www.linkedin.com/in/vikas-yadav-4510242a4/", imageUrl: "https://i.postimg.cc/yxjYCMs2/linkedin.jpg" },
                         { icon: Whatsapp, label: "Whatsapp", link: "https://api.whatsapp.com/send?phone=918859996820&text=Hello%20Vikas%20Yadav!", imageUrl: "https://i.postimg.cc/QtSHjZdc/whatsapp.jpg" },
                         { icon: Github, label: "Github", link: "https://github.com/VIKASYADAV1815/vikas.github.io", imageUrl: "https://i.postimg.cc/Qx7hbrZS/Whats-App-Image-2025-08-18-at-11-32-08-04314806.jpg" }
                      ].map((item, i) => (
                        <motion.div 
                          className="relative group transition-all duration-300 ease-in-out cursor-pointer" 
                          key={i}
                          style={{
                            transformOrigin: 'bottom'
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            const screenArea = document.querySelector('.bg-cover.bg-center');
                            if (screenArea && item.imageUrl) {
                              screenArea.innerHTML = '';
                              
                              const container = document.createElement('div');
                              container.className = 'relative w-full h-full';
                              
                              const img = document.createElement('img');
                              img.src = item.imageUrl;
                              img.className = 'w-full h-full object-cover rounded-[33px]';
                              container.appendChild(img);
                              
                              const buttonContainer = document.createElement('div');
                              buttonContainer.className = 'absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex gap-2';
                              
                              const backButton = document.createElement('button');
                              backButton.className = 'flex items-center h-8 px-3 bg-white/10 backdrop-blur-md text-white text-xs border border-white/20 hover:bg-white/20 transition-all duration-300 rounded-[12px]';
                              backButton.innerHTML = '<svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>Back';
                              backButton.onclick = (e) => {
                                e.stopPropagation();
                                window.location.reload();
                              };
                              
                              const visitButton = document.createElement('button');
                              visitButton.className = 'flex items-center h-8 px-3 bg-black/30 backdrop-blur-md text-white text-xs border border-white/20 hover:bg-black/40 transition-all duration-300 rounded-[12px]';
                              visitButton.innerHTML = 'Visit<svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>';
                              visitButton.onclick = (e) => {
                                e.stopPropagation();
                                window.open(item.link, '_blank');
                              };
                              
                              buttonContainer.appendChild(backButton);
                              buttonContainer.appendChild(visitButton);
                              container.appendChild(buttonContainer);
                              
                              screenArea.appendChild(container);
                            }
                          }}
                        >
                          <div className="flex items-center justify-center w-10 h-10 transition-all duration-300 ease-in-out group-hover:scale-[1.8] hover:!scale-100">
                            <img 
                              src={item.icon.src}
                              alt={item.label}
                              className="w-7 h-7 object-contain transition-all duration-300"
                            />
                          </div>
                          {/* Fluid effect elements */}
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="absolute bottom-0 left-0 w-full h-full bg-white/20 rounded-full blur-sm transform scale-x-100 group-hover:scale-x-125 transition-transform duration-300"></div>
                          </div>
                          {/* Neighboring icons scale effect */}
                          <style jsx>{`
                            .group:hover + .group {
                              transform: scale(0.8);
                            }
                            .group:hover + .group + .group {
                              transform: scale(0.8);
                            }
                            .group:has(+ .group:hover) {
                              transform: scale(0.8);
                            }
                            .group:has(+ .group + .group:hover) {
                              transform: scale(0.8);
                            }
                          `}</style>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Island */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[90px] h-[18px] bg-black rounded-full flex items-center justify-between px-4 z-50">
                <div className="w-[40px] h-[4px] bg-[#333] rounded-full"></div>
                <div className="w-[8px] h-[8px] rounded-full bg-[#333]"></div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
// const DigitalClock = () => {
//   const [time, setTime] = useState(new Date())

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTime(new Date())
//     }, 1000)

//     return () => clearInterval(timer)
//   }, [])

//   const formatTime = (date: Date) => {
//     return date.toLocaleTimeString("en-US", {
//       hour12: true,
//       hour: "numeric",
//       minute: "2-digit",
//       second: "2-digit",
//     })
//   }

//   return (
//     <div className="h-full flex flex-col items-center justify-center p-4 bg-[#161616] text-white border border-white/10 rounded-2xl">
//       <div className="text-center">
//         <div className="text-3xl font-mono font-bold text-green-400 tracking-wider">{formatTime(time)}</div>
//       </div>
//     </div>
//   )
// }
const CalendarComponent = () => {
  const [showBookingModal, setShowBookingModal] = useState(false)
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const CalendarDay: React.FC<{ day: number | string; isHeader?: boolean }> = ({ day, isHeader }) => {
    const randomBgIndigo =
      !isHeader && Math.random() < 0.3
        ? "bg-green-400 text-black hover:bg-[#DDFF01]"
        : "text-slate-300 hover:bg-[#DDFF01] hover:text-black"

    const handleDateClick = () => {
      if (!isHeader && typeof day === "number") {
        setShowBookingModal(true)
      }
    }

    return (
      <div
        className={`col-span-1 row-span-1 flex h-6 w-6 items-center justify-center transition-all duration-200 ${
          isHeader ? "" : "rounded-lg cursor-pointer"
        } ${randomBgIndigo}`}
        onClick={handleDateClick}
      >
        <span className={`font-medium ${isHeader ? "text-xs" : "text-xs"}`}>{day}</span>
      </div>
    )
  }

  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString("default", { month: "long" })
  const currentYear = currentDate.getFullYear()
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate()

  const renderCalendarDays = () => {
    const days: React.ReactNode[] = [
      ...dayNames.map((day, i) => <CalendarDay key={`header-${day}`} day={day} isHeader />),
      ...Array(firstDayOfWeek).map((_, i) => (
        <div key={`empty-start-${i}`} className="col-span-1 row-span-1 h-6 w-6" />
      )),
      ...Array(daysInMonth)
        .fill(null)
        .map((_, i) => <CalendarDay key={`date-${i + 1}`} day={i + 1} />),
    ]

    return days
  }

  const handleBookNowClick = () => {
    setShowBookingModal(true)
  }

  const handleWhatsAppBooking = () => {
    const message = "Hi Vikas! I would like to book a call with you. Let's connect!"
    const whatsappUrl = `https://wa.me/918859996820?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    setShowBookingModal(false)
  }

  const handleCalBooking = () => {
    window.open("https://cal.com/vikas-dev-1tsdwd", "_blank")
    setShowBookingModal(false)
  }

  return (
    <>
      <div className="group relative h-full p-4 bg-[#161616] text-white border border-white/10 hover:bg-indigo-100/5 dark:hover:bg-indigo-900/10 hover:border-indigo-400 transition-all duration-300 overflow-hidden rounded-2xl">
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-tl from-indigo-400/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 pointer-events-none"></div>

        {/* Floating arrow icon */}
        <div className="absolute bottom-4 right-4 z-20 flex h-8 w-8 rotate-6 items-center justify-center rounded-full bg-[#DDFF01] cursor-pointer opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-[-4px] group-hover:rotate-0 group-hover:opacity-100">
          <svg className="h-4 w-4 text-black" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.25 15.25V6.75H8.75"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 7L6.75 17.25"
            ></path>
          </svg>
        </div>

        <div className="relative z-10 h-full flex flex-col">
          <div className="mb-3">
            <p className="text-lg text-slate-300 mb-1">Any questions about Design?</p>
            <p className="text-xs text-slate-500 mb-2">Feel free to reach out to me!</p>
            <Button
              onClick={handleBookNowClick}
              className="bg-green-400 hover:bg-green-300 cursor-pointer hover:bg-green-500 text-black text-xs px-3 py-1 h-7 rounded-lg transition-colors"
            >
              Book Now
            </Button>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="rounded-xl border border-white/10 p-3 transition-colors duration-300 group-hover:border-bg-[#DDFF01]">
              <div className="rounded-lg border border-white/5 p-2 bg-white/5">
                <div className="flex items-center space-x-2 mb-3">
                  <p className="text-sm font-medium">
                    {currentMonth}, {currentYear}
                  </p>
                  <span className="h-1 w-1 rounded-full bg-slate-400">&nbsp;</span>
                  <p className="text-xs text-slate-400">5 min call</p>
                </div>
                <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glassmorphic booking modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setShowBookingModal(false)} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-black/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            {/* Glassmorphic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-black/20 to-black/30 rounded-3xl pointer-events-none" />

            <div className="relative z-10 text-center">
              {/* Heading */}
              <h2 className="text-2xl font-bold text-white mb-2">How do you want to connect with Vikas...!</h2>
              <p className="text-slate-300 mb-8 text-sm">Choose your preferred way to book a call</p>

              {/* Buttons */}
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppBooking}
                  className="w-full bg-green-600/80 hover:bg-green-500/90 border border-green-400/50 hover:border-green-400/70 text-white py-4 px-6 rounded-2xl transition-all duration-300 backdrop-blur-sm flex items-center justify-center space-x-3 font-medium shadow-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  <span>WhatsApp Message</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCalBooking}
                  className="w-full bg-indigo-600/80 hover:bg-indigo-500/90 border border-indigo-400/50 hover:border-indigo-400/70 text-white py-4 px-6 rounded-2xl transition-all duration-300 backdrop-blur-sm flex items-center justify-center space-x-3 font-medium shadow-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Cal.com Booking</span>
                </motion.button>
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowBookingModal(false)}
                className="absolute -top-3 -right-3 text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
const ParaComponent = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet/dist/leaflet.js';
      script.onload = () => {
        const L = window.L;
        const centerLat = 30.2685607 - 0.015;
        const centerLng = 78.0071039;
        
        const zoom = window.innerWidth < 768 ? 10: 13;
        
        const map = L.map('map', {
          attributionControl: false,
          zoomControl: false,
          center: [centerLat, centerLng],
          zoom: zoom,
          dragging: !L.Browser.mobile,
          tap: !L.Browser.mobile
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: ''
        }).addTo(map);

        const pulsingIcon = L.divIcon({
          className: 'custom-pulsing-marker',
          html: '<div class="pulse"><div class="pulse-inner"></div><div class="location-dot"></div></div>',
          iconSize: [30, 30]
        });

        const markerLat = 30.2685607;
        const markerLng = 78.0071039;

        const marker = L.marker([markerLat, markerLng], {
          icon: pulsingIcon
        }).addTo(map);

        const locationLabel = L.divIcon({
          className: 'location-label',
          html: '<div class="label-content cursor-pointer" style="color:rgb(29, 247, 225); display: flex; align-items: center; gap: 12px;"><div class="blink-dot-wrapper" style="position: relative; width: 24px; height: 24px;"><span class="outer-circle" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 28px; height: 28px; border: 1px solid rgba(134, 210, 27, 0.2); border-radius: 50%; animation: pulseOuterCircle 2s ease-in-out infinite;"></span><span class="inner-circle" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 24px; height: 24px; border: 1px solid rgba(56, 234, 16, 0.3); border-radius: 50%; animation: pulseInnerCircle 2s ease-in-out infinite;"></span><span class="blink-dot" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color:rgb(234, 220, 16); font-size: 24px; animation: blinkAndPulse 2s ease-in-out infinite;">•</span></div><span>Clement Town, Dehradun</span></div><style>@keyframes blinkAndPulse { 0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.8); } } @keyframes pulseInnerCircle { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 50% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.5; } } @keyframes pulseOuterCircle { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; } 50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.2; } }</style>',
          iconSize: [200, 30],
          iconAnchor: [100, -20]
        });

        const labelMarker = L.marker([markerLat, markerLng], {
          icon: locationLabel,
          interactive: true
        }).addTo(map);

        map.panTo([centerLat, centerLng]);

        const handleResize = () => {
          const newZoom = window.innerWidth < 768 ? 7 : 13;
          map.setZoom(newZoom);
          map.panTo([centerLat, centerLng]);
        };

        window.addEventListener('resize', handleResize);

        const handleLocationClick = () => {
          map.flyTo([markerLat, markerLng], 16, {
            duration: 2,
            easeLinearity: 0.25
          });

          setTimeout(() => {
            window.open('https://www.google.com/maps/place/Clement+Town,+Dehradun,+Uttarakhand', '_blank');
          }, 2000);
        };

        marker.on('click', handleLocationClick);
        labelMarker.on('click', handleLocationClick);

        // Add click handler for text element
        document.querySelector('.text-white/80')?.addEventListener('click', handleLocationClick);

        return () => {
          window.removeEventListener('resize', handleResize);
          document.querySelector('.text-white/80')?.removeEventListener('click', handleLocationClick);
          map.remove();
        };
      };
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="bg-[#121315] relative h-[300px] md:h-full flex flex-col overflow-hidden rounded-2xl border border-white/10">
      <style jsx>{`
        .custom-pulsing-marker {
          position: relative;
        }
        .pulse {
          width: 30px;
          height: 30px;
          position: relative;
          cursor: pointer;
        }
        .pulse-inner {
          position: absolute;
          width: 100%;
          height: 100%;
          background: #4ade80;
          border-radius: 50%;
          animation: pulse 1.5s ease-in-out infinite;
        }
        .location-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          background: #DDFF01;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: dot-blink 1s ease-in-out infinite;
        }
        .pulse:before, .pulse:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: #DDFF01;
          border-radius: 50%;
          animation: pulse-ring 2s ease-out infinite;
        }
        .pulse:after {
          animation-delay: 0.5s;
        }
        .location-label {
          background: transparent;
        }
        .label-content {
          background: rgba(74, 222, 128, 0.2);
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: bold;
          text-align: center;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(74, 222, 128, 0.3);
          transform: translateY(20px);
          animation: float 2s ease-in-out infinite;
          cursor: pointer;
        }
        .blink-dot {
          display: inline-block;
          animation: dot-blink 1s ease-in-out infinite;
          margin-right: 4px;
        }
        @keyframes dot-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(20px); }
          50% { transform: translateY(25px); }
        }
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.9; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.9; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.3); opacity: 0.9; }
          100% { transform: scale(3); opacity: 0; }
        }
        .marker-clicked .pulse-inner {
          animation: marker-click 1s ease-out;
        }
        @keyframes marker-click {
          0% { transform: scale(1); }
          50% { transform: scale(1.5); }
          100% { transform: scale(1); }
        }
      `}</style>

      <div id="map" className="relative w-full h-full z-0"></div>

      <div className="absolute bottom-0 md:bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 md:p-6 z-10 sm:translate-y-[-20%] md:translate-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-2 md:w-3 h-2 md:h-3 bg-green-400 rounded-full animate-[pulse_1.5s_ease-in-out_infinite]"></div>
          <h3 className="text-white font-bold text-lg md:text-xl tracking-wide">
            Live Location
          </h3>
        </div>
        
        <p className="text-white/80 text-xs md:text-sm mt-2 font-medium cursor-pointer hover:text-white transition-colors">
          <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-[pulse_1.5s_ease-in-out_infinite] mr-2"></span>
          Clement Town, Dehradun - <i>The Beautiful Valley City of India...</i>
        </p>
        
        <div className="flex flex-wrap gap-2 md:gap-3 mt-3 md:mt-4">
          <div className="bg-black/60 backdrop-blur-sm px-3 md:px-4 py-1 md:py-2 rounded-xl border border-white/20">
            <span className="text-green-400 text-[10px] md:text-xs font-medium">LATITUDE</span>
            <p className="text-white text-sm md:text-base font-bold">30.2685° N</p>
          </div>
          
          <div className="bg-black/60 backdrop-blur-sm px-3 md:px-4 py-1 md:py-2 rounded-xl border border-white/20">
            <span className="text-green-400 text-[10px] md:text-xs font-medium">LONGITUDE</span>
            <p className="text-white text-sm md:text-base font-bold">78.0071° E</p>
          </div>
          
          <div className="bg-black/60 backdrop-blur-sm px-3 md:px-4 py-1 md:py-2 rounded-xl border border-white/20">
            <span className="text-green-400 text-[10px] md:text-xs font-medium">ELEVATION</span>
            <p className="text-white text-sm md:text-base font-bold">640m</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TechStackComponent = () => {
  return (
    <div className="h-full p-4 bg-[#161616] text-white border border-white/10 rounded-2xl">
      <div className="h-full flex flex-col">
        <div className="mb-3">
          <h3 className="text-lg font-bold"> MY TOP TECH STACKS</h3>
          <p className="text-xs text-slate-400"> FROM LAST 1 YR</p>
        </div>
        <LinesDemo/>
      </div>
    </div>
  )
}

export default function BentoGrid() {
  return (
    <div className="min-h-screen bg-[#121315] p-2 pb-6">
      <div className="max-w-6xl mx-auto h-full md:h-screen pt-30">
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-9 gap-3 h-full">
          <div className="col-span-1 md:col-start-1 md:col-span-4 md:row-start-1 md:row-span-4 overflow-hidden rounded-2xl min-h-[400px] md:min-h-[600px]">
            <ContactForm />
          </div>
          <div className="col-span-1 md:col-start-1 md:col-span-4 md:row-start-6 overflow-hidden rounded-2xl min-h-[300px] md:min-h-[410px] flex flex-col flex-1">
            <TechStackComponent />
          </div>
          <div className="col-span-1 md:col-start-5 md:col-span-4 md:row-start-1 border-white/10 md:row-span-5 rounded-xl bg-[#161616] overflow-hidden rounded-4xl min-h-[360px] md:min-h-[495px] border border-white/10 flex flex-col flex-1">
            <IPhoneMockup />
          </div>
          <div className="col-span-1 md:col-start-9 md:col-span-4 md:row-start-1 md:row-span-3 overflow-hidden rounded-2xl min-h-[280px] md:min-h-[350px]">
            <CalendarComponent />
          </div>
          <div className="col-span-1 mt-1 md:col-start-9 md:col-span-5 md:row-start-6 border border-white/10 overflow-hidden rounded-2xl min-h-[120px] md:min-h-[140px] flex flex-col flex-1 pt-2 pb-3 md:mr-2 bg-[#161616]">
            <div className="md:hidden lg:hidden mt-2 z-10">
              <h1 className="text-2xl font-bold text-white text-center mb-3">TECH STACK</h1>
              <p className="text-lg text-green-400 text-center">for last 1+ year</p>
            </div>
            <Page />
          </div>
          <div className="col-span-1 mt-2 md:col-start-5 md:col-span-8 md:row-start-8 md:row-span-2 border border-white/10 overflow-hidden rounded-2xl min-h-[300px] md:min-h-[270px]">
            <ParaComponent />
          </div>
        </div>
      </div>
    </div>
  )
}
