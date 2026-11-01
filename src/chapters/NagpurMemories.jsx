import { motion } from 'motion/react';

export default function NagpurMemories({ nagpurPhotos }) {
  return (
    <section
      id="nagpur"
      className="section paper-texture"
      style={{ background: 'var(--cream-light)' }}
      aria-labelledby="nagpur-title"
    >
      <div className="section-inner">
        <motion.div
          className="chapter-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="chapter-num">Chapter V</span>
          <span className="chapter-title font-script" id="nagpur-title">
            Miles Apart, Hearts Together
          </span>
          <p className="chapter-desc">
            Different cities, different routines, but still the same two hearts.
          </p>
        </motion.div>

        <motion.p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1rem, 4vw, 1.1rem)',
            color: 'var(--plum)',
            lineHeight: 1.85,
            fontStyle: 'italic',
            marginBottom: 'var(--gap-xl)',
            textAlign: 'center',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          No matter how far life takes us, you will always be
          the person my heart looks forward to seeing.

          Every journey to you becomes a memory I want to keep,
          and every moment together reminds me how lucky I am
          to have you in my life. ♡
        </motion.p>

<motion.div
  initial={{ opacity: 0, y: 15 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.4, duration: 0.7 }}
  style={{
    textAlign: 'center',
    marginBottom: 'var(--gap-xl)',
    padding: 'var(--gap-lg)',
    background: 'rgba(232, 191, 193, 0.16)',
    borderRadius: 'var(--radius-lg)',
    border: '1px dashed var(--rose)',
  }}
>
  <p
    style={{
      fontFamily: 'var(--font-script)',
      fontSize: 'clamp(1.3rem, 5vw, 1.7rem)',
      color: 'var(--berry)',
      lineHeight: 1.5,
      margin: 0,
    }}
  >
    "Every mile between us is just another reason
    to look forward to the next hug." ♡
  </p>
</motion.div>

        {/* Nagpur photo grid — 3 columns for variety */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--gap-sm)',
        }}>
          {nagpurPhotos.map((photo, i) => (
            <motion.div
              key={photo.src}
              className="polaroid"
              style={{ rotate: photo.rotation ?? (i % 2 === 0 ? -1.5 : 1.8) }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: (i % 4) * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="polaroid-img"
                loading="lazy"
                decoding="async"
              />
              <span className="polaroid-caption font-script">{photo.caption}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
