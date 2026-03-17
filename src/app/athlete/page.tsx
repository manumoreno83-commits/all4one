"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useApp, clearState } from "@/lib/store";
import Card from "@/components/ui/Card";
import { StatCard } from "@/components/ui/Card";
import BottomNav from "@/components/ui/BottomNav";
import { gradients } from "@/lib/colors";

const athleteNav = [
  { href: "/athlete", label: "Hoy", icon: "🏠" },
  { href: "/athlete/calendar", label: "Calendario", icon: "📅" },
  { href: "/athlete/progress", label: "Progreso", icon: "📊" },
  { href: "/athlete/profile", label: "Perfil", icon: "👤" },
];

// Demo workout for today
const TODAY_WORKOUT = {
  name: "DÍA 1 — Fuerza + Umbral",
  blocks: [
    { type: "strength", name: "Fuerza", duration: 25, exercises: [
      "Back Squat 4×3 @80% — 1 rep, descanso 15\", 2ª rep, descanso 15\", 3ª rep, descanso 3 min",
      "STOP 1 min",
      "Deadlift 4×3 @70% — Rest 2 min entre series",
    ]},
    { type: "conditioning", name: "Umbral Anaeróbico", duration: 30, exercises: [
      "2 RONDAS:",
      "1000m Run",
      "40m Burpees Broad Jump (4×10m)",
      "1000m Row",
      "40 Wall Ball",
    ]},
  ],
  totalMinutes: 55,
};

// Recent PRs
const RECENT_PRS = [
  { exercise: "Back Squat", value: "105 kg", date: "17 Mar", icon: "🏋️" },
  { exercise: "Deadlift", value: "120 kg", date: "14 Mar", icon: "💪" },
  { exercise: "5K Run", value: "24:30", date: "10 Mar", icon: "🏃" },
  { exercise: "Row 2K", value: "7:45", date: "7 Mar", icon: "🚣" },
];

export default function AthleteHome() {
  const { state } = useApp();
  const router = useRouter();
  const logout = () => { clearState(); router.push("/login"); };

  const blockColors: Record<string, string> = {
    warmup: "var(--color-block-warmup)",
    strength: "var(--color-block-strength)",
    conditioning: "var(--color-block-conditioning)",
    mobility: "var(--color-block-mobility)",
  };

  return (
    <div className="min-h-dvh pb-20 bg-[#F6F7F8] dark:bg-[#0D1117]">
      {/* Header */}
      <div
        className="px-6 pt-12 pb-8 rounded-b-3xl"
        style={{ background: gradients.wave }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/logo-small.png"
              alt="ALL4ONE"
              width={56}
              height={56}
              className="drop-shadow-lg"
            />
            <div>
              <p className="text-white/70 text-sm">Bienvenido</p>
              <h1 className="text-2xl font-bold text-white">
                {state.user?.name ?? "Atleta"}
              </h1>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 transition-colors"
            title="Cerrar sesión"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Este mes" value={14} icon="🏋️" />
          <StatCard label="Racha" value="12 días" icon="🔥" />
          <StatCard label="PRs este mes" value={4} icon="🏆" />
        </div>

        {/* Today's Workout */}
        <div>
          <h2 className="text-lg font-bold text-[var(--color-brand-dark-blue)] dark:text-white mb-3">
            Entrenamiento de hoy
          </h2>
          <Card
            className="text-white overflow-hidden mb-3"
            gradient={gradients.energy}
            padding="md"
          >
            <p className="font-bold">{TODAY_WORKOUT.name}</p>
            <p className="text-sm text-white/70 mt-1">
              {TODAY_WORKOUT.totalMinutes} min &middot;{" "}
              {TODAY_WORKOUT.blocks.reduce((s, b) => s + b.exercises.length, 0)}{" "}
              ejercicios
            </p>
          </Card>

          <div className="space-y-3">
            {TODAY_WORKOUT.blocks.map((b, i) => (
              <div
                key={i}
                className="rounded-xl bg-white dark:bg-[#1C2128] shadow-sm overflow-hidden"
                style={{ borderLeft: `4px solid ${blockColors[b.type] ?? "#496D91"}` }}
              >
                <div className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm text-[var(--color-brand-dark-blue)] dark:text-white">
                      {b.name}
                    </p>
                    <span className="text-xs text-gray-500">{b.duration} min</span>
                  </div>
                  <div className="mt-2 space-y-1.5">
                    {b.exercises.map((ex, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                        {ex}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent PRs */}
        <div>
          <h2 className="text-lg font-bold text-[var(--color-brand-dark-blue)] dark:text-white mb-3">
            Records Personales
          </h2>
          {RECENT_PRS.map((pr, i) => (
            <Card key={i} className="bg-white dark:bg-[#1C2128] mb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{pr.icon}</span>
                  <div>
                    <p className="font-bold text-sm text-[var(--color-brand-dark-blue)] dark:text-white">
                      {pr.exercise}
                    </p>
                    <p className="text-xs text-gray-500">{pr.date}</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-[var(--color-brand-orange)]">{pr.value}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-bold text-[var(--color-brand-dark-blue)] dark:text-white mb-3">
            Actividad reciente
          </h2>
          {[
            { day: "Ayer", name: "Fuerza + Umbral Anaeróbico", dur: 58, completed: true },
            { day: "Vie", name: "HYROX Prep — Sesión 4", dur: 52, completed: true },
            { day: "Jue", name: "Fuerza + MetCon", dur: 48, completed: true },
            { day: "Mié", name: "Movilidad + Recuperación", dur: 30, completed: true },
          ].map((w, i) => (
            <Card key={i} className="bg-white dark:bg-[#1C2128] mb-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[var(--color-brand-dark-blue)] dark:text-white text-sm">
                    {w.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {w.day} &middot; {w.dur} min
                  </p>
                </div>
                <span className="text-green-500 text-lg">✓</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav items={athleteNav} />
    </div>
  );
}
