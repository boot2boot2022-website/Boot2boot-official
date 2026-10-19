import React, { useState, useRef, useEffect } from 'react';
import {
  VerifiedBadge,
  HeartIcon,
  CommentIcon,
  RepostIcon,
  ShareIcon,
  BookmarkIcon,
  MoreDotsIcon,
  AudioMuteIcon,
  AudioUnmuteIcon,
} from '../social-svg';
import boot2bootLogo from '../../assets/boot2boot-logo/boot2boot-logo.png';
import { saiPalace } from '../../assets/workVideoAssest';

export default function InstagramCard({
  username = "boot2boot",
  isVerified = true,
  avatarUrl,
  avatar,
  logo,
  companyLogo,
  timeAgo = "13h",
  videoUrl,
  video = null,
  posterUrl = "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80",
  mediaUrl,
  emptySlot = false,
  initialLikes = "1.7M",
  initialComments = "11K",
  initialReposts = "3.4K",
  caption = "Chhoti si chhutti toh banti hai na ??? ✨🎥",
  translatedCaption = "A little vacation is definitely well deserved, isn't it ??? ✨🎥",
  mediaSlotRef = null,
  className = "",
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isReposted, setIsReposted] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const displayVideo =
    video ||
    videoUrl ||
    (typeof mediaUrl === "string" &&
      (mediaUrl.endsWith(".mp4") ||
        mediaUrl.endsWith(".webm") ||
        mediaUrl.includes("video"))
      ? mediaUrl
      : null);
  const displayImage = mediaUrl || posterUrl;
  const displayAvatar = avatar || avatarUrl || logo || companyLogo || boot2bootLogo;

  useEffect(() => {
    if (videoRef.current && displayVideo && !emptySlot) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch(() => {});
    }
  }, [displayVideo, emptySlot, isMuted]);

  const triggerHeartAnimation = () => {
    setShowHeartAnim(true);
    setTimeout(() => {
      setShowHeartAnim(false);
    }, 900);
  };

  const toggleLike = () => {
    if (!isLiked) {
      triggerHeartAnimation();
    }
    setIsLiked(!isLiked);
  };

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      if (!nextMuted) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <div className={`w-full max-w-[340px] sm:max-w-[360px] h-[520px] flex flex-col justify-between mx-auto bg-white text-[#262626] font-sans border border-neutral-200 rounded-2xl overflow-hidden relative ${className}`}>
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-neutral-100 shrink-0">
        <div className="flex items-center gap-2.5">
          {/* Instagram Story Gradient Ring */}
          <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] cursor-pointer hover:scale-105 transition-transform">
            <div className="bg-white p-[1.5px] rounded-full flex items-center justify-center overflow-hidden">
              {typeof displayAvatar === "string" ? (
                <img
                  src={displayAvatar}
                  alt={username}
                  className="w-8 h-8 rounded-full object-contain p-[1px] bg-white"
                  onError={(e) => {
                    e.currentTarget.src = boot2bootLogo;
                  }}
                />
              ) : (
                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden bg-neutral-100">
                  {displayAvatar}
                </div>
              )}
            </div>
          </div>

          {/* Username & Metadata */}
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-semibold text-sm hover:opacity-80 cursor-pointer tracking-tight text-[#262626]">
              {username}
            </span>
            {isVerified && <VerifiedBadge className="w-3.5 h-3.5 ml-0.5" />}
            <span className="text-neutral-400 text-xs mx-0.5">•</span>
            <span className="text-neutral-500 text-xs font-normal">{timeAgo}</span>
          </div>
        </div>

        {/* Static 3 dots */}
        <div className="p-1 text-neutral-400 pointer-events-none select-none" aria-hidden="true">
          <MoreDotsIcon className="w-5 h-5" />
        </div>
      </div>

      {/* 2. Main Media Container */}
      <div
        ref={(node) => {
          if (mediaSlotRef) {
            if (typeof mediaSlotRef === 'function') mediaSlotRef(node);
            else mediaSlotRef.current = node;
          }
        }}
        onClick={toggleLike}
        className="w-full flex-1 min-h-0 overflow-hidden relative bg-[#f0f0f3] cursor-pointer border-y border-neutral-200 flex items-center justify-center group"
      >
        {/* Sleek lightgray placeholder revealed when card is empty / photo is in flight */}
        <div className="absolute inset-0 bg-[#ebebef] flex flex-col items-center justify-center text-neutral-400 select-none pointer-events-none p-4">
          <div className="w-12 h-12 rounded-2xl bg-white/80 border border-neutral-300/80 flex items-center justify-center mb-2.5 shadow-xs">
            <img
              src={boot2bootLogo}
              alt="Boot2Boot Logo"
              className="w-6 h-6 object-contain opacity-70"
            />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase text-neutral-500 font-parkinsans">
            boot2boot
          </span>
        </div>

        {!emptySlot && (
          displayVideo ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                src={displayVideo}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
              />
              {/* Instagram Audio Mute/Unmute Button */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-md flex items-center justify-center text-white shadow-md transition-all duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer border border-white/15"
              >
                {isMuted ? (
                  <AudioMuteIcon className="w-4 h-4" />
                ) : (
                  <AudioUnmuteIcon className="w-4 h-4" />
                )}
              </button>
            </div>
          ) : displayImage ? (
            <img
              src={displayImage}
              alt="Instagram post media"
              className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
            />
          ) : null
        )}

        {/* Big Heart Animation on Double Tap */}
        {showHeartAnim && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <div className="animate-ping duration-500 scale-125 drop-shadow-[0_10px_25px_rgba(255,48,64,0.6)]">
              <svg className="w-24 h-24 text-[#FF3040] fill-[#FF3040] drop-shadow-2xl" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* 3. Action Bar */}
      <div className="px-3.5 pt-3 pb-1">
        <div className="flex items-center justify-between">
          {/* Left Action Buttons with Counts */}
          <div className="flex items-center gap-4">
            {/* Like */}
            <button
              onClick={toggleLike}
              className="flex items-center gap-1.5 text-sm font-semibold hover:opacity-80 transition cursor-pointer"
            >
              <HeartIcon filled={isLiked} className="w-6 h-6" />
              <span className="text-[13.5px] font-medium tracking-tight text-[#262626]">
                {isLiked ? "1.7M" : initialLikes}
              </span>
            </button>

            {/* Comment */}
            <button
              className="flex items-center gap-1.5 text-sm font-semibold hover:opacity-80 transition cursor-pointer"
            >
              <CommentIcon className="w-6 h-6" />
              <span className="text-[13.5px] font-medium tracking-tight text-[#262626]">
                {initialComments}
              </span>
            </button>

            {/* Repost */}
            <button
              onClick={() => setIsReposted(!isReposted)}
              className={`flex items-center gap-1.5 text-sm font-semibold transition cursor-pointer ${isReposted ? "text-[#0095f6]" : "text-[#262626] hover:opacity-80"
                }`}
            >
              <RepostIcon className="w-6 h-6" />
              <span className="text-[13.5px] font-medium tracking-tight text-[#262626]">
                {initialReposts}
              </span>
            </button>

            {/* Share / DM */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: username, text: caption, url: window.location.href });
                }
              }}
              className="hover:opacity-80 transition cursor-pointer"
              aria-label="Share post"
            >
              <ShareIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Right Save / Bookmark Button */}
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="hover:opacity-80 transition cursor-pointer p-0.5"
            aria-label="Save post"
          >
            <BookmarkIcon filled={isSaved} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 4. Details / Comments */}
      <div className="px-3.5 pt-0.5 pb-2.5 text-sm">
        <span
          className="text-[12px] font-medium text-neutral-500 hover:text-black transition-colors cursor-pointer block"
        >
          View all {initialComments} comments
        </span>
      </div>
    </div>
  );
}
