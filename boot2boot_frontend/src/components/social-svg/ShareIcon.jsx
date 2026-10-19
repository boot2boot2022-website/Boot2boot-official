export const ShareIcon = ({ className = "w-6 h-6" }) => (
  <svg className={`${className} text-[#262626] hover:text-neutral-500 transition-colors duration-150`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default ShareIcon;
