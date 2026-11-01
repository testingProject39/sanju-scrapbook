import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone } from 'lucide-react';

const PROPOSAL_DATE = '23 October 2024';

export default function Proposal() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section
      id="proposal"
      className="section"
      style={{
        background: 'linear-gradient(160deg, #2d1a22 0%, #3e2530 50%, #49363D 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-labelledby="proposal-title"
    >
      {/* Floating decorations */}
      <span style={{
        position: 'absolute', top: '6%', left: '8%', fontSize: '1.5rem',
        opacity: 0.15, animation: 'petalFloat1 8s ease-in-out infinite',
        pointerEvents: 'none',
      }}>♡</span>
      <span style={{
        position: 'absolute', top: '12%', right: '10%', fontSize: '1rem',
        opacity: 0.12, animation: 'petalFloat2 10s ease-in-out infinite',
        pointerEvents: 'none',
      }}>✦</span>
      <span style={{
        position: 'absolute', bottom: '14%', left: '12%', fontSize: '1.2rem',
        opacity: 0.13, animation: 'petalFloat3 9s ease-in-out infinite',
        pointerEvents: 'none',
      }}>♡</span>

      <div className="section-inner" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
        >
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.85rem',
            color: 'rgba(232,191,193,0.6)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 8,
          }}>
            Chapter III
          </span>
          <h2
            id="proposal-title"
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(2rem, 8vw, 3rem)',
              color: 'var(--rose)',
              lineHeight: 1.2,
              marginBottom: 'var(--gap-2xl)',
            }}
          >
            The Day You Said YES
          </h2>
        </motion.div>

        {/* Phone UI */}
        <motion.div
          className="proposal-phone"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring', bounce: 0.25 }}
          onClick={() => !revealed && setRevealed(true)}
          style={{ cursor: revealed ? 'default' : 'pointer' }}
          role={revealed ? undefined : 'button'}
          aria-label={revealed ? undefined : 'Reveal the moment'}
        >
          <div className="proposal-phone-screen">
            {/* Notch */}
            <div style={{
              position: 'absolute',
              top: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 80,
              height: 6,
              background: '#111',
              borderRadius: 3,
            }} />

            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--gap-md)',
                paddingTop: 'var(--gap-lg)',
                width: '100%',
              }}
            >
              {!revealed ? (
                <>
                  {/* Ringing phone */}
                  <motion.span
                    className="call-icon"
                    animate={{ rotate: [-15, 15, -15, 15, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  >
                    📞
                  </motion.span>
                  <span style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.7)',
                    fontStyle: 'italic',
                  }}>
                    Incoming call…
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-script)',
                    fontSize: '1.3rem',
                    color: 'var(--rose)',
                  }}>
                    Ganesh ♡
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '0.78rem',
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '0.08em',
                  }}>
                    Tap to reveal
                  </span>
                </>
              ) : (
                <AnimatePresence>
                  <motion.div
                    key="revealed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--gap-sm)',
                      width: '100%',
                    }}
                  >
                    <span className="proposal-date">{PROPOSAL_DATE}</span>

                    <motion.span
                      className="proposal-yes font-script"
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                    >
                      Yes. ♡
                    </motion.span>

                    <motion.p
                      className="proposal-text font-serif"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      One phone call.
                      <br />One question.
                      <br />One YES.
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Caption below phone */}
        <motion.p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1rem, 4vw, 1.1rem)',
            color: 'rgba(245, 235, 221, 0.75)',
            fontStyle: 'italic',
            marginTop: 'var(--gap-xl)',
            lineHeight: 1.85,
            maxWidth: 320,
            margin: 'var(--gap-xl) auto 0',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          And one of the happiest moments of my life.
        </motion.p>
      </div>
    </section>
  );
}
