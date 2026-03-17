"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import { SearchInput } from "@/components/ui/Input";
import { InjuryBadge, DifficultyBadge } from "@/components/ui/Badge";
import Badge from "@/components/ui/Badge";
import BottomNav from "@/components/ui/BottomNav";
import type { User } from "@/types";

const coachNav = [
  { href: "/coach", label: "Inicio", icon: "🏠" },
  { href: "/coach/builder", label: "Rutinas", icon: "📋" },
  { href: "/coach/athletes", label: "Atletas", icon: "👥" },
  { href: "/coach/admin", label: "Admin", icon: "⚙️" },
];

// Demo athletes
const DEMO_ATHLETES: User[] = [
  { id: "a1", name: "María García", email: "maria@test.com", role: "athlete", goal: "hyrox", injuries: ["shoulder"], level: "intermediate", daysPerWeek: 4, createdAt: "" },
  { id: "a2", name: "Carlos Rodríguez", email: "carlos@test.com", role: "athlete", goal: "general", injuries: ["knee"], level: "beginner", daysPerWeek: 3, createdAt: "" },
  { id: "a3", name: "Ana López", email: "ana@test.com", role: "athlete", goal: "fat_loss", injuries: [], level: "intermediate", daysPerWeek: 5, createdAt: "" },
  { id: "a4", name: "Pedro Martínez", email: "pedro@test.com", role: "athlete", goal: "hyrox", injuries: [], level: "advanced", daysPerWeek: 5, createdAt: "" },
  { id: "a5", name: "Laura Sánchez", email: "laura@test.com", role: "athlete", goal: "deka", injuries: ["lower_back"], level: "intermediate", daysPerWeek: 4, createdAt: "" },
  { id: "a6", name: "Miguel Torres", email: "miguel@test.com", role: "athlete", goal: "general", injuries: [], level: "beginner", daysPerWeek: 3, createdAt: "" },
  { id: "a7", name: "Elena Ruiz", email: "elena@test.com", role: "athlete", goal: "rehab", injuries: ["hip"], level: "beginner", daysPerWeek: 2, createdAt: "" },
  { id: "a8", name: "David Fernández", email: "david@test.com", role: "athlete", goal: "hyrox", injuries: [], level: "elite", daysPerWeek: 6, createdAt: "" },
];

const goalLabels: Record<string, string> = {
  hyrox: "HYROX", deka: "DEKA", fat_loss: "Pérdida de Grasa", general: "General", rehab: "Rehabilitación",
};

export default function AthletesPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = DEMO_ATHLETES.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const selected = DEMO_ATHLETES.find((a) => a.id === selectedId);

  return (
    <div className="min-h-dvh pb-20 bg-[#F6F7F8] dark:bg-[#0D1117]">
      <div className="px-4 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-[var(--color-brand-dark-blue)] dark:text-white mb-4">
          Atletas ({DEMO_ATHLETES.length})
        </h1>
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar atleta..."
        />
      </div>

      <div className="px-4 space-y-2">
        {filtered.map((a) => (
          <Card
            key={a.id}
            className="bg-white dark:bg-[#1C2128]"
            onClick={() => setSelectedId(selectedId === a.id ? null : a.id)}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[var(--color-brand-dark-blue)] flex items-center justify-center text-white font-bold text-lg">
                {a.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-bold text-[var(--color-brand-dark-blue)] dark:text-white">
                  {a.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge label={goalLabels[a.goal] ?? a.goal} color="var(--color-brand-medium-blue)" />
                  <DifficultyBadge level={a.level} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{a.daysPerWeek} días/sem</p>
                {a.injuries.length > 0 && (
                  <span className="text-xs text-[var(--color-brand-red)]">⚠️ Lesión</span>
                )}
              </div>
            </div>

            {/* Expanded detail */}
            {selectedId === a.id && (
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Meta</p>
                    <p className="font-medium">{goalLabels[a.goal]}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Nivel</p>
                    <p className="font-medium capitalize">{a.level}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Frecuencia</p>
                    <p className="font-medium">{a.daysPerWeek} días/semana</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Lesiones</p>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {a.injuries.length > 0 ? (
                        a.injuries.map((inj) => (
                          <InjuryBadge key={inj} injury={inj} />
                        ))
                      ) : (
                        <span className="text-green-600 text-xs font-medium">Sin lesiones</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      <BottomNav items={coachNav} />
    </div>
  );
}
