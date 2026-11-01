import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';

// Styles
import './styles/global.css';
import './styles/scrapbook.css';
import './styles/animations.css';

// Data
import { collegePhotos, outingPhotos, nagpurPhotos } from './data/memories';

// Components
import OpeningScreen from './components/OpeningScreen';
import Navigation from './components/Navigation';
import MusicPlayer from './components/MusicPlayer';
import LoveLetter from './components/LoveLetter';
import OpenWhen from './components/OpenWhen';
import DailySurprise from './components/DailySurprise';
import HeartGame from './components/HeartGame';
import RelationshipCounter from './components/RelationshipCounter';
import FinalSurprise from './components/FinalSurprise';

// Chapters
import CollegeDays from './chapters/CollegeDays';
import Proposal from './chapters/Proposal';
import Outings from './chapters/Outings';
import NagpurMemories from './chapters/NagpurMemories';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [musicReady, setMusicReady] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const finalRef = useRef(null);

  const handleEnter = () => {
    setEntered(true);
    setMusicReady(true);
  };

  const scrollToFinal = () => {
    const el = document.getElementById('final');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Track active section for nav highlighting
  useEffect(() => {
    if (!entered) return;

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [entered]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="opening"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'fixed', inset: 0, zIndex: 500 }}
          >
            <OpeningScreen onEnter={handleEnter} />
          </motion.div>
        ) : (
          <motion.div
            key="scrapbook"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navigation activeSection={activeSection} />

            <main id="main-content" aria-label="Sanju's Scrapbook">
              {/* Chapter I & II */}
              <CollegeDays collegePhotos={collegePhotos} />

              {/* Section divider */}
              <div className="section-divider" style={{ padding: '0 var(--gap-xl)' }}>
                <span className="section-divider-icon">✿</span>
              </div>

              {/* Chapter III */}
              <Proposal />

              {/* Section divider */}
              <div className="section-divider" style={{ padding: '0 var(--gap-xl)' }}>
                <span className="section-divider-icon">🌸</span>
              </div>

              {/* Chapter IV */}
              <Outings outingPhotos={outingPhotos} />

              {/* Chapter V */}
              <NagpurMemories nagpurPhotos={nagpurPhotos} />

              {/* Love Letter */}
              <LoveLetter />

              {/* Open When */}
              <OpenWhen />

              {/* Daily Surprise */}
              <DailySurprise />

              {/* Heart Game */}
              <HeartGame onComplete={scrollToFinal} />

              {/* Relationship Counter */}
              <RelationshipCounter />

              {/* Final Surprise */}
              <FinalSurprise />
            </main>

            {/* Persistent music player */}
            <MusicPlayer shouldPlay={musicReady} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
