import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// 5 hearts placed at carefully considered positions (percentage)
const HEARTS = [
  { id: 1, top: '18%', left: '12%', message: 'One found! Four more hiding…' },
  { id: 2, top: '35%', right: '8%', message: 'Two! You\'re getting warmer ♡' },
  { id: 3, top: '62%', left: '38%', message: 'Three! Right in the middle of everything.' },
  { id: 4, top: '22%', left: '60%', message: 'Four! Almost there, Sanju…' },
  { id: 5, bottom: '15%', left: '20%', message: 'Five! You found them all.' },
];

const FINAL_MSG = "You found all five hearts. But there's one heart you already have — mine. ♡";

// Decorative scrapbook elements to give context
const DECORATIONS = [
  { emoji: '🌸', top: '8%', left: '30%', size: '1.8rem', opacity: 0.6 },
  { emoji: '✿', top: '45%', left: '5%', size: '1.4rem', opacity: 0.5 },
  { emoji: '🌸', top: '70%', right: '12%', size: '1.6rem', opacity: 0.55 },
  { emoji: '✦', top: '55%', left: '70%', size: '1.2rem', opacity: 0.4 },
  { emoji: '🌸', bottom: '8%', right: '30%', size: '1.5rem', opacity: 0.5 },
  { emoji: '❋', top: '30%', left: '50%', size: '1rem', opacity: 0.35 },
];

export default function HeartGame({ onComplete }) {
  const [found, setFound] = useState(new Set());
  const [lastMsg, setLastMsg] = useState('');
  const [complete, setComplete] = useState(false);

  const handleFind = useCallback((id, msg) => {
    if (found.has(id)) return;

    const newFound = new Set([...found, id]);
    setFound(newFound);
    setLastMsg(msg);

    if (newFound.size === HEARTS.length) {
      setTimeout(() => setComplete(true), 600);
    }
  }, [found]);

  return (
    <section
      id="heart-game"
      className="section paper-texture"
      style={{ background: 'var(--cream-light)', paddingTop: 'var(--gap-3xl)' }}
      aria-labelledby="heart-game-title"
    >
      <div className="section-inner">
        <motion.div
          className="chapter-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="chapter-num">A Little Game</span>
          <span className="chapter-title font-script" id="heart-game-title">
            Find the Hidden Hearts
          </span>
          <p className="chapter-desc">
            Sanju, I've hidden five little hearts in our scrapbook. Can you find them?
          </p>
        </motion.div>

        {/* Counter */}
        <div className="heart-counter" aria-live="polite" aria-label={`${found.size} of 5 hearts found`}>
          {Array.from({ length: HEARTS.length }).map((_, i) => (
            <motion.span
              key={i}
              animate={found.has(i + 1) ? { scale: [1, 1.4, 1], color: ['var(--berry)', 'var(--rose-mid)', 'var(--berry)'] } : {}}
              transition={{ duration: 0.4 }}
              style={{ color: found.has(i + 1) ? 'var(--berry)' : 'rgba(155,98,107,0.2)', marginRight: 4 }}
            >
              ♡
            </motion.span>
          ))}
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1rem',
            color: 'var(--plum-light)',
            marginLeft: 8,
          }}>
            {found.size}/5 found
          </span>
        </div>

        {/* Feedback message */}
        <AnimatePresence mode="wait">
          {lastMsg && (
            <motion.p
              key={lastMsg}
              className="game-message font-serif"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {lastMsg}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Playing area */}
        <div className="heart-game" role="region" aria-label="Heart hunting area" style={{ minHeight: '60dvh' }}>
          {/* Decorative elements */}
          {DECORATIONS.map((d, i) => (
            <span
              key={i}
              style={{
                position: 'absolute',
                top: d.top,
                left: d.left,
                right: d.right,
                bottom: d.bottom,
                fontSize: d.size,
                opacity: d.opacity,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {d.emoji}
            </span>
          ))}

          {/* Sample polaroid placeholders as context */}
          {[
            { top: '38%', left: '5%', w: '28%', bg: 'rgba(232,191,193,0.3)', label: '📷' },
            { top: '10%', right: '5%', w: '30%', bg: 'rgba(212,184,150,0.3)', label: '📷' },
            { bottom: '18%', right: '8%', w: '26%', bg: 'rgba(232,191,193,0.25)', label: '📷' },
          ].map((p, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: p.top,
                left: p.left,
                right: p.right,
                bottom: p.bottom,
                width: p.w,
                aspectRatio: '0.85',
                background: p.bg,
                borderRadius: 4,
                border: '2px solid rgba(232,191,193,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                opacity: 0.7,
                pointerEvents: 'none',
              }}
            >
              {p.label}
            </div>
          ))}

          {/* Hidden hearts */}
          {HEARTS.map((heart) => (
            <motion.button
              key={heart.id}
              className={`hidden-heart ${found.has(heart.id) ? 'found' : ''}`}
              style={{
                top: heart.top,
                left: heart.left,
                right: heart.right,
                bottom: heart.bottom,
              }}
              onClick={() => handleFind(heart.id, heart.message)}
              aria-label={found.has(heart.id) ? `Heart ${heart.id} found!` : `Hidden heart ${heart.id}`}
              whileTap={{ scale: 0.85 }}
            >
              <motion.span
                className="hidden-heart-icon"
                animate={found.has(heart.id) ? {
                  scale: [1, 1.5, 1],
                  opacity: 1,
                } : {
                  opacity: [0.08, 0.15, 0.08],
                }}
                transition={found.has(heart.id) ? {
                  duration: 0.5,
                  type: 'spring',
                  bounce: 0.6,
                } : {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ fontSize: '1.8rem' }}
              >
                ♡
              </motion.span>
            </motion.button>
          ))}

          {/* Completion overlay */}
          <AnimatePresence>
            {complete && (
              <motion.div
                className="game-complete-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Confetti hearts */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.span
                    key={i}
                    style={{
                      position: 'absolute',
                      fontSize: `${0.8 + Math.random() * 0.8}rem`,
                      color: 'var(--berry)',
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    initial={{ opacity: 0, scale: 0, y: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.5], y: -80 }}
                    transition={{ delay: Math.random() * 0.5, duration: 1.5 }}
                  >
                    ♡
                  </motion.span>
                ))}

                <motion.h3
                  className="game-complete-title font-script"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                >
                  You found them all! ♡
                </motion.h3>

                <motion.p
                  className="game-complete-msg font-serif"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                >
                  {FINAL_MSG}
                </motion.p>

                {onComplete && (
                  <motion.button
                    className="enter-btn"
                    style={{ marginTop: 'var(--gap-xl)' }}
                    onClick={onComplete}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    id="game-continue-btn"
                  >
                    Continue to the final surprise ♡
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
