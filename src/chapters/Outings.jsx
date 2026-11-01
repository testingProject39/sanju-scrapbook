import { motion } from 'motion/react';

export default function Outings({ outingPhotos }) {
  return (
    <section
      id="outings"
      className="section paper-texture"
      style={{ background: 'var(--cream)' }}
      aria-labelledby="outings-title"
    >
      <div className="section-inner">
        <motion.div
          className="chapter-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="chapter-num">Chapter IV</span>
          <span className="chapter-title font-script" id="outings-title">
            Our Little Outings
          </span>
          <p className="chapter-desc">
            We met twice before you left for Nagpur.
            I carry both those days like they were a hundred.
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
          After everything, we started spending time together. Talking every day, eating together,
          going out, watching movies. And before you had to leave — two meetings I didn't want to end.
        </motion.p>

        {/* Two-column polaroid grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'var(--gap-md)',
          }}
        >
          {outingPhotos.map((photo, i) => (
            <motion.div
              key={photo.src}
              className="polaroid"
              style={{ rotate: photo.rotation ?? (i % 2 === 0 ? -1.5 : 1.8) }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.04, rotate: 0 }}
            >
              {/* <img
                src={photo.src}
                alt={photo.alt}
                className="polaroid-img"
                loading="lazy"
                decoding="async"
              /> */} 
              <img
                src={photo.src}
                alt={photo.alt}
                className="polaroid-img"
                style={{
                  objectPosition: photo.objectPosition ?? 'center',
                }}
                loading="lazy"
                decoding="async"
              />
              <span className="polaroid-caption font-script">{photo.caption}</span>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="section-divider" style={{ marginTop: 'var(--gap-2xl)' }}>
          <span className="section-divider-icon">🌸</span>
        </div>

        <motion.p
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(1.3rem, 5.5vw, 1.8rem)',
            color: 'var(--berry)',
            textAlign: 'center',
            lineHeight: 1.5,
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          "I didn't want these days to end." ♡
        </motion.p>
      </div>
    </section>
  );
}
