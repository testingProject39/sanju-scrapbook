import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const START_DATE = new Date('2024-10-23T00:00:00');

function calcDiff(from, to) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

export default function RelationshipCounter() {
  const [diff, setDiff] = useState(calcDiff(START_DATE, new Date()));

  useEffect(() => {
    // Update at midnight
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;

    const timeout = setTimeout(() => {
      setDiff(calcDiff(START_DATE, new Date()));
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, [diff]);

  const units = [
    { value: diff.years, label: diff.years === 1 ? 'year' : 'years', show: diff.years > 0 },
    { value: diff.months, label: diff.months === 1 ? 'month' : 'months', show: true },
    { value: diff.days, label: diff.days === 1 ? 'day' : 'days', show: true },
  ].filter(u => u.show || u.label === 'days');

  return (
    <section
      id="counter"
      className="section paper-texture"
      style={{
        background: 'linear-gradient(160deg, var(--cream) 0%, var(--cream-light) 100%)',
        paddingTop: 'var(--gap-3xl)',
        textAlign: 'center',
      }}
      aria-labelledby="counter-title"
    >
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.85rem',
            color: 'var(--rose-mid)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 8,
          }}>
            Since 23 October 2024
          </span>
          <h2
            id="counter-title"
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(2rem, 8vw, 3rem)',
              color: 'var(--plum)',
              lineHeight: 1.2,
              marginBottom: 'var(--gap-xl)',
            }}
          >
            Every day with you is my favourite.
          </h2>
        </motion.div>

        <div className="counter-grid" aria-label="Relationship duration">
          {units.map(({ value, label }, i) => (
            <motion.div
              key={label}
              className="counter-unit"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, type: 'spring', bounce: 0.3 }}
            >
              <motion.span
                className="counter-num font-script"
                key={value}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {value}
              </motion.span>
              <span className="counter-label font-serif">{label}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1rem, 4vw, 1.15rem)',
            color: 'var(--plum-light)',
            fontStyle: 'italic',
            marginTop: 'var(--gap-2xl)',
            lineHeight: 1.85,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Every single one of those days, worth it.
        </motion.p>

        {/* Heart decoration */}
        <motion.div
          style={{
            marginTop: 'var(--gap-xl)',
            fontSize: '2rem',
            color: 'var(--rose-mid)',
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          ♡
        </motion.div>
      </div>
    </section>
  );
}
