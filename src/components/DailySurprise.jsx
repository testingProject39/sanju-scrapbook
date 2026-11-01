import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { dailyMessages } from '../data/dailyMessages';

const STORAGE_KEY = 'sanju_daily_last_seen';

function getTodayIndex() {
  const now = new Date();
  // Day of year 0-indexed, mod 30
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return dayOfYear % dailyMessages.length;
}

function getOrdinalDate() {
  const now = new Date();
  const day = now.getDate();
  const suffix = ['th', 'st', 'nd', 'rd'];
  const v = day % 100;
  const s = suffix[(v - 20) % 10] || suffix[v] || suffix[0];
  return `${now.toLocaleString('default', { month: 'long' })} ${day}${s}`;
}

export default function DailySurprise() {
  const [revealed, setRevealed] = useState(false);
  const [msgIndex, setMsgIndex] = useState(getTodayIndex());

  const message = dailyMessages[msgIndex];

  useEffect(() => {
    // Check if user already saw today's message
    const lastSeen = localStorage.getItem(STORAGE_KEY);
    const today = new Date().toDateString();
    if (lastSeen === today) {
      setRevealed(true);
    }
  }, []);

  const handleReveal = () => {
    setRevealed(true);
    localStorage.setItem(STORAGE_KEY, new Date().toDateString());
  };

  return (
    <section
      id="daily-surprise"
      className="section paper-texture"
      style={{ background: 'var(--cream)', paddingTop: 'var(--gap-3xl)' }}
      aria-labelledby="daily-surprise-title"
    >
      <div className="section-inner">
        <motion.div
          className="chapter-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="chapter-num">Every Day</span>
          <span className="chapter-title font-script" id="daily-surprise-title">
            A Little Surprise for You <span className="deco-heart">♡</span>
          </span>
          <p className="chapter-desc">
            One message, just for today.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center' }}
            >
              <motion.div
                style={{
                  width: 120,
                  height: 120,
                  margin: '0 auto var(--gap-xl)',
                  background: 'linear-gradient(145deg, var(--rose), var(--berry))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px var(--warm-shadow)',
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 4px 20px var(--warm-shadow)',
                    '0 8px 32px var(--deep-shadow)',
                    '0 4px 20px var(--warm-shadow)',
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                onClick={handleReveal}
                role="button"
                aria-label="Reveal today's surprise"
                whileTap={{ scale: 0.95 }}
              >
                🎁
              </motion.div>

              <p style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                color: 'var(--plum-light)',
                fontSize: '1rem',
                marginBottom: 'var(--gap-lg)',
              }}>
                {getOrdinalDate()} — tap to open today's message
              </p>

              <button
                className="enter-btn"
                onClick={handleReveal}
                id="reveal-daily-btn"
                aria-label="Reveal today's daily message"
              >
                Open today's surprise
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="daily-card">
                <span className="daily-day-badge">
                  {getOrdinalDate()}
                </span>

                <motion.p
                  className="daily-message font-serif"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  {message.message}
                </motion.p>

                <motion.span
                  className="daily-closing font-script"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  {message.closing}
                </motion.span>
              </div>

              <p style={{
                textAlign: 'center',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                color: 'var(--plum-light)',
                fontSize: '0.82rem',
                marginTop: 'var(--gap-md)',
              }}>
                Come back tomorrow for a new one ✿
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
