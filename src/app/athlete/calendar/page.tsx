"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useApp } from "@/lib/store";
import { getAthleteWorkouts } from "@/lib/routines-db";
import Card from "@/components/ui/Card";
import BottomNav from "@/components/ui/BottomNav";
import type { WorkoutStatus } from "@/types";

const athleteNav = [
  { href: "/athlete", label: "Hoy", icon: "■" },
  { href: "/athlete/calendar", label: "Calendario", icon: "●" },
  { href: "/athlete/progress", label: "Progreso", icon: "📊" },
  { href: "/athlete/profile", label: "Perfil", icon: "👤" },
];

const DAYS = ["L", "M", "X", "J", "V", "S", "D"];
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

interface WorkoutDay {
  id: string;
  date: string;
  status: WorkoutStatus;
  routineName: string;
  goal: string;
  difficulty: string;
  estimatedMinutes: number;
}

// Status display config
const STATUS_CONFIG: Record<WorkoutStatus, { label: string; icon: string; color: string; bg: string }> = {
  scheduled: { label: "Programado", icon: "⏳", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/30" },
  in_progress: { label: "En curso", icon: "▶", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/30" },
  completed: { label: "Completado", icon: "✓", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/30" },
  skipped: { label: "Omitido", icon: "✕", color: "text-gray-500 dark:text-gray-400", bg: "bg-gray-50 dark:bg-gray-800/50" },
};

const GOAL_LABELS: Record<string, string> = {
  hyrox: "HYROX",
  deka: "DEKA FIT",
  fat_loss: "Pérdida de grasa",
  general: "General",
  rehab: "Rehabilitación",
};

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado",
  elite: "Elite",
};

// Demo fallback data when no Supabase connection
function getDemoWorkouts(year: number, month: number): WorkoutDay[] {
  const daysWithWorkouts = [1, 3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26, 29];
  const routines = [
    { name: "Fuerza + Umbral", goal: "hyrox", difficulty: "advanced", minutes: 55 },
    { name: "HYROX Prep", goal: "hyrox", difficulty: "intermediate", minutes: 50 },
    { name: "MetCon + Core", goal: "general", difficulty: "advanced", minutes: 45 },
    { name: "Movilidad + Recuperación", goal: "rehab", difficulty: "beginner", minutes: 30 },
  ];
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return daysWithWorkouts
    .filter((d) => d <= new Date(year, month + 1, 0).getDate())
    .map((d, i) => {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const routine = routines[i % routines.length];
      let status: WorkoutStatus = "scheduled";
      if (dateStr < todayStr) status = Math.random() > 0.15 ? "completed" : "skipped";
      else if (dateStr === todayStr) status = "in_progress";

      return {
        id: `demo-${dateStr}`,
        date: dateStr,
        status,
        routineName: `${routine.name} — Sesión ${(i % 5) + 1}`,
        goal: routine.goal,
        difficulty: routine.difficulty,
        estimatedMinutes: routine.minutes,
      };
    });
}

function getDotColor(status: WorkoutStatus): string {
  switch (status) {
    case "completed": return "bg-emerald-400";
    case "in_progress": return "bg-amber-400";
    case "skipped": return "bg-gray-400";
    default: return "bg-blue-400";
  }
}

export default function CalendarPage() {
  const { state } = useApp();
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [workouts, setWorkouts] = useState<WorkoutDay[]>([]);
  const [loading, setLoading] = useState(true);

  // Load workouts from Supabase or fall back to demo
  const loadWorkouts = useCallback(async () => {
    setLoading(true);
    try {
      if (state.user?.id) {
        const data = await getAthleteWorkouts(state.user.id);
        if (data && data.length > 0) {
          const mapped: WorkoutDay[] = data.map((w: Record<string, unknown>) => {
            const routine = w.routines as Record<string, unknown> | null;
            return {
              id: w.id as string,
              date: w.date as string,
              status: w.status as WorkoutStatus,
              routineName: (routine?.name as string) ?? "Entrenamiento",
              goal: (routine?.goal as string) ?? "general",
              difficulty: (routine?.difficulty as string) ?? "intermediate",
              estimatedMinutes: (routine?.estimated_minutes as number) ?? 0,
            };
          });
          setWorkouts(mapped);
          setLoading(false);
          return;
        }
      }
    } catch {
      // Fall through to demo
    }
    setWorkouts(getDemoWorkouts(year, month));
    setLoading(false);
  }, [state.user?.id, year, month]);

  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  // Calendar math
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const cells: (number | null)[] = useMemo(() => {
    const c: (number | null)[] = [];
    for (let i = 0; i < offset; i++) c.push(null);
    for (let d = 1; d <= daysInMonth; d++) c.push(d);
    return c;
  }, [offset, daysInMonth]);

  // Build a map of day -> workouts for current month
  const monthPrefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  const workoutsByDay = useMemo(() => {
    const map = new Map<number, WorkoutDay[]>();
    for (const w of workouts) {
      if (!w.date.startsWith(monthPrefix)) continue;
      const day = parseInt(w.date.split("-")[2], 10);
      const existing = map.get(day) ?? [];
      existing.push(w);
      map.set(day, existing);
    }
    return map;
  }, [workouts, monthPrefix]);

  // Month stats
  const monthStats = useMemo(() => {
    let completed = 0;
    let scheduled = 0;
    let skipped = 0;
    for (const w of workouts) {
      if (!w.date.startsWith(monthPrefix)) continue;
      if (w.status === "completed") completed++;
      else if (w.status === "scheduled" || w.status === "in_progress") scheduled++;
      else if (w.status === "skipped") skipped++;
    }
    return { completed, scheduled, skipped, total: completed + scheduled + skipped };
  }, [workouts, monthPrefix]);

  // Navigate months
  function prevMonth() {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
    setSelectedDay(null);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
    setSelectedDay(null);
  }
  function goToToday() {
    const t = new Date();
    setMonth(t.getMonth());
    setYear(t.getFullYear());
    setSelectedDay(t.getDate());
  }

  const isToday = (day: number) =>
    day === now.getDate() && month === now.getMonth() && year === now.getFullYear();

  const selectedWorkouts = selectedDay ? workoutsByDay.get(selectedDay) ?? [] : [];

  return (
    <div className="min-h-dvh pb-20 bg-[#F6F7F8] dark:bg-[#0D1117]">
      {/* Header with month/year navigation */}
      <div className="px-4 pt-8 pb-2">
        <div className="flex items-center justify-between mb-1">
          <button
            onClick={prevMonth}
            className="w-10 h-10 rounded-full bg-white dark:bg-[#1C2128] flex items-center justify-center shadow-sm active:scale-95 transition-transform"
            aria-label="Mes anterior"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-300">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button onClick={goToToday} className="text-center">
            <h1 className="text-xl font-bold text-[var(--color-brand-dark-blue)] dark:text-white">
              {MONTHS[month]} {year}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">Pulsa para ir a hoy</p>
          </button>
          <button
            onClick={nextMonth}
            className="w-10 h-10 rounded-full bg-white dark:bg-[#1C2128] flex items-center justify-center shadow-sm active:scale-95 transition-transform"
            aria-label="Mes siguiente"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-300">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Month stats bar */}
        {monthStats.total > 0 && (
          <div className="flex items-center justify-center gap-4 py-2 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-gray-500 dark:text-gray-400">{monthStats.completed} completados</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-gray-500 dark:text-gray-400">{monthStats.scheduled} pendientes</span>
            </span>
            {monthStats.skipped > 0 && (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">{monthStats.skipped} omitidos</span>
              </span>
            )}
          </div>
        )}

        {/* Day headers */}
        <div className="grid grid-cols-7 text-center mb-2 mt-2">
          {DAYS.map((d) => (
            <span key={d} className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {d}
            </span>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            const dayWorkouts = day ? workoutsByDay.get(day) : undefined;
            const hasWorkout = !!dayWorkouts && dayWorkouts.length > 0;
            const isSelected = day === selectedDay;
            const today = day ? isToday(day) : false;

            // Determine primary status for multi-workout days
            const primaryStatus = dayWorkouts?.[0]?.status;

            return (
              <button
                key={i}
                onClick={() => day && setSelectedDay(day === selectedDay ? null : day)}
                disabled={!day}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm relative transition-all duration-150 ${
                  isSelected
                    ? "bg-[var(--color-brand-orange)] text-white font-bold shadow-md scale-105"
                    : today
                      ? "bg-[var(--color-brand-dark-blue)] text-white font-bold ring-2 ring-[var(--color-brand-orange)] ring-offset-1 ring-offset-[#F6F7F8] dark:ring-offset-[#0D1117]"
                      : day
                        ? "hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95"
                        : ""
                }`}
              >
                {day && (
                  <>
                    <span className={today && !isSelected ? "relative" : ""}>{day}</span>
                    {hasWorkout && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full absolute bottom-1 transition-colors ${
                          isSelected || today
                            ? "bg-white"
                            : getDotColor(primaryStatus!)
                        }`}
                      />
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center py-6">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-[var(--color-brand-orange)] rounded-full animate-spin" />
        </div>
      )}

      {/* Selected day detail */}
      {selectedDay && !loading && (
        <div className="px-4 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-[var(--color-brand-dark-blue)] dark:text-white">
              {selectedDay} de {MONTHS[month]}
            </h2>
            {isToday(selectedDay) && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--color-brand-orange)] text-white">
                Hoy
              </span>
            )}
          </div>

          {selectedWorkouts.length > 0 ? (
            <div className="space-y-3">
              {selectedWorkouts.map((w) => {
                const statusInfo = STATUS_CONFIG[w.status];
                return (
                  <Card key={w.id} className="bg-white dark:bg-[#1C2128] overflow-hidden">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[var(--color-brand-dark-blue)] dark:text-white truncate">
                          {w.routineName}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          {w.estimatedMinutes > 0 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {w.estimatedMinutes} min
                            </span>
                          )}
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            {GOAL_LABELS[w.goal] ?? w.goal}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            {DIFFICULTY_LABELS[w.difficulty] ?? w.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                        <span>{statusInfo.icon}</span>
                        <span>{statusInfo.label}</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="M17 18a5 5 0 0 0-10 0" />
                  <line x1="12" y1="2" x2="12" y2="9" />
                  <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
                  <line x1="1" y1="18" x2="3" y2="18" />
                  <line x1="21" y1="18" x2="23" y2="18" />
                  <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
                  <line x1="23" y1="22" x2="1" y2="22" />
                  <polyline points="16 5 12 9 8 5" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Día de descanso</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">No hay entrenamientos programados</p>
            </div>
          )}
        </div>
      )}

      {/* Prompt when no day is selected */}
      {!selectedDay && !loading && (
        <div className="px-4 mt-6 text-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Selecciona un día para ver los detalles
          </p>
        </div>
      )}

      <BottomNav items={athleteNav} />
    </div>
  );
}
