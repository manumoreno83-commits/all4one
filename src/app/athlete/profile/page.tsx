"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useApp, clearState } from "@/lib/store";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { InjuryBadge, DifficultyBadge } from "@/components/ui/Badge";
import Badge from "@/components/ui/Badge";
import BottomNav from "@/components/ui/BottomNav";

const athleteNav = [
  { href: "/athlete", label: "Hoy", icon: "🏠" },
  { href: "/athlete/calendar", label: "Calendario", icon: "📅" },
  { href: "/athlete/progress", label: "Progreso", icon: "📊" },
  { href: "/athlete/profile", label: "Perfil", icon: "👤" },
];

const goalLabels: Record<string, string> = {
  hyrox: "HYROX",
  deka: "DEKA",
  fat_loss: "Pérdida de Grasa",
  general: "General",
  rehab: "Rehabilitación",
};

export default function ProfilePage() {
  const { state, setState } = useApp();
  const router = useRouter();
  const user = state.user;

  const logout = () => {
    clearState();
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-dvh pb-20 bg-[#F6F7F8] dark:bg-[#0D1117]">
      <div className="px-4 pt-8">
        {/* Avatar & Name */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[var(--color-brand-dark-blue)] flex items-center justify-center text-white text-3xl font-bold mb-3">
            {user.name.charAt(0)}
          </div>
          <h1 className="text-xl font-bold text-[var(--color-brand-dark-blue)] dark:text-white">
            {user.name}
          </h1>
          <p className="text-sm text-gray-500">{user.email}</p>
          <div className="flex gap-2 mt-2">
            <Badge label={goalLabels[user.goal] ?? user.goal} color="var(--color-brand-orange)" />
            <DifficultyBadge level={user.level} />
          </div>
        </div>

        {/* Info cards */}
        <Card className="bg-white dark:bg-[#1C2128] mb-4">
          <h2 className="font-bold text-[var(--color-brand-dark-blue)] dark:text-white mb-3">
            Datos de entrenamiento
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Meta</p>
              <p className="font-medium">{goalLabels[user.goal]}</p>
            </div>
            <div>
              <p className="text-gray-500">Nivel</p>
              <p className="font-medium capitalize">{user.level}</p>
            </div>
            <div>
              <p className="text-gray-500">Frecuencia</p>
              <p className="font-medium">{user.daysPerWeek} días/semana</p>
            </div>
            <div>
              <p className="text-gray-500">Lesiones</p>
              <div className="flex flex-wrap gap-1 mt-0.5">
                {(user.injuries ?? []).length > 0 ? (
                  (user.injuries ?? []).map((inj) => (
                    <InjuryBadge key={inj} injury={inj} />
                  ))
                ) : (
                  <span className="text-green-600 text-xs font-medium">
                    Sin lesiones
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-white dark:bg-[#1C2128] mb-4">
          <h2 className="font-bold text-[var(--color-brand-dark-blue)] dark:text-white mb-3">
            Preferencias
          </h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm">Modo oscuro</span>
              <span className="text-xs text-gray-400">Automático (sistema)</span>
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm">Notificaciones</span>
              <span className="text-xs text-gray-400">Activadas</span>
            </label>
          </div>
        </Card>

        <Button
          variant="danger"
          fullWidth
          onClick={logout}
        >
          Cerrar sesión
        </Button>

        <p className="text-center text-xs text-gray-400 mt-6">
          ALL4ONE Functional Fitness Club v1.0
        </p>
      </div>

      <BottomNav items={athleteNav} />
    </div>
  );
}
