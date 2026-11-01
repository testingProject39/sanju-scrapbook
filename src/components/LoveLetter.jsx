import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { loveLetter } from '../data/letters';

export default function LoveLetter() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="love-letter"
      className="section paper-texture"
      style={{ background: 'var(--cream)', paddingTop: 'var(--gap-3xl)' }}
      aria-labelledby="love-letter-title"
    >
      <div className="section-inner">
        <motion.div
          className="chapter-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="chapter-num">A Letter For You</span>
          <span className="chapter-title font-script" id="love-letter-title">
            Something I've been meaning to say
          </span>
        </motion.div>

        <AnimatePresence mode="wait">
          {!open ? (
            <motion.div
              key="sealed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center' }}
            >
              {/* Sealed envelope hint */}
              <motion.div
                style={{
                  width: 'min(220px, 70vw)',
                  margin: '0 auto var(--gap-xl)',
                  cursor: 'pointer',
                }}
                whileHover={{ y: -4 }}
                onClick={() => setOpen(true)}
                role="button"
                aria-label="Open the letter"
              >
                <div style={{
                  background: 'linear-gradient(145deg, #e8d0b8, #d4b896)',
                  borderRadius: 8,
                  padding: 'var(--gap-xl)',
                  boxShadow: '0 4px 20px var(--warm-shadow)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                }}>
                  <span style={{ fontSize: '2.5rem' }}>💌</span>
                  <span style={{
                    fontFamily: 'var(--font-script)',
                    fontSize: '1.2rem',
                    color: 'var(--plum)',
                  }}>
                    For Sanju ♡
                  </span>
                </div>
              </motion.div>

              <p style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                color: 'var(--plum-light)',
                fontSize: '0.95rem',
                marginBottom: 'var(--gap-lg)',
              }}>
                Tap to read the letter
              </p>

              <button
                className="enter-btn"
                onClick={() => setOpen(true)}
                id="open-letter-btn"
                aria-label="Open the letter"
              >
                Open the letter
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="letter-open"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="letter-paper">
                <p className="letter-salutation font-script">{loveLetter.salutation}</p>

                <div className="letter-body font-serif">
                  {loveLetter.paragraphs.map((para, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: loveLetter.paragraphs.length * 0.08 + 0.3 }}
                >
                  <p className="letter-closing font-serif">{loveLetter.closing}</p>
                  <p className="letter-signature font-script">{loveLetter.signature}</p>
                </motion.div>
              </div>

              <div style={{ textAlign: 'center', marginTop: 'var(--gap-lg)' }}>
                <button
                  className="sheet-close-btn"
                  onClick={() => setOpen(false)}
                  id="close-letter-btn"
                >
                  Fold the letter
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
