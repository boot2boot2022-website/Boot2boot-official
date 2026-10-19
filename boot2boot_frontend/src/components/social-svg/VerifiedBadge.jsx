export const VerifiedBadge = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={`${className} inline-block shrink-0`} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 14.6l-3.9-3.9 1.41-1.41 2.49 2.48 5.69-5.69 1.41 1.41-6.9 7.11z"
      fill="#0095F6"
    />
    <path
      d="M10.8 16.6l-3.9-3.9 1.41-1.41 2.49 2.48 5.69-5.69 1.41 1.41-6.9 7.11z"
      fill="#FFFFFF"
    />
  </svg>
);

export default VerifiedBadge;
