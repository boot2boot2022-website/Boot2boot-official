import React, { useState } from 'react';
import {
  VerifiedBadge,
  ThumbsUpIcon,
  CommentIcon,
  FacebookShareIcon,
  GlobeIcon,
  MoreDotsIcon,
  BookmarkIcon,
} from '../social-svg';
import boot2bootLogo from '../../assets/boot2boot-logo/boot2boot-logo.png';

export default function FacebookPostCard({
  authorName = "Hotel Sai Palace",
  timeAgo = "2d",
  avatarUrl,
  avatar,
  logo,
  companyLogo,
  isVerified = true,
  postText = "Experience unmatched luxury, comfort, and world-class hospitality at Hotel Sai Palace. Welcoming our valued guests to unforgettable stays! ✨🏨",
  hashtags = ["#HotelSaiPalace", "#LuxuryStay", "#Hospitality", "#DirectBookings"],
  mediaUrl = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
  initialLikes = "24.8K",
  initialComments = "1.2K",
  initialShares = "3.4K",
  mediaSlotRef = null,
  className = "",
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const displayAvatar = avatar || avatarUrl || logo || companyLogo || boot2bootLogo;

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <article className={`w-full max-w-[340px] sm:max-w-[360px] h-[520px] flex flex-col justify-between mx-auto bg-white text-[#262626] font-sans border border-neutral-200 rounded-2xl overflow-hidden select-none relative ${className}`}>
      {/* Top Section: Header, Caption & Media */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* 1. Header */}
        <div className="flex items-center justify-between p-3.5 pb-1.5 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {/* Profile Avatar with subtle hover scale */}
            <div className="relative shrink-0 cursor-pointer hover:scale-105 transition-transform">
              <img
                src={displayAvatar}
                alt={authorName}
                className="w-9 h-9 rounded-full object-cover border border-neutral-200 bg-neutral-100"
                onError={(e) => {
                  e.currentTarget.src = boot2bootLogo;
                }}
              />
            </div>

            {/* Author Name & Metadata */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1 leading-tight flex-wrap">
                <span className="font-semibold text-sm text-[#262626] hover:underline cursor-pointer truncate">
                  {authorName}
                </span>
                {isVerified && <VerifiedBadge className="w-3.5 h-3.5 inline-block shrink-0" />}
              </div>

              <div className="flex items-center gap-1.5 text-[11.5px] text-neutral-500 mt-0.5 leading-none">
                <span>{timeAgo}</span>
                <span>•</span>
                <GlobeIcon className="w-3 h-3 text-neutral-400 inline-block" />
              </div>
            </div>
          </div>

          {/* Static 3 dots */}
          <div className="w-7 h-7 flex items-center justify-center text-neutral-400 -mr-1 pointer-events-none select-none" aria-hidden="true">
            <MoreDotsIcon className="w-4 h-4" />
          </div>
        </div>

        {/* 2. Post Caption / Text */}
        <div className="px-3.5 pt-0.5 pb-2 text-[13px] leading-snug text-[#262626] shrink-0">
          <p>
            {isExpanded ? postText : `${postText.slice(0, 85)}...`}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-1 font-semibold text-neutral-500 hover:text-[#1877f2] hover:underline cursor-pointer inline"
            >
              {isExpanded ? " less" : "See more"}
            </button>
          </p>

          {/* Hashtags */}
          {hashtags && hashtags.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1 text-xs font-medium text-[#1877f2]">
              {hashtags.slice(0, 3).map((tag) => (
                <span key={tag} className="hover:underline cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 3. Media Container */}
        <div className="w-full flex-1 min-h-0 overflow-hidden relative bg-neutral-900 border-y border-neutral-200">
          <img
            src={mediaUrl}
            alt="Facebook post media"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 4. Social Engagement Counters & Actions Pinned Bottom */}
      <div className="shrink-0">
        <div className="flex items-center justify-between px-3.5 py-2 border-t border-neutral-100 text-[11.5px] text-neutral-500">
        {/* Reactions Counter */}
        <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#1877f2] transition-colors">
          <div className="flex items-center -space-x-1">
            <span className="w-4 h-4 rounded-full bg-[#1877f2] text-white text-[9px] flex items-center justify-center font-bold shadow-xs">
              👍
            </span>
            <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-bold shadow-xs">
              ❤️
            </span>
            <span className="w-4 h-4 rounded-full bg-amber-400 text-white text-[9px] flex items-center justify-center font-bold shadow-xs">
              🥰
            </span>
          </div>
          <span className="font-medium text-neutral-600 hover:text-[#1877f2] transition-colors">{initialLikes}</span>
        </div>

        {/* Comments & Shares Counter */}
        <div className="flex items-center gap-2">
          <span className="hover:text-[#1877f2] transition-colors cursor-pointer">
            {initialComments} comments
          </span>
          <span>•</span>
          <span className="hover:text-[#1877f2] transition-colors cursor-pointer">
            {initialShares} shares
          </span>
        </div>
      </div>

      {/* 5. 3 Action Buttons Bar (Like, Comment, Share) */}
      <div className="grid grid-cols-3 px-1 py-1 border-t border-neutral-100">
        {/* Like */}
        <button
          onClick={toggleLike}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            isLiked
              ? "text-[#1877f2] bg-[#1877f2]/10"
              : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
          }`}
        >
          <ThumbsUpIcon filled={isLiked} className={`w-4 h-4 ${isLiked ? "text-[#1877f2]" : "text-neutral-600"}`} />
          <span>Like</span>
        </button>

        {/* Comment */}
        <button
          className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <CommentIcon className="w-4 h-4 text-neutral-600" />
          <span>Comment</span>
        </button>

        {/* Share */}
        <button
          onClick={() => {
            if (typeof navigator !== 'undefined' && navigator.share) {
              navigator.share({ title: authorName, text: postText, url: window.location.href }).catch(() => {});
            }
          }}
          className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <FacebookShareIcon className="w-4 h-4 text-neutral-600" />
          <span>Share</span>
        </button>
      </div>
      </div>
    </article>
  );
}