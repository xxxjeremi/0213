"use client";

import { useState, useEffect, useRef } from "react";
import InviteCard from "./InviteCard";
import styles from "./TulipCatcher.module.css";

interface Tulip {
  id: number;
  x: number;
  y: number;
  speed: number;
}

interface TulipCatcherProps {
  onComplete: () => void;
  gameCompleted: boolean;
}

export default function TulipCatcher({
  onComplete,
  gameCompleted,
}: TulipCatcherProps) {
  const [gameStarted, setGameStarted] = useState(true);
  const [score, setScore] = useState(0);
  const [tulips, setTulips] = useState<Tulip[]>([]);
  const [showVictory, setShowVictory] = useState(false);
  const [confetti, setConfetti] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(0);
  const animationFrameRef = useRef<number>();

  const TARGET_SCORE = 10;

  useEffect(() => {
    if (gameStarted && score < TARGET_SCORE) {
      const spawnTulip = () => {
        const newTulip: Tulip = {
          id: nextIdRef.current++,
          x: Math.random() * 85 + 5, // 5-90% to keep within bounds with padding
          y: -10,
          speed: 0.3 + Math.random() * 1, // Much slower: 0.3 to 0.7
        };
        setTulips((prev) => [...prev, newTulip]);
      };

      // Spawn tulips less frequently
      const spawnInterval = setInterval(spawnTulip, 400);

      // Animation loop for moving tulips (throttled)
      let lastTime = Date.now();
      const animate = () => {
        const now = Date.now();
        const delta = now - lastTime;

        // Update every 16ms (roughly 60fps) but with slower movement
        if (delta > 16) {
          setTulips((prev) => {
            return prev
              .map((tulip) => ({ ...tulip, y: tulip.y + tulip.speed }))
              .filter((tulip) => tulip.y < 110); // Remove tulips that went off screen
          });
          lastTime = now;
        }

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animationFrameRef.current = requestAnimationFrame(animate);

      return () => {
        clearInterval(spawnInterval);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [gameStarted, score]);

  useEffect(() => {
    if (score >= TARGET_SCORE && !showVictory) {
      setShowVictory(true);
      onComplete();
      // Create confetti
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
      }));
      setConfetti(newConfetti);
    }
  }, [score, showVictory, onComplete]);

  const handleTulipClick = (
    tulipId: number,
    e: React.MouseEvent | React.TouchEvent,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setTulips((prev) => prev.filter((t) => t.id !== tulipId));
    setScore((prev) => prev + 1);

    // Haptic feedback on mobile
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  };


  const resetGame = () => {
    setGameStarted(false);
    setScore(0);
    setTulips([]);
    setShowVictory(false);
    setConfetti([]);
  };

  if (showVictory) {
    return (
      <section className={styles.gameSection}>
        <div className={styles.confettiContainer}>
          {confetti.map((c) => (
            <div
              key={c.id}
              className={styles.confetti}
              style={{
                left: `${c.x}%`,
                top: `${c.y}%`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            >
              {["💕", "❤️", "🌷", "✨", "🎉"][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
        <InviteCard onPlayAgain={resetGame} />
      </section>
    );
  }

  return (
    <section className={styles.gameSection}>
      <div className={styles.container}>
        <div className={styles.gameHeader}>
          <h2>Тоглоом тоглох уу 🤭</h2>
          <p>
            {TARGET_SCORE} ширхэг tulip цэцэг бариарай хайртаа 😘
          </p>
        </div>

        <>
          <div className={styles.scoreBoard}>
            <div className={styles.scoreBadge}>
              <span className={styles.scoreLabel}>Оноо:</span>
              <span className={styles.scoreValue}>
                {score} / {TARGET_SCORE}
              </span>
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${(score / TARGET_SCORE) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.gameArea} ref={gameAreaRef}>
            {tulips.map((tulip) => (
              <button
                key={tulip.id}
                className={styles.tulip}
                style={{
                  left: `${tulip.x}%`,
                  top: `${tulip.y}%`,
                }}
                onClick={(e) => handleTulipClick(tulip.id, e)}
                onTouchStart={(e) => handleTulipClick(tulip.id, e)}
              >
                🌷
              </button>
            ))}

            {tulips.length === 0 && (
              <div className={styles.waitingMessage}>
                 🌷
              </div>
            )}
          </div>
        </>
      </div>
    </section>
  );
}
