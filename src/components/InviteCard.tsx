'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './InviteCard.module.css';

interface InviteCardProps {
  onPlayAgain: () => void;
}

export default function InviteCard({ onPlayAgain }: InviteCardProps) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonEscaping, setIsNoButtonEscaping] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleYesClick = () => {
    // Show celebration modal or directly trigger actions
    alert('😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘');
  };

  const handleNoClick = () => {
    // Optional: Show a sad message or do nothing
    console.log('Trying to click No... 😏');
  };

  const moveNoButton = (cursorX: number, cursorY: number) => {
    if (!noButtonRef.current) return;

    const buttonRect = noButtonRef.current.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    // Calculate distance from cursor to button center
    const distance = Math.sqrt(
      Math.pow(cursorX - buttonCenterX, 2) + 
      Math.pow(cursorY - buttonCenterY, 2)
    );

    // If cursor is within 150px, move the button away
    if (distance < 150) {
      if (!isNoButtonEscaping) {
        setIsNoButtonEscaping(true);
      }

      // Calculate direction away from cursor
      const angle = Math.atan2(buttonCenterY - cursorY, buttonCenterX - cursorX);
      
      // Move button 400px away in that direction (fast escape!)
      const moveDistance = 400;
      let newX = buttonRect.left + Math.cos(angle) * moveDistance;
      let newY = buttonRect.top + Math.sin(angle) * moveDistance;

      // Keep button within viewport bounds
      const padding = 40;
      const maxX = window.innerWidth - buttonRect.width - padding;
      const maxY = window.innerHeight - buttonRect.height - padding;
      
      newX = Math.max(padding, Math.min(newX, maxX));
      newY = Math.max(padding, Math.min(newY, maxY));

      setNoButtonPosition({ x: newX, y: newY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    moveNoButton(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      moveNoButton(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div 
      className={styles.inviteContainer}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <div className={styles.inviteCard}>
        <h2 className={styles.inviteTitle}>Will You Be My Valentine?</h2>
        
        <div className={styles.catRoseContainer}>
          <Image 
            src="/cat-rose.gif" 
            alt="Cat with rose"
            width={200}
            height={200}
            className={styles.catRoseGif}
            unoptimized
          />
        </div>
        
        <div className={styles.inviteDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>📅</span>
            <div>
              <div className={styles.detailLabel}>Date</div>
              <div className={styles.detailValue}>February 13, 2026</div>
            </div>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>🕐</span>
            <div>
              <div className={styles.detailLabel}>Time</div>
              <div className={styles.detailValue}>18:00</div>
            </div>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>📍</span>
            <div>
              <div className={styles.detailLabel}>Location</div>
              <div className={styles.detailValue}>Gate 10</div>
            </div>
          </div>
        </div>

        <p className={styles.inviteMessage}>Хамтдаа гоё үдшийг өнгрүүлцгээе.</p>

        <div className={styles.actionButtons}>
          <button 
            className={`btn-primary ${styles.yesButton}`}
            onClick={handleYesClick}
          >
            Тийм 💕
          </button>

          <button 
            ref={noButtonRef}
            className={`btn-secondary ${styles.noButton} ${isNoButtonEscaping ? styles.noButtonEscaping : ''}`}
            style={{
              position: isNoButtonEscaping ? 'fixed' : 'relative',
              left: isNoButtonEscaping ? `${noButtonPosition.x}px` : 'auto',
              top: isNoButtonEscaping ? `${noButtonPosition.y}px` : 'auto',
              transition: isNoButtonEscaping ? 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
              zIndex: isNoButtonEscaping ? 1000 : 'auto',
            }}
            onClick={handleNoClick}
          >
            Үгүй 😢
          </button>
        </div>
      </div>
    </div>
  );
}
