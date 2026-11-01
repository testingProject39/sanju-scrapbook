import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { assetPath } from '../utils/assetPath'; 

export default function CollegeDays({ collegePhotos }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <>
      {/* Chapter 1 */}
      <section
        id="before-story"
        className="section paper-texture"
        style={{
          background: 'var(--cream-light)',
          paddingTop: 'calc(72px + var(--gap-2xl))',
          scrollMarginTop: '80px',
        }}
        aria-labelledby="before-story-title"
      >
        <div className="section-inner" ref={ref}>
          <motion.div
            className="chapter-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="chapter-num">Chapter I</span>
            <span className="chapter-title font-script" id="before-story-title">
              Before Our Story Began
            </span>
            <p className="chapter-desc">
              I noticed you long before our paths ever really crossed.
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
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            It was second year, in our B.Tech classroom. You were just there,
            existing, and somehow that was enough to make me pay attention.
            I didn't say anything then. It felt safer not to.
          </motion.p>

          {/* Childhood note — no actual childhood photos per instructions */}
          <motion.div
            style={{
              background: 'rgba(232, 191, 193, 0.18)',
              border: '1px dashed var(--rose)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--gap-xl)',
              textAlign: 'center',
              marginBottom: 'var(--gap-xl)',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <span style={{
              fontFamily: 'var(--font-script)',
              fontSize: '1.4rem',
              color: 'var(--berry)',
              display: 'block',
              marginBottom: 8,
            }}>
              Little Sanju ✿
            </span>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: 'var(--plum-light)',
              fontSize: '0.95rem',
              lineHeight: 1.7,
            }}>
              Long before our paths crossed, you were living your own story.
              A story I wasn't part of yet — but I'm glad eventually became mine to know.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chapter 2 */}
      <section
        id="college-days"
        className="section paper-texture"
        style={{ background: 'var(--cream)', paddingTop: 'var(--gap-3xl)' }}
        aria-labelledby="college-days-title"
      >
        <div className="section-inner">
          <div className="chapter-heading">
            <span className="chapter-num">Chapter II</span>
            <span className="chapter-title font-script" id="college-days-title">
              Those College Days
            </span>
            <p className="chapter-desc">
              Somewhere between our conversations and little moments, you became someone special.
            </p>
          </div>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1rem, 4vw, 1.1rem)',
            color: 'var(--plum)',
            lineHeight: 1.85,
            fontStyle: 'italic',
            marginBottom: 'var(--gap-xl)',
            textAlign: 'center',
          }}>
            Third year, and we started talking. Chess games. Long conversations about nothing
            in particular. I kept finding reasons to be near you a little longer.
          </p>

          {/* College photos grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'var(--gap-md)',
            }}
          >
            {collegePhotos.slice(0, 4).map((photo, i) => (
              <PolaroidCard key={photo.src} photo={photo} index={i} />
            ))}
          </div>

          {/* Watch photo special highlight */}
          {collegePhotos[3] && (
            <motion.div
              style={{
                marginTop: 'var(--gap-xl)',
                textAlign: 'center',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="polaroid" style={{ display: 'inline-block', maxWidth: 220, rotate: '-1deg' }}>
                <img
                  src={assetPath('/images/college/img5.png')}
                  alt="The gifted watch"
                  className="polaroid-img"
                  loading="lazy"
                  decoding="async"
                />
                <span className="polaroid-caption font-script">
                  The watch I gifted you — before the big question ♡
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}

function PolaroidCard({ photo, index }) {
  return (
    <motion.div
      className="polaroid"
      style={{ rotate: photo.rotation ?? (index % 2 === 0 ? -2 : 2) }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      whileHover={{ scale: 1.04, rotate: 0 }}
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
  );
}
