"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.hero}>
      {/* Floating tulip petals */}
      <div className={styles.petals}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={styles.petal}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          >
            🌷
          </div>
        ))}
      </div>

      {/* Hero content */}
      <div
        className={styles.content}
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className={styles.tulipIcon}>🌷</div>
        <h1 className={styles.headline}>Миний үзэсгэлэнтэй ANGEL-дээ зориулав</h1>
        <p className={styles.subtext}>Чамтайгаа өнгрүүлсэн, өнгрүүлэх хором мөч бүхэн нандин аз жаргалтай</p>
        <div className={styles.heartDivider}>
          <span>❤️</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className={styles.scrollHint}
        onClick={scrollToContent}
        aria-label="Scroll to begin"
      >
        <span>Доошлуулаарай хайртаа</span>
        <svg
          className={styles.chevron}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
}
