import { useRef, useEffect, useState } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { assetPath } from '../utils/assetPath';  

const MUSIC_FILE = assetPath('/music/perfect(Piano).mp3');

export default function MusicPlayer({ shouldPlay }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);

  // Initialise and fade-in audio when shouldPlay becomes true
  useEffect(() => {
    if (!shouldPlay) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    audio.loop = true;

    const tryPlay = async () => {
      try {
        await audio.play();
        setPlaying(true);
        setVisible(true);
        // Fade in volume
        let vol = 0;
        const fadeIn = setInterval(() => {
          vol = Math.min(vol + 0.01, 0.18);
          audio.volume = vol;
          if (vol >= 0.18) clearInterval(fadeIn);
        }, 80);
      } catch (err) {
        console.warn('Audio play failed:', err);
        setError(true);
        setVisible(true);
      }
    };

    tryPlay();
  }, [shouldPlay]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => setError(true));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_FILE}
        preload="none"
        aria-hidden="true"
      />

      <AnimatePresence>
        {visible && (
          <motion.div
            className="music-player"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            role="region"
            aria-label="Music player"
          >
            <button
              className="music-btn"
              onClick={togglePlay}
              aria-label={playing ? 'Pause music' : 'Play music'}
              id="music-toggle-btn"
            >
              {error ? (
                <Music size={16} />
              ) : playing ? (
                <Pause size={16} />
              ) : (
                <Play size={16} />
              )}
            </button>
            <span className="music-label" aria-live="polite">
              {error ? 'tap to play' : playing ? 'Perfect — Piano' : 'paused'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
