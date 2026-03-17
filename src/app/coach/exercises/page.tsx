"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import { SearchInput } from "@/components/ui/Input";
import { BlockBadge, DifficultyBadge } from "@/components/ui/Badge";
import BottomNav from "@/components/ui/BottomNav";
import { exercises } from "@/lib/exercises";
import type { ExerciseCategory, Exercise } from "@/types";

const coachNav = [
  { href: "/coach", label: "Inicio", icon: "■" },
  { href: "/coach/builder", label: "Rutinas", icon: "□" },
  { href: "/coach/athletes", label: "Atletas", icon: "◆" },
  { href: "/coach/admin", label: "Admin", icon: "≡" },
];

const CATEGORIES: { key: ExerciseCategory | "all"; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "strength", label: "Fuerza" },
  { key: "conditioning", label: "Acondicionamiento" },
  { key: "endurance", label: "Resistencia" },
  { key: "mobility", label: "Movilidad" },
  { key: "core", label: "Core" },
  { key: "recovery", label: "Recuperación" },
  { key: "hyrox", label: "HYROX" },
  { key: "deka", label: "DEKA" },
];

export default function ExerciseLibraryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ExerciseCategory | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = exercises.filter((ex) => {
    const matchCat = category === "all" || ex.category === category;
    const matchSearch =
      !search ||
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.muscleGroups.some((m) => m.toLowerCase().includes(search.toLowerCase())) ||
      ex.equipment.some((e) => e.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-dvh pb-20 bg-[#F6F7F8] dark:bg-[#0D1117]">
      <div className="px-4 pt-8 pb-2">
        <h1 className="text-2xl font-bold text-[var(--color-brand-dark-blue)] dark:text-white mb-4">
          Ejercicios ({exercises.length})
        </h1>
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar ejercicio, músculo, equipo..."
        />

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto py-3 -mx-4 px-4 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                category === cat.key
                  ? "bg-[var(--color-brand-orange)] text-white"
                  : "bg-white dark:bg-[#1C2128] text-gray-600 dark:text-gray-400"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-2">
        <p className="text-xs text-gray-400">{filtered.length} ejercicios</p>
        {filtered.slice(0, 100).map((ex) => (
          <Card
            key={ex.id}
            className="bg-white dark:bg-[#1C2128]"
            onClick={() => setExpandedId(expandedId === ex.id ? null : ex.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[var(--color-brand-dark-blue)] dark:text-white">
                  {ex.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {ex.muscleGroups.slice(0, 3).join(", ")}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <BlockBadge type={ex.category} />
                <DifficultyBadge level={ex.difficulty} />
              </div>
            </div>

            {expandedId === ex.id && (
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Equipamiento: </span>
                  <span className="font-medium">{ex.equipment.join(", ") || "Ninguno"}</span>
                </div>
                <div>
                  <span className="text-gray-500">Patrón: </span>
                  <span className="font-medium capitalize">{ex.movement}</span>
                </div>
                <div>
                  <span className="text-gray-500">Músculos: </span>
                  <span className="font-medium">{ex.muscleGroups.join(", ")}</span>
                </div>
                {ex.riskyFor.length > 0 && (
                  <div>
                    <span className="text-gray-500">▲ Riesgo: </span>
                    <span className="font-medium text-[var(--color-brand-red)]">
                      {ex.riskyFor.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>

      <BottomNav items={coachNav} />
    </div>
  );
}
