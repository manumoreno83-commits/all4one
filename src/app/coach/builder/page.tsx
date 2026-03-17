"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { BlockCard } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { BlockBadge } from "@/components/ui/Badge";
import BottomNav from "@/components/ui/BottomNav";
import QuickModeModal from "@/components/ui/QuickModeModal";
import { SearchInput } from "@/components/ui/Input";
import { colors, gradients, blockColor } from "@/lib/colors";
import { exercises, searchExercises } from "@/lib/exercises";
import type {
  BlockType,
  BlockExercise,
  RoutineBlock,
  TrainingGoal,
  Difficulty,
  Exercise,
} from "@/types";

const coachNav = [
  { href: "/coach", label: "Inicio", icon: "🏠" },
  { href: "/coach/builder", label: "Rutinas", icon: "📋" },
  { href: "/coach/athletes", label: "Atletas", icon: "👥" },
  { href: "/coach/admin", label: "Admin", icon: "⚙️" },
];

const BLOCK_TYPES: { type: BlockType; label: string; icon: string }[] = [
  { type: "warmup", label: "Calentamiento", icon: "🔥" },
  { type: "strength", label: "Fuerza", icon: "🏋️" },
  { type: "skill", label: "Técnica", icon: "🎯" },
  { type: "conditioning", label: "Acondicionamiento", icon: "💨" },
  { type: "endurance", label: "Resistencia", icon: "🏃" },
  { type: "mobility", label: "Movilidad", icon: "🧘" },
  { type: "recovery", label: "Recuperación", icon: "🩹" },
];

let blockIdCounter = 0;
let exIdCounter = 0;

function newBlock(type: BlockType): RoutineBlock {
  return {
    id: `b-${++blockIdCounter}`,
    type,
    name: BLOCK_TYPES.find((b) => b.type === type)?.label ?? type,
    exercises: [],
    durationMinutes: type === "warmup" ? 10 : type === "recovery" ? 5 : 15,
    notes: "",
    order: 0,
  };
}

function newBlockExercise(ex: Exercise): BlockExercise {
  return {
    id: `be-${++exIdCounter}`,
    exerciseId: ex.id,
    exerciseName: ex.name,
    sets: 3,
    reps: "10",
    load: "",
    loadType: "kg",
    restSeconds: 60,
    notes: "",
    order: 0,
  };
}

interface SavedRoutine {
  id: string;
  name: string;
  goal: string;
  difficulty: string;
  estimatedMinutes: number;
  blocks: RoutineBlock[];
}

export default function RoutineBuilder() {
  const searchParams = useSearchParams();
  const [name, setName] = useState("Nueva Rutina");
  const [goal, setGoal] = useState<TrainingGoal>("general");
  const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
  const [blocks, setBlocks] = useState<RoutineBlock[]>([newBlock("warmup")]);
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(false);
  const [dragExercise, setDragExercise] = useState<{ blockId: string; exIndex: number } | null>(null);
  const [dragBlock, setDragBlock] = useState<number | null>(null);
  const [editingBlock, setEditingBlock] = useState<string | null>(null);
  const [tab, setTab] = useState<"exercises" | "routine">("routine");
  const [showQuickMode, setShowQuickMode] = useState(false);

  useEffect(() => {
    const mode = searchParams?.get("mode");
    if (mode === "quick") {
      setShowQuickMode(true);
    }
  }, [searchParams]);

  const moveExercise = (blockId: string, fromIndex: number, toIndex: number) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== blockId) return b;
        const exs = [...b.exercises];
        const [moved] = exs.splice(fromIndex, 1);
        exs.splice(toIndex, 0, moved);
        return { ...b, exercises: exs };
      })
    );
  };

  const moveBlock = (fromIndex: number, toIndex: number) => {
    setBlocks((prev) => {
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  };

  const addExercise = (ex: Exercise, blockId: string) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? { ...b, exercises: [...b.exercises, newBlockExercise(ex)] }
          : b
      )
    );
  };

  const removeExercise = (blockId: string, exId: string) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? { ...b, exercises: b.exercises.filter((e) => e.id !== exId) }
          : b
      )
    );
  };

  const updateExercise = (blockId: string, exId: string, updates: Partial<BlockExercise>) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? {
              ...b,
              exercises: b.exercises.map((e) =>
                e.id === exId ? { ...e, ...updates } : e
              ),
            }
          : b
      )
    );
  };

  const addBlock = (type: BlockType) => {
    setBlocks((prev) => [...prev, newBlock(type)]);
  };

  const removeBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const loadRoutineForDuplication = (routine: SavedRoutine) => {
    // Reset block and exercise IDs
    blockIdCounter = 0;
    exIdCounter = 0;

    // Deep clone blocks and reset IDs
    const newBlocks = routine.blocks.map((block) => ({
      ...block,
      id: `b-${++blockIdCounter}`,
      exercises: block.exercises.map((ex) => ({
        ...ex,
        id: `be-${++exIdCounter}`,
      })),
    }));

    setName(`Copia de ${routine.name}`);
    setGoal(routine.goal as TrainingGoal);
    setDifficulty(routine.difficulty as Difficulty);
    setBlocks(newBlocks);
  };

  const saveRoutine = () => {
    const routine = {
      id: `r-${Date.now()}`,
      name,
      description: "",
      blocks,
      goal,
      difficulty,
      estimatedMinutes: blocks.reduce((s, b) => s + b.durationMinutes, 0),
      createdBy: "coach-1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const stored = JSON.parse(localStorage.getItem("a4o_routines") ?? "[]");
    stored.push(routine);
    localStorage.setItem("a4o_routines", JSON.stringify(stored));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const filteredExercises = search
    ? searchExercises(search)
    : exercises.slice(0, 100);

  return (
    <div className="min-h-dvh pb-20 bg-[#F6F7F8] dark:bg-[#0D1117] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-8 pb-6 bg-white dark:bg-[#1C2128] border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Image src="/logo-small.png" alt="ALL4ONE" width={48} height={48} />
            <h1 className="text-2xl font-bold text-[var(--color-brand-dark-blue)] dark:text-white">
              Constructor de Rutinas
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="lg" onClick={() => setShowQuickMode(true)}>
              ⚡ Cargar
            </Button>
            <Button variant="accent" size="lg" onClick={saveRoutine}>
              {saved ? "✓ Guardada!" : "💾 Guardar"}
            </Button>
          </div>
        </div>

        {/* Routine name + goal */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">
              Nombre de Rutina
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-[#161B22] text-sm font-bold text-[var(--color-brand-dark-blue)] dark:text-white focus:border-[var(--color-brand-orange)] transition"
              placeholder="Ej: HYROX Prep"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">Meta</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as TrainingGoal)}
              className="w-full h-12 px-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-[#161B22] text-sm font-medium"
            >
              <option value="general">General</option>
              <option value="hyrox">HYROX</option>
              <option value="deka">DEKA</option>
              <option value="fat_loss">Pérdida de Grasa</option>
              <option value="rehab">Rehabilitación</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">Nivel</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              className="w-full h-12 px-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-[#161B22] text-sm font-medium"
            >
              <option value="beginner">Principiante</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
              <option value="elite">Elite</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs para mobile, split para desktop */}
      <div className="hidden lg:flex flex-1 overflow-hidden gap-2 p-4">
        {/* LEFT: Exercise library */}
        <div className="w-1/2 bg-white dark:bg-[#1C2128] rounded-xl shadow-sm flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-[var(--color-brand-dark-blue)] dark:text-white mb-3">
              📚 Librería de Ejercicios
            </h2>
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Buscar..."
            />
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
            {filteredExercises.map((ex) => (
              <div
                key={ex.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = "copy";
                  e.dataTransfer.setData("exercise", JSON.stringify(ex));
                }}
                className="p-3 bg-white dark:bg-[#1C2128] rounded-lg cursor-move hover:shadow-md transition border border-gray-200 dark:border-gray-700"
              >
                <div>
                  <p className="font-medium text-sm text-[var(--color-brand-dark-blue)] dark:text-white">
                    {ex.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {ex.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Routine builder */}
        <div className="w-1/2 bg-white dark:bg-[#1C2128] rounded-xl shadow-sm flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-[var(--color-brand-dark-blue)] dark:text-white">
              📋 Rutina Actual
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {blocks.reduce((s, b) => s + b.durationMinutes, 0)} min | {blocks.reduce((s, b) => s + b.exercises.length, 0)} ejercicios
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
            {blocks.map((block, blockIndex) => (
              <BlockCard
                key={block.id}
                color={blockColor(block.type)}
                draggable
                onDragStart={(e: React.DragEvent) => {
                  setDragBlock(blockIndex);
                  e.dataTransfer.effectAllowed = "move";
                }}
                onDragOver={(e: React.DragEvent) => {
                  if (dragBlock !== null) e.preventDefault();
                }}
                onDrop={() => {
                  if (dragBlock !== null && dragBlock !== blockIndex) {
                    moveBlock(dragBlock, blockIndex);
                  }
                  setDragBlock(null);
                }}
                onDragEnd={() => setDragBlock(null)}
                style={{ opacity: dragBlock === blockIndex ? 0.5 : 1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">⠿</span>
                    <BlockBadge type={block.type} />
                  </div>
                  <button
                    onClick={() => removeBlock(block.id)}
                    className="text-gray-400 hover:text-red-500 text-sm"
                  >
                    ✕
                  </button>
                </div>

                {/* Block name edit */}
                <input
                  value={editingBlock === block.id ? block.name : block.name}
                  onChange={(e) => {
                    if (editingBlock === block.id) {
                      setBlocks((prev) =>
                        prev.map((b) =>
                          b.id === block.id ? { ...b, name: e.target.value } : b
                        )
                      );
                    }
                  }}
                  onFocus={() => setEditingBlock(block.id)}
                  onBlur={() => setEditingBlock(null)}
                  className="w-full h-8 px-2 rounded mb-2 text-sm font-bold border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#161B22] text-[var(--color-brand-dark-blue)] dark:text-white"
                />

                {/* Block notes */}
                <input
                  value={block.notes}
                  onChange={(e) =>
                    setBlocks((prev) =>
                      prev.map((b) => (b.id === block.id ? { ...b, notes: e.target.value } : b))
                    )
                  }
                  placeholder="Notas (ej: 2 RONDAS, STOP 1 min)"
                  className="w-full h-7 px-2 rounded mb-2 text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#161B22] text-gray-600 dark:text-gray-400"
                />

                {/* Exercises in block */}
                <div className="bg-gray-50 dark:bg-[#161B22] rounded p-2 mb-2 space-y-1 max-h-32 overflow-y-auto"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "copy";
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const exData = e.dataTransfer.getData("exercise");
                    if (exData) {
                      const ex = JSON.parse(exData);
                      addExercise(ex, block.id);
                    }
                  }}
                >
                  {block.exercises.length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-2">Arrastra ejercicios aquí</p>
                  )}
                  {block.exercises.map((ex, exIndex) => (
                    <div
                      key={ex.id}
                      draggable
                      onDragStart={(e) => {
                        e.stopPropagation();
                        setDragExercise({ blockId: block.id, exIndex });
                      }}
                      onDrop={(e) => {
                        e.stopPropagation();
                        if (dragExercise?.blockId === block.id && dragExercise.exIndex !== exIndex) {
                          moveExercise(block.id, dragExercise.exIndex, exIndex);
                        }
                        setDragExercise(null);
                      }}
                      className="p-1.5 bg-white dark:bg-[#1C2128] rounded text-xs border border-gray-200 dark:border-gray-700 flex items-center justify-between cursor-move hover:bg-orange-50 dark:hover:bg-orange-900/10"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-700 dark:text-gray-300 truncate">
                          {ex.exerciseName || 'Sin nombre'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {ex.sets}×{ex.reps}
                          {ex.load && ` @${ex.load}${ex.loadType}`}
                          {ex.restSeconds && ` / ${ex.restSeconds}s`}
                        </div>
                      </div>
                      <button
                        onClick={() => removeExercise(block.id, ex.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </BlockCard>
            ))}

            {/* Add block buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              {BLOCK_TYPES.map((bt) => (
                <button
                  key={bt.type}
                  onClick={() => addBlock(bt.type)}
                  className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-[#1C2128] border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#252d38]"
                >
                  {bt.icon} {bt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile tabbed view */}
      <div className="lg:hidden flex-1 flex flex-col overflow-hidden">
        {/* Tab buttons */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setTab("exercises")}
            className={`flex-1 py-3 px-4 font-medium text-sm transition ${
              tab === "exercises"
                ? "border-b-2 border-[var(--color-brand-orange)] text-[var(--color-brand-orange)]"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            📚 Ejercicios
          </button>
          <button
            onClick={() => setTab("routine")}
            className={`flex-1 py-3 px-4 font-medium text-sm transition ${
              tab === "routine"
                ? "border-b-2 border-[var(--color-brand-orange)] text-[var(--color-brand-orange)]"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            📋 Rutina ({blocks.reduce((s, b) => s + b.exercises.length, 0)})
          </button>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          {tab === "exercises" && (
            <div className="space-y-2 mb-4">
              <SearchInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 Buscar..."
              />
              {filteredExercises.map((ex) => (
                <div
                  key={ex.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.effectAllowed = "copy";
                    e.dataTransfer.setData("exercise", JSON.stringify(ex));
                  }}
                  className="p-3 bg-white dark:bg-[#1C2128] rounded-lg cursor-move hover:shadow-md transition border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm text-[var(--color-brand-dark-blue)] dark:text-white">
                        {ex.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {ex.category}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "routine" && (
            <div className="space-y-2">
              {blocks.map((block, blockIndex) => (
                <BlockCard
                  key={block.id}
                  color={blockColor(block.type)}
                  draggable
                  onDragStart={(e: React.DragEvent) => {
                    setDragBlock(blockIndex);
                    e.dataTransfer.effectAllowed = "move";
                  }}
                  onDragOver={(e: React.DragEvent) => {
                    if (dragBlock !== null) e.preventDefault();
                  }}
                  onDrop={() => {
                    if (dragBlock !== null && dragBlock !== blockIndex) {
                      moveBlock(dragBlock, blockIndex);
                    }
                    setDragBlock(null);
                  }}
                  onDragEnd={() => setDragBlock(null)}
                  style={{ opacity: dragBlock === blockIndex ? 0.5 : 1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">⠿</span>
                      <BlockBadge type={block.type} />
                    </div>
                    <button
                      onClick={() => removeBlock(block.id)}
                      className="text-gray-400 hover:text-red-500 text-sm"
                    >
                      ✕
                    </button>
                  </div>

                  <input
                    value={editingBlock === block.id ? block.name : block.name}
                    onChange={(e) => {
                      if (editingBlock === block.id) {
                        setBlocks((prev) =>
                          prev.map((b) =>
                            b.id === block.id ? { ...b, name: e.target.value } : b
                          )
                        );
                      }
                    }}
                    onFocus={() => setEditingBlock(block.id)}
                    onBlur={() => setEditingBlock(null)}
                    className="w-full h-8 px-2 rounded mb-2 text-sm font-bold border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#161B22] text-[var(--color-brand-dark-blue)] dark:text-white"
                  />

                  <input
                    value={block.notes}
                    onChange={(e) =>
                      setBlocks((prev) =>
                        prev.map((b) => (b.id === block.id ? { ...b, notes: e.target.value } : b))
                      )
                    }
                    placeholder="Notas"
                    className="w-full h-7 px-2 rounded mb-2 text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#161B22] text-gray-600 dark:text-gray-400"
                  />

                  <div className="bg-gray-50 dark:bg-[#161B22] rounded p-2 mb-2 space-y-1 max-h-32 overflow-y-auto"
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = "copy";
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const exData = e.dataTransfer.getData("exercise");
                      if (exData) {
                        const ex = JSON.parse(exData);
                        addExercise(ex, block.id);
                      }
                    }}
                  >
                    {block.exercises.length === 0 && (
                      <p className="text-xs text-gray-400 text-center py-2">Arrastra ejercicios</p>
                    )}
                    {block.exercises.map((ex, exIndex) => (
                      <div
                        key={ex.id}
                        draggable
                        onDragStart={(e) => {
                          e.stopPropagation();
                          setDragExercise({ blockId: block.id, exIndex });
                        }}
                        onDrop={(e) => {
                          e.stopPropagation();
                          if (dragExercise?.blockId === block.id && dragExercise.exIndex !== exIndex) {
                            moveExercise(block.id, dragExercise.exIndex, exIndex);
                          }
                          setDragExercise(null);
                        }}
                        className="p-1.5 bg-white dark:bg-[#1C2128] rounded text-xs border border-gray-200 dark:border-gray-700 flex items-center justify-between cursor-move"
                      >
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {ex.sets}×{ex.reps}
                          {ex.load && ` @${ex.load}${ex.loadType}`}
                        </span>
                        <button
                          onClick={() => removeExercise(block.id, ex.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </BlockCard>
              ))}

              <div className="flex flex-wrap gap-2 pt-2">
                {BLOCK_TYPES.map((bt) => (
                  <button
                    key={bt.type}
                    onClick={() => addBlock(bt.type)}
                    className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-[#1C2128] border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#252d38]"
                  >
                    {bt.icon} {bt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <QuickModeModal
        isOpen={showQuickMode}
        onClose={() => setShowQuickMode(false)}
        onSelectRoutine={loadRoutineForDuplication}
      />

      <BottomNav items={coachNav} />
    </div>
  );
}
