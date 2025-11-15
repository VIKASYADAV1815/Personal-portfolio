"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, Volume1, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const CustomSlider = ({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) => {
  return (
    <motion.div
      className={cn(
        "relative w-full h-1 bg-white/20 rounded-full cursor-pointer",
        className
      )}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        onChange(Math.min(Math.max(percentage, 0), 100));
      }}
    >
      <motion.div
        className="absolute top-0 left-0 h-full bg-white rounded-full"
        style={{ width: `${value}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </motion.div>
  );
};

type VideoType = "mp4" | "youtube";

const toYouTubeEmbed = (url: string) => {
  try {
    const u = new URL(url);
    // youtu.be/<id>
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }
    // youtube.com/watch?v=<id>
    const v = u.searchParams.get("v");
    if (v) return `https://www.youtube.com/embed/${v}`;
    // already embed
    if (u.pathname.startsWith("/embed/")) return url;
    return url;
  } catch (e) {
    return url;
  }
};
const getYouTubeId = (url: string): string | null => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace("/", "");
    }
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/embed/")) {
        return u.pathname.split("/").pop() || null;
      }
      return u.searchParams.get("v");
    }
    return null;
  } catch {
    return null;
  }
};
const getYouTubeThumb = (url: string): string | undefined => {
  const id = getYouTubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined;
};

export const VideoPlayer = (
  { src, type = "mp4", poster, className, minimal = false, posterTimestamp }: { src: string; type?: VideoType; poster?: string; className?: string; minimal?: boolean; posterTimestamp?: number }
) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState(src);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCenterPlayButton, setShowCenterPlayButton] = useState(true);
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [generatedPoster, setGeneratedPoster] = useState<string | undefined>(undefined);
  const hideControls = () => setShowControls(false);
  const ytId = type === "youtube" ? getYouTubeId(src) : null;
  const ytThumbCandidates = ytId
    ? [
        // Prefer high-quality 1280x720 when available
        `https://img.youtube.com/vi/${ytId}/hq720.jpg`,
        `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`,
        `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
        `https://img.youtube.com/vi/${ytId}/0.jpg`,
        `https://i.ytimg.com/vi/${ytId}/hq720.jpg`,
        `https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg`,
        `https://i.ytimg.com/vi/${ytId}/sddefault.jpg`,
        `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`,
        `https://i.ytimg.com/vi/${ytId}/mqdefault.jpg`,
        `https://i.ytimg.com/vi/${ytId}/default.jpg`,
      ]
    : [];
  const [thumbIndex, setThumbIndex] = useState(0);
  const [usePoster, setUsePoster] = useState(!!poster);
  React.useEffect(() => {
    setUsePoster(!!poster);
    setThumbIndex(0);
  }, [poster, ytId]);

  React.useEffect(() => {
    if (type !== "mp4") return;
    if (poster) return;
    const v = videoRef.current;
    if (!v) return;
    const handleLoaded = () => {
      const ts = typeof posterTimestamp === "number" ? posterTimestamp : 12;
      const target = isFinite(v.duration) ? Math.min(Math.max(0, ts), Math.max(0, v.duration - 0.1)) : ts;
      const handleSeeked = () => {
        const w = v.videoWidth || 1280;
        const h = v.videoHeight || 720;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(v, 0, 0, w, h);
          try {
            const url = canvas.toDataURL("image/jpeg", 0.85);
            setGeneratedPoster(url);
          } catch {}
        }
        try { v.currentTime = 0; } catch {}
        v.removeEventListener("seeked", handleSeeked);
      };
      v.addEventListener("seeked", handleSeeked);
      try { v.currentTime = target; } catch {}
    };
    v.addEventListener("loadedmetadata", handleLoaded);
    return () => {
      v.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, [type, poster, posterTimestamp]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setShowCenterPlayButton(true);
        setShowControls(true);
      } else {
        videoRef.current.play();
        setShowCenterPlayButton(false);
        setShowControls(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number) => {
    if (videoRef.current) {
      const newVolume = value / 100;
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(isFinite(progress) ? progress : 0);
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number) => {
    if (videoRef.current && videoRef.current.duration) {
      const time = (value / 100) * videoRef.current.duration;
      if (isFinite(time)) {
        videoRef.current.currentTime = time;
        setProgress(value);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (!isMuted) {
        setVolume(0);
      } else {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  };

  const setSpeed = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  return (
    <motion.div
      className={cn(
        "relative w-full h-[280px] sm:h-[410px] sm:w-[700px] rounded-lg overflow-hidden bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm",
        className
      )}
      initial={{ y: 0 }}
      animate={{
        y: [0, -20, 0],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onTouchStart={() => setShowControls(true)}
      onTouchEnd={() => {
        // Hide controls shortly after touch when playing
        if (isPlaying) {
          setTimeout(() => setShowControls(false), 1200);
        } else {
          setShowControls(false);
        }
      }}
    >
      {type === "youtube" ? (
        isEmbedded ? (
          <iframe
            className="w-full h-full"
            src={`${toYouTubeEmbed(src)}?rel=0&modestbranding=1&autoplay=1&playsinline=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            className="w-full h-full relative"
            onClick={() => { setIsEmbedded(true); setShowCenterPlayButton(false); hideControls(); }}
          >
            {(() => {
              const candidate = (usePoster && poster) ? poster : ytThumbCandidates[thumbIndex];
              return candidate ? (
                <img
                  src={candidate}
                  alt="Video poster"
                  className="w-full h-full object-cover"
                  onError={() => {
                    if (usePoster) {
                      setUsePoster(false);
                      setThumbIndex(0);
                    } else {
                      setThumbIndex((idx) => (idx + 1 < ytThumbCandidates.length ? idx + 1 : idx));
                    }
                  }}
                  onLoad={(e) => {
                    const w = e.currentTarget.naturalWidth;
                    const h = e.currentTarget.naturalHeight;
                    // If YouTube returns a tiny placeholder (e.g., 120x90), advance to next candidate
                    if (w <= 200 || h <= 120) {
                      if (usePoster) {
                        setUsePoster(false);
                        setThumbIndex(0);
                      } else {
                        setThumbIndex((idx) => (idx + 1 < ytThumbCandidates.length ? idx + 1 : idx));
                      }
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full bg-black/40" />
              );
            })()}
          </button>
        )
      ) : (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
           onTimeUpdate={handleTimeUpdate}
           src={source}
           onClick={togglePlay}
           onPlay={() => { setIsPlaying(true); setShowCenterPlayButton(false); setShowControls(false); }}
           onPause={() => { setIsPlaying(false); setShowCenterPlayButton(true); setShowControls(true); }}
           preload={posterTimestamp ? "auto" : "metadata"}
           playsInline
           onError={() => {
             if (source !== "/videos/hero.mp4") {
               setSource("/videos/hero.mp4");
               setGeneratedPoster(undefined);
             }
           }}
           {...((poster || generatedPoster) ? { poster: poster || generatedPoster } : {})}
         />
      )}

      <AnimatePresence>
        {showCenterPlayButton && (type === "mp4" || (type === "youtube" && !isEmbedded)) && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <Button
              onClick={() => {
                if (type === "mp4") {
                  togglePlay();
                } else {
                  setIsEmbedded(true);
                  setShowCenterPlayButton(false);
                  hideControls();
                }
              }}
              variant="ghost"
              size="icon"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/20"
            >
              <Play className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {!minimal && (
        <AnimatePresence>
          {(showControls || !isPlaying || (type === "youtube" && !isEmbedded)) && (
            <motion.div
              className="absolute bottom-0 mx-auto w-[90%] sm:max-w-lg left-0 right-0 p-2 sm:p-3 m-2 bg-[#11111198] backdrop-blur-md rounded-xl sm:rounded-2xl"
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.4, 
                type: "spring",
                bounce: 0.35
              }}
            >
              <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <span className="text-white text-xs sm:text-sm">
                  {formatTime(currentTime)}
                </span>
                <CustomSlider
                  value={progress}
                  onChange={handleSeek}
                  className="flex-1"
                />
                <span className="text-white text-xs sm:text-sm">{formatTime(duration)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <Button
                      onClick={() => {
                        if (type === "mp4") {
                          togglePlay();
                        } else if (!isEmbedded) {
                          setIsEmbedded(true);
                          setShowCenterPlayButton(false);
                        }
                      }}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 sm:h-10 sm:w-10 text-white hover:bg-[#111111d1] hover:text-white"
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </Button>
                  </motion.div>
                  <div className="flex items-center gap-x-1">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.8 }}
                    >
                      <Button
                        onClick={toggleMute}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 sm:h-10 sm:w-10 text-white hover:bg-[#111111d1] hover:text-white"
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : volume > 0.5 ? (
                          <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <Volume1 className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </Button>
                    </motion.div>

                    <div className="w-16 sm:w-24">
                      <CustomSlider
                        value={volume * 100}
                        onChange={handleVolumeChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 sm:gap-1">
                  {[0.5, 1, 1.5, 2].map((speed) => (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.8 }}
                      key={speed}
                    >
                      <Button
                        onClick={() => setSpeed(speed)}
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "text-white hover:bg-[#111111d1] hover:text-white px-1 sm:px-2 text-xs sm:text-sm h-7 sm:h-8",
                          playbackSpeed === speed && "bg-[#111111d1]"
                        )}
                      >
                        {speed}x
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
};