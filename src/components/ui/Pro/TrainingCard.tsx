'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ProButton from './ProButton';
import ProCard from './ProCard';

interface TrainingCardProps {
  id: string;
  name: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  exerciseCount?: number;
  onPlay?: () => void;
  onSelect?: () => void;
  className?: string;
}

export default function TrainingCard({
  id,
  name,
  videoUrl,
  thumbnailUrl,
  duration,
  difficulty,
  exerciseCount,
  onPlay,
  onSelect,
  className = '',
}: TrainingCardProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const difficultyColors = {
    beginner: 'bg-gray-300',
    intermediate: 'bg-gray-500',
    advanced: 'bg-pink-600',
  };

  const difficultyLabels = {
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
  };

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <ProCard
        variant="light"
        hoverEffect="scale"
        className={`
          group
          bg-white dark:bg-slate-900
          overflow-hidden
          transition-all duration-300
          ${className}
        `}
      >
      {/* Video/Image Container */}
      <div className="relative w-full aspect-video bg-black overflow-hidden">
        {/* Video */}
        {videoUrl && (
          <video
            autoPlay={isHovering}
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
          </video>
        )}

        {/* Fallback Image */}
        {!videoLoaded && thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Overlay */}
        <div
          className="
            absolute inset-0 bg-black/20
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
            flex items-center justify-center
          "
        >
          <ProButton
            variant="primary"
            size="lg"
            onClick={onPlay}
            className="z-10"
          >
            ▶️ Ver Demo
          </ProButton>
        </div>

        {/* Difficulty Badge */}
        {difficulty && (
          <div
            className={`
              absolute top-3 right-3 z-20
              ${difficultyColors[difficulty]}
              text-white
              px-3 py-1
              rounded-full
              text-xs font-bold
              uppercase
              tracking-wide
              drop-shadow-lg
              animate-fade-in
            `}
          >
            {difficultyLabels[difficulty]}
          </div>
        )}

        {/* Play Icon (centered when not hovering) */}
        {!isHovering && (
          <div
            className="
              absolute inset-0 flex items-center justify-center
              group-hover:opacity-0 transition-opacity duration-300
            "
          >
            <div className="text-white text-5xl opacity-60 drop-shadow-lg">
              ▶️
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Title */}
        <h3
          className="
            text-xl sm:text-2xl
            font-extrabold
            text-black dark:text-white
            mb-2
            line-clamp-2
            group-hover:text-pink-600
            transition-colors duration-200
          "
        >
          {name}
        </h3>

        {/* Metadata */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          {duration && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
                ⏱️ {duration} MIN
              </span>
            </div>
          )}

          {exerciseCount && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
                🏋️ {exerciseCount} EJERC.
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-col sm:flex-row">
          <ProButton
            variant="primary"
            size="md"
            fullWidth
            onClick={onSelect}
            className="flex-1"
          >
            Seleccionar
          </ProButton>

          {onPlay && (
            <ProButton
              variant="secondary"
              size="md"
              onClick={onPlay}
              className="flex-1 hidden sm:flex"
            >
              Ver Video
            </ProButton>
          )}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      </ProCard>
    </div>
  );
}
