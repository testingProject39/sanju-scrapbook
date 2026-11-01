import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const FINAL_MESSAGE = {
  title: 'Only You. Always You.',
  icon: '♡',
  paragraphs: [
    "In this lifetime, in every lifetime that may follow — it's you. Only you.",
    "I want to keep choosing you. Keep finding my way back to you. Keep loving you in the ordinary, quiet, certain way that I do.",
    "You are my favourite person — today, tomorrow, and in every tomorrow after that.",
    "Thank you for being exactly who you are, Sanju. That has always been more than enough.",
  ],
  closing: "Always. Only. Yours. ♡",
  signature: "— Ganesh",
};

export default function FinalSurprise() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="final"
      className="final-section paper-texture"
      aria-labelledby="final-title"
    >
      {/* Stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.span
          key={i}
          style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${0.3 + Math.random() * 0.5}rem`,
            color: 'rgba(232, 191, 193, 0.5)',
            pointerEvents: 'none',
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        >
          ✦
        </motion.span>
      ))}

      <div className="final-card" ref={ref}>
        {/* Section label */}
        <motion.span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.8rem',
            color: 'rgba(232, 191, 193, 0.5)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 'var(--gap-md)',
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          The Final Surprise
        </motion.span>

        {/* Heart */}
        <motion.div
          style={{ fontSize: '3rem', marginBottom: 'var(--gap-lg)', color: 'var(--rose)' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4, delay: 0.2 }}
          aria-hidden="true"
        >
          ♡
        </motion.div>

        {/* Title */}
        <motion.h2
          className="final-title font-script"
          id="final-title"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {FINAL_MESSAGE.title}
        </motion.h2>

        {/* Divider */}
        <motion.div
          style={{
            width: 60,
            height: 1,
            background: 'rgba(232,191,193,0.4)',
            margin: 'var(--gap-xl) auto',
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        />

        {/* Body paragraphs */}
        <div className="final-body font-serif">
          {FINAL_MESSAGE.paragraphs.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + i * 0.2, duration: 0.7 }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p className="final-closing font-script">{FINAL_MESSAGE.closing}</p>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1rem',
            color: 'rgba(245, 235, 221, 0.6)',
            fontStyle: 'italic',
            marginTop: 'var(--gap-sm)',
          }}>
            {FINAL_MESSAGE.signature}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
