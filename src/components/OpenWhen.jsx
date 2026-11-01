import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { openWhenMessages } from '../data/openWhenMessages';

export default function OpenWhen() {
  const [active, setActive] = useState(null);

  const activeMsg = openWhenMessages.find(m => m.id === active);

  return (
    <section
      id="open-when"
      className="section paper-texture"
      style={{ background: 'var(--cream-light)', paddingTop: 'var(--gap-3xl)' }}
      aria-labelledby="open-when-title"
    >
      <div className="section-inner">
        <motion.div
          className="chapter-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="chapter-num">Special Section</span>
          <span className="chapter-title font-script" id="open-when-title">
            Open When…
          </span>
          <p className="chapter-desc">
            Little envelopes for the moments that need them most.
          </p>
        </motion.div>

        <div className="open-when-grid" role="list">
          {openWhenMessages.map((msg, i) => (
            <motion.div
              key={msg.id}
              role="listitem"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <button
                className="open-when-card"
                onClick={() => setActive(msg.id)}
                id={`open-when-${msg.id}`}
                aria-label={`Open envelope: ${msg.title}`}
              >
                <span className="open-when-icon" aria-hidden="true">{msg.icon}</span>
                <div>
                  <div className="open-when-title font-serif">{msg.title}</div>
                  <div className="open-when-hint">{msg.previewHint}</div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom sheet modal */}
      <AnimatePresence>
        {active && activeMsg && (
          <>
            <motion.div
              className="open-when-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            />
            <motion.div
              className="open-when-modal"
              style={{ zIndex: 300 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="ow-sheet-title"
            >
              <motion.div
                className="open-when-sheet"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              >
                <p
                  className="open-when-sheet-title font-script"
                  id="ow-sheet-title"
                >
                  {activeMsg.title} {activeMsg.icon}
                </p>

                <p className="open-when-sheet-body font-serif">
                  {activeMsg.message}
                </p>

                <span className="open-when-sheet-closing font-script">
                  {activeMsg.closing}
                </span>

                <button
                  className="sheet-close-btn"
                  onClick={() => setActive(null)}
                  id="ow-close-btn"
                  aria-label="Close envelope"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
