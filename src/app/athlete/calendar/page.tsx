"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import BottomNav from "@/components/ui/BottomNav";

const athleteNav = [
  { href: "/athlete", label: "Hoy", icon: "🏠" },
  { href: "/athlete/calendar", label: "Calendario", icon: "📅" },
  { href: "/athlete/progress", label: "Progreso", icon: "📊" },
  { href: "/athlete/profile", label: "Perfil", icon: "👤" },
];

const DAYS = ["L", "M", "X", "J", "V", "S", "D"];
const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

// Demo data: which days have workouts (1-based)
const WORKOUT_DAYS = [1, 3, 5, 7, 8, 10, 12, 14, 15];

export default function CalendarPage() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1; // Monday start

  const cells: (number | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="min-h-dvh pb-20 bg-[#F6F7F8] dark:bg-[#0D1117]">
      <div className="px-4 pt-8 pb-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setMonth((m) => (m === 0 ? 11 : m - 1))}
            className="w-10 h-10 rounded-full bg-white dark:bg-[#1C2128] flex items-center justify-center shadow-sm"
          >
            ←
          </button>
          <h1 className="text-xl font-bold text-[var(--color-brand-dark-blue)] dark:text-white">
            {MONTHS[month]} {year}
          </h1>
          <button
            onClick={() => setMonth((m) => (m === 11 ? 0 : m + 1))}
            className="w-10 h-10 rounded-full bg-white dark:bg-[#1C2128] flex items-center justify-center shadow-sm"
          >
            →
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 text-center mb-2">
          {DAYS.map((d) => (
            <span key={d} className="text-xs font-medium text-gray-400">
              {d}
            </span>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            const hasWorkout = day && WORKOUT_DAYS.includes(day);
            const isSelected = day === selectedDay;
            const isToday = day === new Date().getDate() && month === new Date().getMonth();

            return (
              <button
                key={i}
                onClick={() => day && setSelectedDay(day)}
                disabled={!day}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm relative transition ${
                  isSelected
                    ? "bg-[var(--color-brand-orange)] text-white font-bold"
                    : isToday
                      ? "bg-[var(--color-brand-dark-blue)] text-white font-bold"
                      : day
                        ? "hover:bg-gray-100 dark:hover:bg-gray-800"
                        : ""
                }`}
              >
                {day && (
                  <>
                    {day}
                    {hasWorkout && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full absolute bottom-1 ${
                          isSelected || isToday
                            ? "bg-white"
                            : "bg-[var(--color-brand-orange)]"
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

      {/* Selected day detail */}
      {selectedDay && (
        <div className="px-4 mt-4">
          <h2 className="text-lg font-bold text-[var(--color-brand-dark-blue)] dark:text-white mb-3">
            {selectedDay} de {MONTHS[month]}
          </h2>
          {WORKOUT_DAYS.includes(selectedDay) ? (
            <Card className="bg-white dark:bg-[#1C2128]">
              <p className="font-bold text-[var(--color-brand-dark-blue)] dark:text-white">
                HYROX Prep — Sesión {selectedDay % 5 + 1}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                50 min &middot; 15 ejercicios &middot; Completado ✓
              </p>
            </Card>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p className="text-3xl mb-2">😴</p>
              <p className="text-sm">Día de descanso</p>
            </div>
          )}
        </div>
      )}

      <BottomNav items={athleteNav} />
    </div>
  );
}
