'use client';

import { useEffect, useState } from 'react';
import styles from './TimeCounter.module.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function TimeCounter() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      // Parse the relationship start date (Singapore timezone)
      const startDate = new Date("2024-03-14T00:00:00+08:00");
      const now = new Date();
      
      // Calculate difference in milliseconds
      const difference = now.getTime() - startDate.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <section className={styles.counterSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.icon}>⏰</div>
          <h2 className={styles.title}>Хамтдаа байгаад</h2>
          <p className={styles.subtitle}>
          </p>

          <div className={styles.counterGrid}>
            <div className={styles.timeBox}>
              <div className={styles.timeValue}>{timeLeft.days}</div>
              <div className={styles.timeLabel}>Days</div>
              <div className={styles.timeIcon}>📅</div>
            </div>

            <div className={styles.timeBox}>
              <div className={styles.timeValue}>{timeLeft.hours}</div>
              <div className={styles.timeLabel}>Hours</div>
              <div className={styles.timeIcon}>🕐</div>
            </div>

            <div className={styles.timeBox}>
              <div className={styles.timeValue}>{timeLeft.minutes}</div>
              <div className={styles.timeLabel}>Minutes</div>
              <div className={styles.timeIcon}>⏱️</div>
            </div>

            <div className={styles.timeBox}>
              <div className={styles.timeValue}>{timeLeft.seconds}</div>
              <div className={styles.timeLabel}>Seconds</div>
              <div className={styles.timeIcon}>⚡</div>
            </div>
          </div>

          <p className={styles.message}>
            хугацаа өнгөрчээ хайрт минь, энэ цаг хэзээ ч зогсохгүй 💕
          </p>
        </div>
      </div>
    </section>
  );
}
