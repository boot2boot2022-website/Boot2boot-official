import React, { useState } from 'react';
import {
  VerifiedBadge,
  HeartIcon,
  CommentIcon,
  RepostIcon,
  XShareIcon,
  BookmarkIcon,
  MoreDotsIcon,
  ChartIcon,
} from '../social-svg';
import boot2bootLogo from '../../assets/boot2boot-logo/boot2boot-logo.png';

export default function XPostCard({
  username = "Boot2Boot",
  handle = "boot2boot",
  isVerified = true,
  avatarUrl,
  avatar,
  logo,
  companyLogo,
  timeAgo = "Sep 9",
  text = "Man, just found this and honestly, am amazed by fluid 3D card physics! ✨",
  emoji = "🚀",
  imageUrl = "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80",
  initialLikes = 139,
  initialReposts = 24,
  initialReplies = 43,
  initialViews = "2.4K",
  mediaSlotRef = null,
  className = "",
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const displayAvatar = avatar || avatarUrl || logo || companyLogo || boot2bootLogo;

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleRepost = () => {
    setIsReposted(!isReposted);
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  const likesCount = isLiked ? initialLikes + 1 : initialLikes;
  const repostsCount = isReposted ? initialReposts + 1 : initialReposts;

  return (
    <article className={`w-full max-w-[340px] sm:max-w-[360px] h-[520px] flex flex-col justify-between mx-auto bg-white text-[#262626] font-sans border border-neutral-200 rounded-2xl overflow-hidden select-none relative ${className}`}>
      {/* Top Section: Header & Text */}
      <div className="flex flex-col flex-1 min-h-0">
        <div className="p-3.5 pb-2 shrink-0">
          <div className="flex items-start gap-2.5">
            {/* Avatar with subtle hover scale */}
            <div className="relative shrink-0 cursor-pointer hover:scale-105 transition-transform">
              <img
                src={displayAvatar}
                alt={username}
                className="w-9 h-9 rounded-full object-cover border border-neutral-200 bg-neutral-100"
                onError={(e) => {
                  e.currentTarget.src = boot2bootLogo;
                }}
              />
            </div>

            {/* User Metadata */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 min-w-0 leading-tight">
                  <span className="font-semibold text-sm text-[#262626] hover:underline cursor-pointer truncate">
                    {username}
                  </span>
                  {isVerified && <VerifiedBadge className="w-3.5 h-3.5 ml-0.5 inline-block shrink-0" />}
                  <span className="text-neutral-400 text-xs truncate">@{handle}</span>
                  <span className="text-neutral-400 text-xs">·</span>
                  <span className="text-neutral-400 text-xs shrink-0">{timeAgo}</span>
                </div>

                {/* Static 3 dots */}
                <div className="w-7 h-7 -mr-1 -mt-1 flex items-center justify-center text-neutral-400 pointer-events-none select-none" aria-hidden="true">
                  <MoreDotsIcon className="w-4 h-4" />
                </div>
              </div>

              {/* Post Text */}
              <div className="mt-1 text-[13px] leading-snug text-[#262626]">
                <p>{text}</p>
                {emoji && <p className="mt-0.5 text-base">{emoji}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Media Image Frame */}
        <div className="w-full flex-1 min-h-0 overflow-hidden border-y border-neutral-200 relative bg-neutral-900">
          <img
            src={imageUrl}
            alt="X post media"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Action Bar with Tighter Gaps & Alignment */}
      <div className="flex items-center justify-between text-neutral-500 border-t border-neutral-100 py-1.5 px-2 shrink-0">
            {/* Replies / Comments */}
            <button
              className="group flex items-center gap-1 text-neutral-500 hover:text-[#1d9bf0] transition-colors cursor-pointer"
              aria-label="Replies"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center group-hover:bg-[#1d9bf0]/10 transition-colors">
                <CommentIcon className="w-4 h-4" />
              </div>
              <span className="text-[12px] font-medium leading-none">{initialReplies}</span>
            </button>

            {/* Repost / Retweet */}
            <button
              onClick={toggleRepost}
              className={`group flex items-center gap-1 transition-colors cursor-pointer ${isReposted ? "text-[#00ba7c]" : "text-neutral-500 hover:text-[#00ba7c]"
                }`}
              aria-label="Repost"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center group-hover:bg-[#00ba7c]/10 transition-colors">
                <RepostIcon className="w-4 h-4" />
              </div>
              <span className="text-[12px] font-medium leading-none">{repostsCount}</span>
            </button>

            {/* Like */}
            <button
              onClick={toggleLike}
              className={`group flex items-center gap-1 transition-colors cursor-pointer ${isLiked ? "text-[#f91880]" : "text-neutral-500 hover:text-[#f91880]"
                }`}
              aria-label="Like"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center group-hover:bg-[#f91880]/10 transition-colors">
                <HeartIcon filled={isLiked} className="w-4 h-4" />
              </div>
              <span className="text-[12px] font-medium leading-none">{likesCount}</span>
            </button>

            {/* Views / Impressions */}
            <div
              className="group flex items-center gap-1 text-neutral-500 hover:text-[#1d9bf0] transition-colors cursor-default"
              aria-label="Views"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center group-hover:bg-[#1d9bf0]/10 transition-colors">
                <ChartIcon className="w-4 h-4" />
              </div>
              <span className="text-[12px] font-medium leading-none">{initialViews}</span>
            </div>

            {/* Bookmark */}
            <button
              onClick={toggleSave}
              className={`group flex items-center transition-colors cursor-pointer ${isSaved ? "text-[#1d9bf0]" : "text-neutral-500 hover:text-[#1d9bf0]"
                }`}
              aria-label="Bookmark"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center group-hover:bg-[#1d9bf0]/10 transition-colors">
                <BookmarkIcon filled={isSaved} className="w-4 h-4" />
              </div>
            </button>

            {/* Share */}
            <button
              onClick={() => {
                if (typeof navigator !== 'undefined' && navigator.share) {
                  navigator.share({ title: username, text, url: window.location.href }).catch(() => { });
                }
              }}
              className="group flex items-center text-neutral-500 hover:text-[#1d9bf0] transition-colors cursor-pointer"
              aria-label="Share post"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center group-hover:bg-[#1d9bf0]/10 transition-colors">
                <XShareIcon className="w-4 h-4" />
              </div>
            </button>
          </div>
    </article>
  );
}