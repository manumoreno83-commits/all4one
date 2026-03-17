"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StatCard } from "@/components/ui/Card";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import BottomNav from "@/components/ui/BottomNav";
import { gradients } from "@/lib/colors";
import { clearState, useApp } from "@/lib/store";

const coachNav = [
  { href: "/coach", label: "Inicio", icon: "🏠" },
  { href: "/coach/builder", label: "Rutinas", icon: "📋" },
  { href: "/coach/athletes", label: "Atletas", icon: "👥" },
  { href: "/coach/admin", label: "Admin", icon: "⚙️" },
];

export default function CoachDashboard() {
  const router = useRouter();
  const { state } = useApp();
  const logout = () => { clearState(); router.push("/login"); };

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
              <p className="text-white/70 text-sm">Buenos días</p>
              <h1 className="text-2xl font-bold text-white">{state.user?.name ?? "Coach"}</h1>
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
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Atletas activos" value={8} icon="👥" color="#2ECC71" />
          <StatCard label="Sesiones hoy" value={2} icon="📅" color="#EC7910" />
          <StatCard label="Rutinas creadas" value={12} icon="📋" color="#496D91" />
          <StatCard label="Alertas lesión" value={2} icon="⚠️" color="#E30518" />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-bold text-[var(--color-brand-dark-blue)] dark:text-white mb-3">
            Acciones rápidas
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Card
              className="text-white"
              gradient={gradients.brand}
              padding="md"
              onClick={() => router.push("/coach/builder?mode=quick")}
            >
              <p className="text-2xl mb-1">⚡</p>
              <p className="font-bold">Modo Rápido</p>
              <p className="text-xs text-white/80">Duplicar rutina</p>
            </Card>
            <Card
              className="text-white"
              gradient={gradients.ocean}
              padding="md"
              onClick={() => router.push("/coach/builder")}
            >
              <p className="text-2xl mb-1">📋</p>
              <p className="font-bold">Nueva Rutina</p>
              <p className="text-xs text-white/80">Constructor completo</p>
            </Card>
            <Card
              className="bg-white dark:bg-[#1C2128]"
              padding="md"
              onClick={() => router.push("/coach/athletes")}
            >
              <p className="text-2xl mb-1">📤</p>
              <p className="font-bold text-[var(--color-brand-dark-blue)] dark:text-white">
                Compartir
              </p>
              <p className="text-xs text-gray-500">WhatsApp / Copiar</p>
            </Card>
          </div>
        </div>

        {/* Today's Sessions */}
        <div>
          <h2 className="text-lg font-bold text-[var(--color-brand-dark-blue)] dark:text-white mb-3">
            Sesiones de hoy
          </h2>
          {[
            { time: "09:00", name: "Fuerza + Umbral Anaeróbico", athletes: 5, status: "Completada" },
            { time: "18:30", name: "HYROX Prep — Sesión 5", athletes: 4, status: "Pendiente" },
          ].map((s, i) => (
            <Card key={i} className="bg-white dark:bg-[#1C2128] mb-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-[var(--color-brand-dark-blue)] dark:text-white">
                    {s.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {s.time} &middot; {s.athletes} atletas
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    s.status === "Completada"
                      ? "bg-green-100 text-green-700"
                      : s.status === "En curso"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {s.status}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Injury Alerts */}
        <div>
          <h2 className="text-lg font-bold text-[var(--color-brand-dark-blue)] dark:text-white mb-3">
            Alertas de lesión
          </h2>
          {[
            { name: "María G.", injury: "Hombro derecho", severity: "Moderada" },
            { name: "Carlos R.", injury: "Rodilla izquierda", severity: "Leve" },
          ].map((a, i) => (
            <Card key={i} className="bg-white dark:bg-[#1C2128] mb-2 border-l-4 border-l-[var(--color-brand-red)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-[var(--color-brand-dark-blue)] dark:text-white">
                    {a.name}
                  </p>
                  <p className="text-sm text-gray-500">{a.injury}</p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 text-red-700">
                  {a.severity}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav items={coachNav} />
    </div>
  );
}
