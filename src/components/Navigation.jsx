import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Menu, Heart, BookOpen, Mail, Star, Gamepad2, Calendar, Scroll } from 'lucide-react';

const NAV_LINKS = [
  { id: 'before-story', label: 'Before Our Story', icon: BookOpen },
  { id: 'college-days', label: 'College Days', icon: Heart },
  { id: 'proposal', label: 'The Day You Said YES', icon: Star },
  { id: 'outings', label: 'Our Little Outings', icon: Calendar },
  { id: 'nagpur', label: 'Miles Apart', icon: Heart },
  { id: 'love-letter', label: 'A Letter For You', icon: Mail },
  { id: 'open-when', label: 'Open When…', icon: Mail },
  { id: 'daily-surprise', label: 'Daily Surprise', icon: Star },
  { id: 'heart-game', label: 'Find the Hearts', icon: Gamepad2 },
  { id: 'counter', label: 'Our Journey', icon: Calendar },
  { id: 'final', label: 'The Final Surprise', icon: Scroll },
];

export default function Navigation({ activeSection }) {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };

  return (
    <>
      <nav className="navigation" aria-label="Scrapbook navigation">
        <span className="nav-brand font-script" aria-label="Sanju Scrapbook">Sanju ♡</span>
        <button
          className="nav-menu-btn"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={open}
          id="nav-menu-btn"
        >
          <span className="nav-bar" />
          <span className="nav-bar" />
          <span className="nav-bar" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="nav-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              className="nav-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              role="dialog"
              aria-label="Navigation menu"
              aria-modal="true"
            >
              <button
                className="nav-drawer-close"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={22} color="var(--plum)" />
              </button>

              <p className="nav-drawer-title">Chapters ♡</p>

              {NAV_LINKS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  className={`nav-link ${activeSection === id ? 'active' : ''}`}
                  onClick={() => scrollTo(id)}
                  id={`nav-link-${id}`}
                >
                  <Icon size={16} color="currentColor" aria-hidden="true" />
                  <span>{label}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
