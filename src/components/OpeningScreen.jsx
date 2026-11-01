import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const PHASES = {
  ENVELOPE: 'envelope',
  OPENING: 'opening',
  WELCOME: 'welcome',
};

export default function OpeningScreen({ onEnter }) {
  const [phase, setPhase] = useState(PHASES.ENVELOPE);

  const handleEnvelopeTap = () => {
    if (phase !== PHASES.ENVELOPE) return;
    setPhase(PHASES.OPENING);
    setTimeout(() => setPhase(PHASES.WELCOME), 1200);
  };

  return (
    <div className="opening-screen paper-texture" id="opening-screen">
      {/* Floating petals */}
      <span className="deco-petal" style={{ top: '8%', left: '12%', animationDuration: '7s' }}>🌸</span>
      <span className="deco-petal" style={{ top: '15%', right: '10%', animationDuration: '9s', animationDelay: '1s' }}>✿</span>
      <span className="deco-petal" style={{ bottom: '20%', left: '8%', animationDuration: '8s', animationDelay: '2s' }}>🌸</span>
      <span className="deco-petal" style={{ bottom: '12%', right: '14%', animationDuration: '6.5s', animationDelay: '0.5s' }}>✿</span>

      <AnimatePresence mode="wait">
        {phase === PHASES.ENVELOPE && (
          <motion.div
            key="envelope-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}
          >
            <motion.p
              className="opening-tagline"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              A little something for you, Sanju <span className="deco-heart">♡</span>
            </motion.p>

            {/* Envelope */}
            <motion.div
              className="envelope-wrapper"
              onClick={handleEnvelopeTap}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6, type: 'spring', bounce: 0.3 }}
              role="button"
              aria-label="Open the envelope"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleEnvelopeTap()}
            >
              <div className="envelope-body">
                {/* Top flap */}
                <div className="envelope-flap">
                  <div className="envelope-flap-inner" />
                </div>

                {/* Wax seal */}
                <motion.div
                  className="envelope-seal seal-pulse"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ♡
                </motion.div>

                {/* Bottom flaps */}
                <div className="envelope-bottom" />
              </div>
            </motion.div>

            <motion.p
              className="opening-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              tap to open
            </motion.p>
          </motion.div>
        )}

        {phase === PHASES.OPENING && (
          <motion.div
            key="opening-anim"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {/* Animated opening envelope */}
            <motion.div
              style={{
                width: 'min(280px, 80vw)',
                aspectRatio: '3/2',
                background: 'linear-gradient(145deg, #e8d0b8, #d4b896)',
                borderRadius: 8,
                position: 'relative',
                boxShadow: '0 8px 40px rgba(73,54,61,0.25)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              animate={{ scale: [1, 1.03, 1.03] }}
              transition={{ duration: 1 }}
            >
              {/* Flap opening */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '55%',
                  transformOrigin: 'top center',
                  perspective: 600,
                }}
                animate={{ rotateX: [0, -170] }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(160deg, #d4a87a, #c49060)',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }} />
              </motion.div>

              {/* Rising letter */}
              <motion.div
                style={{
                  background: 'var(--cream-light)',
                  width: '80%',
                  padding: '12px 16px',
                  borderRadius: 4,
                  boxShadow: '0 2px 12px rgba(73,54,61,0.15)',
                  textAlign: 'center',
                  zIndex: 2,
                }}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: [-40, -60], opacity: [0, 1] }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <span style={{
                  fontFamily: 'Dancing Script, cursive',
                  fontSize: '1.1rem',
                  color: 'var(--berry)',
                }}>
                  For Sanju ♡
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {phase === PHASES.WELCOME && (
          <motion.div
            key="welcome-view"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="welcome-card">
              {/* Top rose line is via CSS ::before */}

              <motion.h1
                className="welcome-greeting font-script"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Good morning, Sanju.
              </motion.h1>

              <div className="welcome-divider" />

              <motion.p
                className="welcome-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                I made a little something for you.
                <br /><br />
                Take your time, because every little corner of this place has a piece of my heart.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <button
                  className="enter-btn"
                  onClick={onEnter}
                  id="enter-scrapbook-btn"
                  aria-label="Enter the scrapbook"
                >
                  <span>Step inside</span>
                  <span className="deco-heart">♡</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
