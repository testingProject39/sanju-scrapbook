import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

export default function PhotoGallery({ photos, columns = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div
      ref={ref}
      className={`photo-gallery ${columns === 3 ? 'triple' : ''}`}
      role="list"
      aria-label="Photo collection"
    >
      {photos.map((photo, i) => (
        <PolaroidPhoto
          key={photo.src}
          photo={photo}
          index={i}
          visible={inView}
        />
      ))}
    </div>
  );
}

function PolaroidPhoto({ photo, index, visible }) {
  const [tapped, setTapped] = useState(false);

  const rotation = photo.rotation ?? (index % 2 === 0 ? -1.5 : 1.5);

  return (
    <motion.div
      className="polaroid"
      style={{ rotate: rotation }}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
      whileTap={{ scale: 0.98 }}
      role="listitem"
      onClick={() => setTapped(!tapped)}
    >
      <img
        src={photo.src}
        alt={photo.alt || 'Memory'}
        className="polaroid-img"
        loading="lazy"
        decoding="async"
      />
      <motion.span
        className="polaroid-caption font-script"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        {photo.caption}
      </motion.span>
    </motion.div>
  );
}
