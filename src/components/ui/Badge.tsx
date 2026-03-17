"use client";

import React from "react";

// Generic badge
export default function Badge({
  label,
  color = "var(--color-brand-medium-blue)",
  className = "",
}: {
  label: string;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${className}`}
      style={{ background: color }}
    >
      {label}
    </span>
  );
}

// Injury badge with icon
export function InjuryBadge({ injury }: { injury: string }) {
  const injuryColors: Record<string, string> = {
    shoulder: "var(--color-brand-orange)",
    knee: "var(--color-brand-red)",
    lower_back: "#9B59B6",
    hip: "#E67E22",
    ankle: "#3498DB",
    wrist: "#1ABC9C",
    elbow: "#F39C12",
    neck: "#8E44AD",
  };
  const injLabels: Record<string, string> = {
    shoulder: "Hombro", knee: "Rodilla", lower_back: "Lumbar", hip: "Cadera",
    ankle: "Tobillo", wrist: "Muñeca", elbow: "Codo", neck: "Cuello",
  };
  return (
    <Badge
      label={injLabels[injury] ?? injury.replace("_", " ")}
      color={injuryColors[injury] ?? "var(--color-brand-medium-blue)"}
    />
  );
}

// Block type badge
export function BlockBadge({ type }: { type: string }) {
  const blockColors: Record<string, string> = {
    warmup: "var(--color-block-warmup)",
    strength: "var(--color-block-strength)",
    skill: "var(--color-block-skill)",
    conditioning: "var(--color-block-conditioning)",
    endurance: "var(--color-block-endurance)",
    mobility: "var(--color-block-mobility)",
    recovery: "var(--color-block-recovery)",
  };
  const blockLabels: Record<string, string> = {
    warmup: "Calentamiento", strength: "Fuerza", skill: "Técnica",
    conditioning: "Acondicionamiento", endurance: "Resistencia",
    mobility: "Movilidad", recovery: "Recuperación",
  };
  return <Badge label={blockLabels[type] ?? type} color={blockColors[type] ?? "#496D91"} />;
}

// Difficulty badge
export function DifficultyBadge({ level }: { level: string }) {
  const levelColors: Record<string, string> = {
    beginner: "#2ECC71",
    intermediate: "#F39C12",
    advanced: "#E74C3C",
    elite: "#8E44AD",
  };
  const levelLabels: Record<string, string> = {
    beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzado", elite: "Élite",
  };
  return <Badge label={levelLabels[level] ?? level} color={levelColors[level] ?? "#496D91"} />;
}
