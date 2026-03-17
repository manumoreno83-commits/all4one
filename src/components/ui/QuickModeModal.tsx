"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button";
import type { RoutineBlock } from "@/types";

interface SavedRoutine {
  id: string;
  name: string;
  goal: string;
  difficulty: string;
  estimatedMinutes: number;
  blocks: RoutineBlock[];
  createdAt: string;
}

interface QuickModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoutine: (routine: SavedRoutine) => void;
}

export default function QuickModeModal({
  isOpen,
  onClose,
  onSelectRoutine,
}: QuickModeModalProps) {
  const [routines, setRoutines] = useState<SavedRoutine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const stored = JSON.parse(localStorage.getItem("a4o_routines") ?? "[]");
      setRoutines(stored);
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#1C2128] rounded-xl shadow-lg w-full max-w-2xl max-h-96 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--color-brand-dark-blue)] dark:text-white">
            ▸ Modo Rápido: Duplicar Rutina
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {loading ? (
            <div className="flex items-center justify-center h-24">
              <p className="text-gray-500">Cargando rutinas...</p>
            </div>
          ) : routines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-24 text-center">
              <p className="text-gray-500 mb-2">No hay rutinas guardadas</p>
              <p className="text-xs text-gray-400">
                Crea una rutina primero para duplicarla
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {routines.map((routine) => (
                <button
                  key={routine.id}
                  onClick={() => {
                    onSelectRoutine(routine);
                    onClose();
                  }}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-500 dark:hover:bg-gray-500/10 hover:border-[var(--color-brand-orange)] transition"
                >
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-[var(--color-brand-dark-blue)] dark:text-white">
                      {routine.name}
                    </h3>
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                      {routine.estimatedMinutes} min
                    </span>
                  </div>
                  <div className="flex gap-2 text-xs text-gray-500">
                    <span>Goal: {routine.goal}</span>
                    <span>•</span>
                    <span>Nivel: {routine.difficulty}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {routine.blocks.length} bloques •{" "}
                    {routine.blocks.reduce((s, b) => s + b.exercises.length, 0)}{" "}
                    ejercicios
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
