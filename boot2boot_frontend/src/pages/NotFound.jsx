import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#111113] text-white flex flex-col items-center justify-center px-6 text-center">
      <span className="text-xs uppercase tracking-[0.3em] text-[#e05638] font-mono mb-4">404 Error</span>
      <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-4">Page Not Found</h1>
      <p className="text-neutral-400 max-w-md mb-8 text-sm md:text-base leading-relaxed">
        The page you are looking for might have been moved, renamed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#e05638] text-white font-medium text-sm hover:bg-[#ff6947] transition-colors"
      >
        Return to Home
      </Link>
    </main>
  );
}
