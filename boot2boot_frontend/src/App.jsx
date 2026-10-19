import { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import { PageTransitionProvider } from './components/PageTransition';
import Home from './pages/Home';

const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const MeetTheTeam = lazy(() => import('./pages/MeetTheTeam'));
const Contact = lazy(() => import('./pages/Contact'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const NotFound = lazy(() => import('./pages/NotFound'));

gsap.registerPlugin(ScrollTrigger);

function ScrollToTopWrapper({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return children;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {isLoading && (
        <Loading
          duration={2.0}
          onComplete={() => setIsLoading(false)}
        />
      )}
      <BrowserRouter>
        <PageTransitionProvider>
          <ScrollToTopWrapper>
          <Navbar />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/service/:slug" element={<ServiceDetail />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/works" element={<WorkPage />} />
              <Route path="/meet-the-team" element={<MeetTheTeam />} />
              <Route path="/team" element={<MeetTheTeam />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ScrollToTopWrapper>
      </PageTransitionProvider>
    </BrowserRouter>
  </>
  );
}

export default App;