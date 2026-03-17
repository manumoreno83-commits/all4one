'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ProHeroProps {
  videoUrl?: string;
  fallbackImage?: string;
  title?: string;
  subtitle?: string;
  overlayText?: React.ReactNode;
  overlayOpacity?: number;
  aspectRatio?: 'video' | 'square' | 'portrait';
  parallaxEffect?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function ProHero({
  videoUrl,
  fallbackImage,
  title,
  subtitle,
  overlayText,
  overlayOpacity = 0.3,
  aspectRatio = 'video',
  parallaxEffect = true,
  className = '',
  children,
}: ProHeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax effect
  useEffect(() => {
    if (!parallaxEffect) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallaxEffect]);

  // Aspect ratio classes
  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[9/16]',
  };

  return (
    <div
      ref={containerRef}
      className={`
        relative w-full ${aspectClasses[aspectRatio]}
        bg-black overflow-hidden
        ${className}
      `}
      style={{
        transform: parallaxEffect ? `translateY(${scrollY * 0.5}px)` : 'none',
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Video Background */}
      {videoUrl && (
        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlayThrough={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 300ms ease-in-out',
          }}
        >
          <source src={videoUrl} type="video/mp4" />
          Tu navegador no soporta video.
        </video>
      )}

      {/* Fallback Image */}
      {!videoLoaded && fallbackImage && (
        <Image
          src={fallbackImage}
          alt="Hero background"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
      )}

      {/* Dark Overlay for text readability */}
      <div
        className="absolute inset-0 bg-black/30 transition-opacity duration-300"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content Overlay */}
      <div
        className="
          absolute inset-0
          flex flex-col items-center justify-center
          text-center px-4 sm:px-6 md:px-8
          z-10
        "
      >
        {/* Title */}
        {title && (
          <h1
            className="
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl
              font-extrabold font-sans
              text-white
              mb-2 sm:mb-4
              animate-fade-in
              drop-shadow-lg
            "
            style={{
              animation: 'fadeInUp 0.6s ease-out',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            {title}
          </h1>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p
            className="
              text-base sm:text-lg md:text-xl
              font-semibold text-gray-100
              max-w-2xl
              mb-6 sm:mb-8
              drop-shadow-lg
            "
            style={{
              animation: 'fadeInUp 0.8s ease-out',
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Custom Overlay Content */}
        {overlayText && (
          <div
            className="z-20"
            style={{
              animation: 'fadeInUp 1s ease-out',
            }}
          >
            {overlayText}
          </div>
        )}

        {/* Children */}
        {children && (
          <div
            className="mt-6 sm:mt-8 z-20"
            style={{
              animation: 'fadeInUp 1.2s ease-out',
            }}
          >
            {children}
          </div>
        )}
      </div>

      {/* Gradient overlay (bottom) for additional text protection */}
      <div
        className="
          absolute bottom-0 left-0 right-0
          h-20 sm:h-32
          bg-gradient-to-t from-black/40 to-transparent
          z-5
        "
      />

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
