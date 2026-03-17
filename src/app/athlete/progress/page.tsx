"use client";

import React from "react";
import Card from "@/components/ui/Card";
import { StatCard } from "@/components/ui/Card";
import BottomNav from "@/components/ui/BottomNav";

const athleteNav = [
  { href: "/athlete", label: "Hoy", icon: "■" },
  { href: "/athlete/calendar", label: "Calendario", icon: "●" },
  { href: "/athlete/progress", label: "Progreso", icon: "📊" },
  { href: "/athlete/profile", label: "Perfil", icon: "👤" },
];

const MONTHLY_DATA = [
  { week: "Sem 1", sessions: 4, minutes: 210 },
  { week: "Sem 2", sessions: 5, minutes: 265 },
  { week: "Sem 3", sessions: 5, minutes: 280 },
];

const PRS = [
  { exercise: "Back Squat", value: "105 kg", date: "17 Mar", prev: "100 kg", icon: "🏋️" },
  { exercise: "Deadlift", value: "120 kg", date: "14 Mar", prev: "115 kg", icon: "▪" },
  { exercise: "5K Run", value: "24:30", date: "10 Mar", prev: "25:10", icon: "►" },
  { exercise: "Row 2K", value: "7:45", date: "7 Mar", prev: "8:02", icon: "◀" },
  { exercise: "Clean & Jerk", value: "75 kg", date: "5 Mar", prev: "72 kg", icon: "🏋️" },
  { exercise: "Sled Push 50m", value: "0:38", date: "3 Mar", prev: "0:42", icon: "🛷" },
];

export default function ProgressPage() {
  const totalSessions = MONTHLY_DATA.reduce((s, w) => s + w.sessions, 0);
  const totalMinutes = MONTHLY_DATA.reduce((s, w) => s + w.minutes, 0);
  const maxMin = Math.max(...MONTHLY_DATA.map((w) => w.minutes), 1);

  return (
    <div className="min-h-dvh pb-20 bg-[#F6F7F8] dark:bg-[#0D1117]">
      <div className="px-4 pt-8">
        <h1 className="text-2xl font-bold text-[var(--color-brand-dark-blue)] dark:text-white mb-6">
          Tu Progreso
        </h1>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatCard label="Entrenos este mes" value={totalSessions} icon="🏋️" color="#2ECC71" />
          <StatCard label="Horas entrenadas" value={`${Math.round(totalMinutes / 60)}h`} icon="⏱️" color="#EC7910" />
          <StatCard label="Records personales" value={PRS.length} icon="★" color="#FDC300" />
          <StatCard label="Racha actual" value="12 días" icon="◯" color="#E30518" />
        </div>

        {/* Monthly Activity */}
        <Card className="bg-white dark:bg-[#1C2128] mb-6">
          <h2 className="font-bold text-[var(--color-brand-dark-blue)] dark:text-white mb-4">
            Este mes — Marzo
          </h2>
          <div className="flex items-end justify-between h-32 gap-3">
            {MONTHLY_DATA.map((w) => (
              <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col justify-end h-24">
                  <div
                    className="w-full rounded-t-lg transition-all"
                    style={{
                      height: `${(w.minutes / maxMin) * 100}%`,
                      background: "var(--color-brand-orange)",
                      minHeight: "8px",
                    }}
                  />
                </div>
                <span className="text-[10px] text-gray-500">{w.week}</span>
                <span className="text-[10px] font-medium text-[var(--color-brand-dark-blue)] dark:text-white">
                  {w.sessions} sesiones
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-3">
            Total: {totalMinutes} min ({Math.round(totalMinutes / 60)}h) este mes
          </p>
        </Card>

        {/* PRs */}
        <div>
          <h2 className="text-lg font-bold text-[var(--color-brand-dark-blue)] dark:text-white mb-3">
            Records Personales
          </h2>
          {PRS.map((pr, i) => (
            <Card key={i} className="bg-white dark:bg-[#1C2128] mb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{pr.icon}</span>
                  <div>
                    <p className="font-bold text-sm text-[var(--color-brand-dark-blue)] dark:text-white">
                      {pr.exercise}
                    </p>
                    <p className="text-xs text-gray-500">
                      {pr.date} &middot; anterior: {pr.prev}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-bold text-[var(--color-brand-orange)]">{pr.value}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav items={athleteNav} />
    </div>
  );
}
