export const ThumbsUpIcon = ({ filled = false, className = "w-5 h-5" }) => (
  filled ? (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.46 11l-3.91-3.91a7 7 0 0 1-1.69-2.74l-.49-1.47A2.76 2.76 0 0 0 10.76 1 2.75 2.75 0 0 0 8 3.75v1.39a6.78 6.78 0 0 1-.84 3.26L5.34 12H3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14.42a2.91 2.91 0 0 0 2.8-2.12l2.36-8.25A2.91 2.91 0 0 0 19.46 11z" />
    </svg>
  ) : (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  )
);

export default ThumbsUpIcon;
