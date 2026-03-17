"use client";

import React, { useState, useEffect } from "react";
import ProCard from "@/components/ui/Pro/ProCard";
import ProBadge from "@/components/ui/Pro/ProBadge";
import ProButton from "@/components/ui/Pro/ProButton";
import BottomNav from "@/components/ui/BottomNav";
import { getUsers } from "@/lib/admin-store";
import type { User } from "@/types";

const coachNav = [
  { href: "/coach", label: "Inicio", icon: "■" },
  { href: "/coach/builder", label: "Rutinas", icon: "□" },
  { href: "/coach/athletes", label: "Atletas", icon: "◆" },
  { href: "/coach/admin", label: "Admin", icon: "≡" },
];

const goalLabels: Record<string, string> = {
  hyrox: "HYROX", deka: "DEKA", fat_loss: "Pérdida de Grasa", general: "General", rehab: "Rehabilitación",
};

const levelLabels: Record<string, string> = {
  beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzado", elite: "Élite",
};

const injLabels: Record<string, string> = {
  shoulder: "Hombro", knee: "Rodilla", lower_back: "Lumbar", hip: "Cadera",
  ankle: "Tobillo", wrist: "Muñeca", elbow: "Codo", neck: "Cuello", none: "Ninguna",
};

export default function AthletesPage() {
  const [athletes, setAthletes] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    // Load only real athletes (role === "athlete") from the shared store
    const all = getUsers();
    setAthletes(all.filter((u) => u.role === "athlete"));
  }, []);

  const filtered = athletes.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-dvh pb-20 bg-[#F6F7F8] dark:bg-[#0D1117]">
      {/* Header */}
      <div className="px-4 pt-8 pb-4 bg-white dark:bg-[#1C2128] border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Atletas
            <span className="ml-2 text-sm font-semibold text-gray-400">({filtered.length})</span>
          </h1>
          <a href="/coach/admin">
            <ProButton variant="primary" size="sm">+ Nuevo atleta</ProButton>
          </a>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar atleta por nombre o email…"
          className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#161B22] text-sm font-medium text-gray-900 dark:text-white focus:border-[#FF1493] focus:outline-none transition"
        />
      </div>

      {/* List */}
      <div className="px-4 pt-4 space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">◆</p>
            <p className="font-bold text-gray-700 dark:text-white text-lg">
              {athletes.length === 0 ? "Sin atletas registrados" : "Sin resultados"}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {athletes.length === 0
                ? "Añade atletas reales desde el panel de Admin"
                : `No hay atletas que coincidan con "${search}"`}
            </p>
            {athletes.length === 0 && (
              <a href="/coach/admin" className="inline-block mt-6">
                <ProButton variant="primary" size="lg">Ir al Admin → Crear atleta</ProButton>
              </a>
            )}
          </div>
        ) : (
          filtered.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelectedId(selectedId === a.id ? null : a.id)}
              className="w-full text-left transition-all"
            >
              <ProCard className="bg-white dark:bg-[#1C2128]">
                <div className="flex items-center gap-3">
                  {/* Avatar initial */}
                  <div className="w-12 h-12 rounded-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center text-white dark:text-gray-900 font-bold text-lg flex-shrink-0">
                    {a.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 dark:text-white truncate">{a.name}</p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{a.email}</p>
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      <ProBadge label={goalLabels[a.goal] ?? a.goal} variant="secondary" size="sm" />
                      <ProBadge label={levelLabels[a.level] ?? a.level} variant="info" size="sm" />
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-semibold text-gray-500">{a.daysPerWeek}d/sem</p>
                    {a.injuries.length > 0 && (
                      <span className="text-xs font-semibold text-[#FF1493] mt-0.5 block">▲ Lesión</span>
                    )}
                  </div>
                </div>

                {/* Expanded detail */}
                {selectedId === a.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Meta</p>
                        <p className="font-semibold text-gray-900 dark:text-white mt-0.5">{goalLabels[a.goal] ?? a.goal}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Nivel</p>
                        <p className="font-semibold text-gray-900 dark:text-white mt-0.5">{levelLabels[a.level] ?? a.level}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Frecuencia</p>
                        <p className="font-semibold text-gray-900 dark:text-white mt-0.5">{a.daysPerWeek} días/semana</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Lesiones</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {a.injuries.length > 0 ? (
                            a.injuries.map((inj) => (
                              <ProBadge key={inj} label={injLabels[inj] ?? inj} variant="error" size="sm" />
                            ))
                          ) : (
                            <span className="text-xs text-gray-500 font-medium">Sin lesiones</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </ProCard>
            </button>
          ))
        )}
      </div>

      <BottomNav items={coachNav} />
    </div>
  );
}
