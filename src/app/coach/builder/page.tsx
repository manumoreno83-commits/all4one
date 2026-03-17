"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import ProButton from "@/components/ui/Pro/ProButton";
import ProCard from "@/components/ui/Pro/ProCard";
import BottomNav from "@/components/ui/BottomNav";
import QuickModeModal from "@/components/ui/QuickModeModal";
import VideoModal from "@/components/ui/VideoModal";
import { blockColor } from "@/lib/colors";
import { exercises, searchExercises } from "@/lib/exercises";
import { getVideoUrl } from "@/lib/videos";
import type {
  BlockType,
  BlockExercise,
  RoutineBlock,
  TrainingGoal,
  Difficulty,
  Exercise,
  LoadType,
} from "@/types";

const coachNav = [
  { href: "/coach", label: "Inicio", icon: "■" },
  { href: "/coach/builder", label: "Rutinas", icon: "□" },
  { href: "/coach/athletes", label: "Atletas", icon: "◆" },
  { href: "/coach/admin", label: "Admin", icon: "≡" },
];

const BLOCK_TYPES: { type: BlockType; label: string; icon: string }[] = [
  { type: "warmup", label: "Calentamiento", icon: "◯" },
  { type: "strength", label: "Fuerza", icon: "◼" },
  { type: "skill", label: "Técnica", icon: "◊" },
  { type: "conditioning", label: "Acondicionamiento", icon: "►" },
  { type: "endurance", label: "Resistencia", icon: "◐" },
  { type: "mobility", label: "Movilidad", icon: "◬" },
  { type: "recovery", label: "Recuperación", icon: "◻" },
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
  const [selectedBlockForExercise, setSelectedBlockForExercise] = useState<string | null>(null);
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);
  const [selectedVideoExercise, setSelectedVideoExercise] = useState<{ name: string; videoUrl: string } | null>(null);
  // Inline exercise editing: tracks which exercise (by blockId + exId) is expanded for editing
  const [editingExercise, setEditingExercise] = useState<{ blockId: string; exId: string } | null>(null);

  useEffect(() => {
    const mode = searchParams?.get("mode");
    if (mode === "quick") {
      setShowQuickMode(true);
    }
  }, [searchParams]);

  const moveExercise = (blockId: string, fromIndex: number, toIndex: number) => {
    if (toIndex < 0) return;
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== blockId) return b;
        const exs = [...b.exercises];
        if (toIndex >= exs.length) return b;
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
    blockIdCounter = 0;
    exIdCounter = 0;
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

  // Reusable inline exercise editor panel (appears under the exercise row when active)
  const renderInlineEditor = (block: RoutineBlock, ex: BlockExercise) => (
    <div className="px-3 pb-3 pt-2 bg-gray-50 dark:bg-[#0D1117] border-t border-gray-200 dark:border-gray-700 space-y-2">
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide block mb-1">Series</label>
          <input
            type="number"
            inputMode="numeric"
            value={ex.sets}
            min={1}
            onChange={(e) => updateExercise(block.id, ex.id, { sets: parseInt(e.target.value) || 1 })}
            className="w-full h-9 px-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1C2128] text-sm font-bold text-center focus:border-[#FF1493] focus:outline-none transition"
          />
        </div>
        <div>
          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide block mb-1">Reps / Tiempo</label>
          <input
            value={ex.reps}
            onChange={(e) => updateExercise(block.id, ex.id, { reps: e.target.value })}
            placeholder="10, AMRAP, 45s…"
            className="w-full h-9 px-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1C2128] text-sm font-bold focus:border-[#FF1493] focus:outline-none transition"
          />
        </div>
        <div>
          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide block mb-1">Descanso (s)</label>
          <input
            type="number"
            inputMode="numeric"
            value={ex.restSeconds}
            min={0}
            onChange={(e) => updateExercise(block.id, ex.id, { restSeconds: parseInt(e.target.value) || 0 })}
            className="w-full h-9 px-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1C2128] text-sm font-bold text-center focus:border-[#FF1493] focus:outline-none transition"
          />
        </div>
      </div>
      <div>
        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide block mb-1">Carga</label>
        <div className="flex gap-2">
          <input
            value={ex.load}
            onChange={(e) => updateExercise(block.id, ex.id, { load: e.target.value })}
            placeholder="Ej: 60"
            className="flex-1 h-9 px-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1C2128] text-sm focus:border-[#FF1493] focus:outline-none transition"
          />
          <select
            value={ex.loadType}
            onChange={(e) => updateExercise(block.id, ex.id, { loadType: e.target.value as LoadType })}
            className="h-9 px-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1C2128] text-sm focus:border-[#FF1493] focus:outline-none"
          >
            <option value="kg">kg</option>
            <option value="%">%</option>
            <option value="rpe">RPE</option>
          </select>
        </div>
      </div>
      <button
        onClick={() => setEditingExercise(null)}
        className="w-full py-1.5 text-xs font-bold text-white bg-gray-800 dark:bg-gray-600 rounded-lg hover:bg-gray-700 transition"
      >
        ✓ Listo
      </button>
    </div>
  );

  // Exercise row used in both desktop and mobile routine panels
  const renderExerciseRow = (
    block: RoutineBlock,
    ex: BlockExercise,
    exIndex: number,
    totalExercises: number,
  ) => {
    const isEditing = editingExercise?.blockId === block.id && editingExercise?.exId === ex.id;
    return (
      <div
        key={ex.id}
        className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        {/* Row header */}
        <div
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
          onDragOver={(e) => e.preventDefault()}
          className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1C2128] cursor-move hover:bg-gray-50 dark:hover:bg-gray-900/20 transition group"
        >
          {/* Drag handle — desktop only */}
          <span className="hidden md:block text-gray-300 group-hover:text-gray-400 flex-shrink-0 select-none">⠿</span>

          {/* Move buttons — mobile only */}
          <div className="flex flex-col md:hidden gap-0.5 flex-shrink-0">
            <button
              onClick={() => moveExercise(block.id, exIndex, exIndex - 1)}
              disabled={exIndex === 0}
              className="text-gray-400 hover:text-gray-700 disabled:opacity-20 text-[10px] leading-none p-0.5"
              aria-label="Subir"
            >▲</button>
            <button
              onClick={() => moveExercise(block.id, exIndex, exIndex + 1)}
              disabled={exIndex === totalExercises - 1}
              className="text-gray-400 hover:text-gray-700 disabled:opacity-20 text-[10px] leading-none p-0.5"
              aria-label="Bajar"
            >▼</button>
          </div>

          {/* Exercise info */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
              {ex.exerciseName || "Sin nombre"}
            </p>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {ex.sets} × {ex.reps}
              {ex.load ? ` @ ${ex.load}${ex.loadType}` : ""}
              {ex.restSeconds > 0 ? ` · ${ex.restSeconds}s` : ""}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {getVideoUrl(ex.exerciseId) && (
              <button
                onClick={() => {
                  const videoUrl = getVideoUrl(ex.exerciseId);
                  if (videoUrl) setSelectedVideoExercise({ name: ex.exerciseName, videoUrl });
                }}
                className="p-1.5 text-pink-500 hover:text-pink-700 transition"
                title="Ver video"
              >▶</button>
            )}
            <button
              onClick={() =>
                setEditingExercise(isEditing ? null : { blockId: block.id, exId: ex.id })
              }
              className={`p-1.5 rounded transition text-sm ${
                isEditing
                  ? "text-white bg-gray-800 dark:bg-gray-600"
                  : "text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              title="Editar series, reps, descanso"
            >
              ✎
            </button>
            <button
              onClick={() => removeExercise(block.id, ex.id)}
              className="p-1.5 rounded text-gray-400 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition text-sm"
              title="Eliminar ejercicio"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Inline editor — expands below row when ✎ is active */}
        {isEditing && renderInlineEditor(block, ex)}
      </div>
    );
  };

  // Shared block card rendering for both desktop and mobile
  const renderBlockCard = (block: RoutineBlock, blockIndex: number) => (
    <div
      key={block.id}
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
      style={{
        opacity: dragBlock === blockIndex ? 0.5 : 1,
        borderLeft: `4px solid ${blockColor(block.type)}`,
      }}
      className="rounded-lg overflow-hidden"
    >
      <ProCard variant="light" className="p-0">
        {/* Block header */}
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-gray-300 hidden md:block select-none">⠿</span>
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex-shrink-0"
              style={{
                backgroundColor: blockColor(block.type) + "20",
                color: blockColor(block.type),
              }}
            >
              {BLOCK_TYPES.find((b) => b.type === block.type)?.label}
            </span>
            <input
              value={block.name}
              onChange={(e) =>
                setBlocks((prev) =>
                  prev.map((b) =>
                    b.id === block.id ? { ...b, name: e.target.value } : b
                  )
                )
              }
              onFocus={() => setEditingBlock(block.id)}
              onBlur={() => setEditingBlock(null)}
              className="flex-1 min-w-0 bg-transparent text-sm font-semibold text-gray-800 dark:text-white border-0 outline-none focus:bg-gray-50 dark:focus:bg-[#161B22] rounded px-1 py-0.5 transition"
            />
          </div>
          <button
            onClick={() => removeBlock(block.id)}
            className="ml-2 text-gray-400 hover:text-pink-600 transition flex-shrink-0 p-1"
            aria-label="Eliminar bloque"
          >
            ✕
          </button>
        </div>

        {/* Block notes */}
        <div className="px-3 py-1.5 border-b border-gray-50 dark:border-gray-800">
          <input
            value={block.notes}
            onChange={(e) =>
              setBlocks((prev) =>
                prev.map((b) => (b.id === block.id ? { ...b, notes: e.target.value } : b))
              )
            }
            placeholder="Notas del bloque (ej: 3 rondas, descanso 2 min entre rondas…)"
            className="w-full bg-transparent text-xs text-gray-500 dark:text-gray-400 border-0 outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600"
          />
        </div>

        {/* Exercise list — no height cap, shows all exercises */}
        <div
          className="px-3 py-2 space-y-2"
          onDragOver={(e) => {
            // Accept exercises dragged from the library
            if (!e.dataTransfer.types.includes("exercise")) return;
            e.preventDefault();
            e.dataTransfer.dropEffect = "copy";
          }}
          onDrop={(e) => {
            e.preventDefault();
            const exData = e.dataTransfer.getData("exercise");
            if (exData) {
              addExercise(JSON.parse(exData), block.id);
            }
          }}
        >
          {block.exercises.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-3 border border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
              Sin ejercicios · Arrastra aquí o usa el botón
            </p>
          ) : (
            block.exercises.map((ex, exIndex) =>
              renderExerciseRow(block, ex, exIndex, block.exercises.length)
            )
          )}
        </div>

        {/* Add exercise button */}
        <div className="px-3 pb-3">
          <button
            onClick={() => {
              setSelectedBlockForExercise(block.id);
              setShowExerciseSelector(true);
            }}
            className="w-full py-2 text-xs font-semibold text-pink-600 border border-dashed border-pink-300 dark:border-pink-800 rounded-lg hover:border-pink-500 hover:text-pink-700 hover:bg-pink-50/50 dark:hover:bg-pink-900/10 transition"
          >
            ＋ Añadir ejercicio
          </button>
        </div>
      </ProCard>
    </div>
  );

  return (
    <div className="min-h-dvh pb-20 bg-[#F6F7F8] dark:bg-[#0D1117] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-8 pb-6 bg-white dark:bg-[#1C2128] border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Image src="/logo-nano-banana.svg" alt="Pro Training" width={48} height={48} />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Constructor de Rutinas
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ProButton variant="secondary" size="lg" onClick={() => setShowQuickMode(true)}>
              ▸ Cargar
            </ProButton>
            <ProButton variant="primary" size="lg" onClick={saveRoutine}>
              {saved ? "✓ Guardada" : "Guardar"}
            </ProButton>
          </div>
        </div>

        {/* Routine metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
              Nombre de Rutina
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#161B22] text-sm font-bold text-gray-900 dark:text-white focus:border-[#FF1493] focus:outline-none transition"
              placeholder="Ej: HYROX Prep"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Meta</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as TrainingGoal)}
              className="w-full h-11 px-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#161B22] text-sm font-medium text-gray-900 dark:text-white focus:border-[#FF1493] focus:outline-none"
            >
              <option value="general">General</option>
              <option value="hyrox">HYROX</option>
              <option value="deka">DEKA</option>
              <option value="fat_loss">Pérdida de Grasa</option>
              <option value="rehab">Rehabilitación</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Nivel</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              className="w-full h-11 px-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#161B22] text-sm font-medium text-gray-900 dark:text-white focus:border-[#FF1493] focus:outline-none"
            >
              <option value="beginner">Principiante</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
              <option value="elite">Elite</option>
            </select>
          </div>
        </div>
      </div>

      {/* ===== DESKTOP: side-by-side split ===== */}
      <div className="hidden lg:flex flex-1 overflow-hidden gap-3 p-4">
        {/* LEFT: Exercise library */}
        <div className="w-1/2 bg-white dark:bg-[#1C2128] rounded-xl shadow-sm flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3">
              Librería de Ejercicios
            </h2>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar ejercicio…"
              className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-[#161B22] text-sm font-medium text-gray-900 dark:text-white focus:border-[#FF1493] focus:outline-none transition"
            />
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5">
            {filteredExercises.map((ex) => (
              <div
                key={ex.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = "copy";
                  e.dataTransfer.setData("exercise", JSON.stringify(ex));
                }}
                className="p-3 bg-white dark:bg-[#1C2128] rounded-lg cursor-grab hover:shadow-md transition border border-gray-100 dark:border-gray-700 flex items-center justify-between group"
              >
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{ex.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{ex.category}</p>
                </div>
                {getVideoUrl(ex.id) && (
                  <button
                    onClick={() => {
                      const videoUrl = getVideoUrl(ex.id);
                      if (videoUrl) setSelectedVideoExercise({ name: ex.name, videoUrl });
                    }}
                    className="ml-2 text-pink-500 hover:text-pink-700 flex-shrink-0 transition"
                    title="Ver video"
                  >▶</button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Routine builder */}
        <div className="w-1/2 bg-white dark:bg-[#1C2128] rounded-xl shadow-sm flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              Rutina Actual
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {blocks.reduce((s, b) => s + b.durationMinutes, 0)} min
              {" · "}
              {blocks.reduce((s, b) => s + b.exercises.length, 0)} ejercicios
            </p>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {blocks.map((block, blockIndex) => renderBlockCard(block, blockIndex))}

            {/* Add block buttons */}
            <div className="flex flex-wrap gap-2 pt-1">
              {BLOCK_TYPES.map((bt) => (
                <button
                  key={bt.type}
                  onClick={() => addBlock(bt.type)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-[#1C2128] border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#252d38] text-gray-700 dark:text-gray-300 transition"
                >
                  {bt.icon} {bt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE: tabbed view ===== */}
      <div className="lg:hidden flex-1 flex flex-col overflow-hidden">
        {/* Tab buttons */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1C2128]">
          <button
            onClick={() => setTab("exercises")}
            className={`flex-1 py-3 px-4 font-semibold text-sm transition ${
              tab === "exercises"
                ? "border-b-2 border-[#FF1493] text-[#FF1493]"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Ejercicios
          </button>
          <button
            onClick={() => setTab("routine")}
            className={`flex-1 py-3 px-4 font-semibold text-sm transition ${
              tab === "routine"
                ? "border-b-2 border-[#FF1493] text-[#FF1493]"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Rutina ({blocks.reduce((s, b) => s + b.exercises.length, 0)})
          </button>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          {/* ── Exercises tab ── */}
          {tab === "exercises" && (
            <div className="space-y-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar ejercicio…"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1C2128] text-sm font-medium text-gray-900 dark:text-white focus:border-[#FF1493] focus:outline-none transition mb-1"
              />
              {filteredExercises.map((ex) => (
                <div
                  key={ex.id}
                  className="p-3 bg-white dark:bg-[#1C2128] rounded-lg border border-gray-100 dark:border-gray-700 flex items-center justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{ex.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{ex.category}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                    {getVideoUrl(ex.id) && (
                      <button
                        onClick={() => {
                          const videoUrl = getVideoUrl(ex.id);
                          if (videoUrl) setSelectedVideoExercise({ name: ex.name, videoUrl });
                        }}
                        className="text-pink-500 hover:text-pink-700 transition"
                        title="Ver video"
                      >▶</button>
                    )}
                    <button
                      onClick={() => {
                        if (!selectedBlockForExercise) {
                          // If no block selected, show block selector or default to first block
                          if (blocks.length > 0) addExercise(ex, blocks[blocks.length - 1].id);
                        } else {
                          addExercise(ex, selectedBlockForExercise);
                        }
                        setTab("routine");
                      }}
                      className="px-3 py-1.5 text-xs font-bold bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-700 transition"
                    >
                      + Añadir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Routine tab ── */}
          {tab === "routine" && (
            <div className="space-y-3">
              {blocks.map((block, blockIndex) => renderBlockCard(block, blockIndex))}
              <div className="flex flex-wrap gap-2 pt-1">
                {BLOCK_TYPES.map((bt) => (
                  <button
                    key={bt.type}
                    onClick={() => addBlock(bt.type)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-[#1C2128] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#252d38] transition"
                  >
                    {bt.icon} {bt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <QuickModeModal
        isOpen={showQuickMode}
        onClose={() => setShowQuickMode(false)}
        onSelectRoutine={loadRoutineForDuplication}
      />

      {selectedVideoExercise && (
        <VideoModal
          isOpen={!!selectedVideoExercise}
          onClose={() => setSelectedVideoExercise(null)}
          exerciseName={selectedVideoExercise.name}
          videoUrl={selectedVideoExercise.videoUrl}
        />
      )}

      {/* Mobile exercise selector — full-screen search sheet */}
      {showExerciseSelector && selectedBlockForExercise && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden flex flex-col">
          <div className="bg-white dark:bg-[#0D1117] w-full h-full flex flex-col">
            {/* Header */}
            <div className="sticky top-0 bg-gray-900 dark:bg-gray-800 text-white px-4 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="font-bold text-base">Añadir ejercicio</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  → {blocks.find(b => b.id === selectedBlockForExercise)?.name}
                </p>
              </div>
              <button
                onClick={() => { setShowExerciseSelector(false); setSearch(""); }}
                className="p-2 text-gray-400 hover:text-white transition"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            {/* Search */}
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <input
                type="text"
                placeholder="Buscar ejercicio…"
                value={search}
                autoFocus
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1C2128] text-sm font-medium focus:border-[#FF1493] focus:outline-none transition"
              />
            </div>

            {/* Exercise list */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
              {searchExercises(search || " ").map((ex) => (
                <div
                  key={ex.id}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900/20 transition"
                >
                  <button
                    onClick={() => {
                      addExercise(ex, selectedBlockForExercise);
                      setShowExerciseSelector(false);
                      setSearch("");
                    }}
                    className="flex-1 text-left"
                  >
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">{ex.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{ex.category}</p>
                  </button>
                  {getVideoUrl(ex.id) && (
                    <button
                      onClick={() => {
                        const videoUrl = getVideoUrl(ex.id);
                        if (videoUrl) setSelectedVideoExercise({ name: ex.name, videoUrl });
                      }}
                      className="ml-3 text-pink-500 hover:text-pink-700 transition flex-shrink-0"
                      title="Ver video"
                    >▶</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <BottomNav items={coachNav} />
    </div>
  );
}
