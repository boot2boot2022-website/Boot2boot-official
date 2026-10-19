import React, { useState } from 'react';
import {
  VerifiedBadge,
  ThumbsUpIcon,
  CommentIcon,
  LinkedInRepostIcon,
  LinkedInSendIcon,
  GlobeIcon,
  MoreDotsIcon,
  CloseIcon,
  BookmarkIcon,
} from '../social-svg';
import boot2bootLogo from '../../assets/boot2boot-logo/boot2boot-logo.png';

export default function LinkedInPost({
  authorName = "Boot2Boot",
  authorSubtitle = "845,210 followers • Digital Growth & Production AI",
  timeAgo = "1d",
  avatarUrl,
  avatar,
  logo,
  companyLogo,
  isVerified = true,
  postText = "Want to become a Production AI Engineer? Here is the complete visual blueprint to master LLMs, RAG, Autonomous Agents, and Scalable Serving Systems.",
  hashtags = ["#AIEngineering", "#MachineLearning", "#LLM", "#Roadmap2025"],
  imageUrl = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
  imageAlt = "AI Engineering Visual Roadmap",
  initialLikes = 842,
  initialComments = 56,
  initialReposts = 38,
  mediaSlotRef = null,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const displayAvatar = avatar || avatarUrl || logo || companyLogo || boot2bootLogo;

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleRepost = () => {
    setIsReposted(!isReposted);
  };

  const likesCount = isLiked ? initialLikes + 1 : initialLikes;
  const repostsCount = isReposted ? initialReposts + 1 : initialReposts;

  return (
    <article className="w-full max-w-[340px] sm:max-w-[360px] h-[520px] flex flex-col justify-between mx-auto bg-white text-[#262626] font-sans border border-neutral-200 rounded-2xl overflow-hidden select-none relative">
      {/* Top Section: Header, Text & Media */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* 1. Top Header */}
        <div className="flex items-start justify-between p-3.5 pb-1.5 shrink-0">
          <div className="flex items-start gap-2.5 min-w-0 flex-1">
            {/* Avatar / Organization Logo */}
            <div className="relative shrink-0 cursor-pointer hover:opacity-90 transition">
              <img
                src={displayAvatar}
                alt={authorName}
                className="w-9 h-9 rounded-full object-cover border border-neutral-200 bg-neutral-100"
                onError={(e) => {
                  e.currentTarget.src = boot2bootLogo;
                }}
              />
            </div>

            {/* User Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1 leading-tight flex-wrap">
                <span className="font-semibold text-sm text-[#262626] hover:text-[#0a66c2] hover:underline cursor-pointer truncate">
                  {authorName}
                </span>
                {isVerified && <VerifiedBadge className="w-3.5 h-3.5 inline-block shrink-0" />}
              </div>

              <p className="text-[11px] text-neutral-500 truncate leading-snug mt-0.5">
                {authorSubtitle}
              </p>

              <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-0.5 leading-none">
                <span>{timeAgo}</span>
                <span>•</span>
                <GlobeIcon className="w-3 h-3 text-neutral-400 inline-block" />
              </div>
            </div>
          </div>

          {/* Right Side Header Controls: Follow & More */}
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <button
              onClick={() => setIsFollowed(!isFollowed)}
              className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                isFollowed
                  ? "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  : "text-[#0a66c2] hover:bg-[#0a66c2]/10"
              }`}
            >
              {isFollowed ? "Following" : "+ Follow"}
            </button>

            {/* Static 3 dots */}
            <div className="w-7 h-7 flex items-center justify-center text-neutral-400 pointer-events-none select-none" aria-hidden="true">
              <MoreDotsIcon className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* 2. Post Text Content */}
        <div className="px-3.5 pt-0.5 pb-2 text-[13px] leading-snug text-[#262626] shrink-0">
          <p>
            {isExpanded ? postText : `${postText.slice(0, 85)}...`}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-1 font-semibold text-neutral-500 hover:text-[#0a66c2] hover:underline cursor-pointer inline"
            >
              {isExpanded ? " less" : "see more"}
            </button>
          </p>

          {/* Hashtags */}
          {hashtags && hashtags.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1 text-xs font-medium text-[#0a66c2]">
              {hashtags.slice(0, 3).map((tag) => (
                <span key={tag} className="hover:underline cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 3. Media Image Post (Houses the assembled 3D moving card - Full Width) */}
        <div
          ref={(node) => {
            if (mediaSlotRef) {
              if (typeof mediaSlotRef === 'function') mediaSlotRef(node);
              else mediaSlotRef.current = node;
            }
          }}
          className="w-full flex-1 min-h-0 overflow-hidden relative bg-neutral-100/50 cursor-pointer border-y border-neutral-200"
        />
      </div>

      {/* 4. Social Engagement Counters & Actions Pinned Bottom */}
      <div className="shrink-0">


      {/* 4. Social Engagement Counters Row */}
      <div className="flex items-center justify-between px-3.5 py-2 border-t border-neutral-100 text-[11.5px] text-neutral-500">
        {/* Reactions Counter */}
        <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#0a66c2] transition-colors">
          <div className="flex items-center -space-x-1">
            <span className="w-4 h-4 rounded-full bg-[#0a66c2] text-white text-[9px] flex items-center justify-center font-bold shadow-xs">
              👍
            </span>
            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] flex items-center justify-center font-bold shadow-xs">
              👏
            </span>
            <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-bold shadow-xs">
              ❤️
            </span>
          </div>
          <span className="font-medium text-neutral-600 hover:text-[#0a66c2] transition-colors">{likesCount}</span>
        </div>

        {/* Comments & Reposts Counter */}
        <div className="flex items-center gap-2">
          <span className="hover:text-[#0a66c2] transition-colors cursor-pointer">
            {initialComments} comments
          </span>
          <span>•</span>
          <span className="hover:text-[#0a66c2] transition-colors cursor-pointer">
            {repostsCount} reposts
          </span>
        </div>
      </div>

      {/* 5. LinkedIn 4 Action Buttons Bar */}
      <div className="grid grid-cols-4 px-1 py-1 border-t border-neutral-100">
        {/* Like */}
        <button
          onClick={toggleLike}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            isLiked
              ? "text-[#0a66c2] bg-[#0a66c2]/10"
              : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
          }`}
        >
          <ThumbsUpIcon filled={isLiked} className={`w-4 h-4 ${isLiked ? "text-[#0a66c2]" : "text-neutral-600"}`} />
          <span className="hidden xs:inline sm:inline">Like</span>
        </button>

        {/* Comment */}
        <button
          className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <CommentIcon className="w-4 h-4 text-neutral-600" />
          <span className="hidden xs:inline sm:inline">Comment</span>
        </button>

        {/* Repost */}
        <button
          onClick={toggleRepost}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            isReposted
              ? "text-[#0a66c2] bg-[#0a66c2]/10"
              : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
          }`}
        >
          <LinkedInRepostIcon className={`w-4 h-4 ${isReposted ? "text-[#0a66c2]" : "text-neutral-600"}`} />
          <span className="hidden xs:inline sm:inline">Repost</span>
        </button>

        {/* Send */}
        <button
          onClick={() => {
            if (typeof navigator !== 'undefined' && navigator.share) {
              navigator.share({ title: authorName, text: postText, url: window.location.href }).catch(() => {});
            }
          }}
          className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <LinkedInSendIcon className="w-4 h-4 text-neutral-600" />
          <span className="hidden xs:inline sm:inline">Send</span>
        </button>
      </div>
      </div>
    </article>
  );
}