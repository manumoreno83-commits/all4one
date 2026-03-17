"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProButton from "@/components/ui/Pro/ProButton";
import ProCard from "@/components/ui/Pro/ProCard";
import ProInput from "@/components/ui/Pro/ProInput";
import ProModal from "@/components/ui/Pro/ProModal";
import ProBadge from "@/components/ui/Pro/ProBadge";
import BottomNav from "@/components/ui/BottomNav";
import {
  getUsers, addUser, updateUser, deleteUser,
  getExercises, updateExercise, addExercise, deleteExercise,
  getRoutines, deleteRoutine,
} from "@/lib/admin-store";
import type { User, Exercise, Routine, UserRole, TrainingGoal, Difficulty, ExerciseCategory, InjuryType } from "@/types";

const coachNav = [
  { href: "/coach", label: "Inicio", icon: "■" },
  { href: "/coach/builder", label: "Rutinas", icon: "□" },
  { href: "/coach/athletes", label: "Atletas", icon: "◆" },
  { href: "/coach/admin", label: "Admin", icon: "≡" },
];

type Tab = "users" | "exercises" | "routines";

const GOALS: TrainingGoal[] = ["hyrox", "deka", "fat_loss", "general", "rehab"];
const LEVELS: Difficulty[] = ["beginner", "intermediate", "advanced", "elite"];
const ROLES: UserRole[] = ["athlete", "coach", "admin"];
const INJURIES: InjuryType[] = ["none", "shoulder", "knee", "lower_back", "hip", "ankle", "wrist", "elbow", "neck"];
const CATEGORIES: ExerciseCategory[] = ["strength", "conditioning", "endurance", "mobility", "core", "recovery", "hyrox", "deka"];

const catLabels: Record<string, string> = {
  strength: "Fuerza", conditioning: "Acondicionamiento", endurance: "Resistencia",
  mobility: "Movilidad", core: "Core", recovery: "Recuperación", hyrox: "HYROX", deka: "DEKA",
};
const levelLabels: Record<string, string> = {
  beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzado", elite: "Élite",
};
const moveLabels: Record<string, string> = {
  push: "Empuje", pull: "Tirón", squat: "Sentadilla", hinge: "Bisagra",
  carry: "Acarreo", lunge: "Zancada", rotation: "Rotación", gait: "Marcha", static: "Estático",
};
const injLabels: Record<string, string> = {
  shoulder: "Hombro", knee: "Rodilla", lower_back: "Lumbar", hip: "Cadera",
  ankle: "Tobillo", wrist: "Muñeca", elbow: "Codo", neck: "Cuello", none: "Ninguna",
};
const roleLabels: Record<string, string> = {
  athlete: "Atleta", coach: "Coach", admin: "Admin",
};
const goalLabels: Record<string, string> = {
  hyrox: "HYROX", deka: "DEKA", fat_loss: "Pérdida de Grasa", general: "General", rehab: "Rehabilitación",
};

export default function AdminPanel() {
  const [tab, setTab] = useState<Tab>("users");

  return (
    <div className="min-h-dvh pb-20 bg-[#F6F7F8] dark:bg-[#0D1117]">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 bg-white dark:bg-[#1C2128] border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <Image src="/logo-nano-banana.svg" alt="Pro Training" width={48} height={48} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Panel de Admin</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Gestión completa</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-4 mt-4 mb-4">
        {([
          { key: "users", label: "Usuarios", icon: "◆", count: 0 },
          { key: "exercises", label: "Ejercicios", icon: "▪", count: 0 },
          { key: "routines", label: "Rutinas", icon: "□", count: 0 },
        ] as const).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition ${
              tab === t.key
                ? "bg-[#FF1493] text-white shadow-md"
                : "bg-white dark:bg-[#1C2128] text-gray-600 dark:text-gray-400"
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-4">
        {tab === "users" && <UsersTab />}
        {tab === "exercises" && <ExercisesTab />}
        {tab === "routines" && <RoutinesTab />}
      </div>

      <BottomNav items={coachNav} />
    </div>
  );
}

// ════════════════════════════════════════
//  USERS TAB
// ════════════════════════════════════════
function UsersTab() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => { setUsers(getUsers()); }, []);

  const refresh = () => setUsers(getUsers());

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500">{users.length} usuarios</p>
        <ProButton variant="primary" size="sm" onClick={() => setShowAdd(true)}>+ Nuevo</ProButton>
      </div>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="◉ Buscar usuario..." className="w-full px-4 py-2 border-2 border-black dark:border-white rounded-none bg-white dark:bg-slate-900 text-black dark:text-white font-semibold focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all" />

      <div className="space-y-2 mt-3">
        {filtered.map((u) => (
          <ProCard key={u.id} className="bg-white dark:bg-[#1C2128]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-brand-dark-blue)] flex items-center justify-center text-white font-bold">
                {u.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-[var(--color-brand-dark-blue)] dark:text-white truncate">{u.name}</p>
                <p className="text-xs text-gray-500 truncate">{u.email}</p>
                <div className="flex gap-1 mt-1 flex-wrap">
                  <ProBadge label={roleLabels[u.role] ?? u.role} variant={u.role === "coach" ? "primary" : "secondary"} size="sm" />
                  <ProBadge label={goalLabels[u.goal] ?? u.goal} variant="info" size="sm" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <button onClick={() => setEditingUser(u)} className="text-xs px-2 py-1 rounded-lg bg-gray-300 dark:bg-gray-300/20 text-gray-600 font-medium">Editar</button>
                <button onClick={() => setDeleteId(u.id)} className="text-xs px-2 py-1 rounded-lg bg-red-400 dark:bg-red-400/20 text-pink-600 font-medium">Borrar</button>
              </div>
            </div>
          </ProCard>
        ))}
      </div>

      {/* Edit User Modal */}
      <UserFormModal
        open={!!editingUser}
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSave={(u) => { updateUser(u.id, u); refresh(); setEditingUser(null); }}
      />

      {/* Add User Modal */}
      <UserFormModal
        open={showAdd}
        user={null}
        onClose={() => setShowAdd(false)}
        onSave={(u) => { addUser(u); refresh(); setShowAdd(false); }}
      />

      {/* Delete Confirm */}
      <ProModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Eliminar usuario"
        subtitle="¿Estás seguro? Esta acción no se puede deshacer."
        actions={[
          {
            label: "Cancelar",
            onClick: () => setDeleteId(null),
            variant: "secondary",
          },
          {
            label: "Eliminar",
            onClick: () => { if (deleteId) { deleteUser(deleteId); setDeleteId(null); } },
            variant: "primary",
          },
        ]}
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">Esta acción es irreversible.</p>
      </ProModal>
    </>
  );
}

// User form modal (add/edit)
function UserFormModal({
  open, user, onClose, onSave,
}: {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (u: User) => void;
}) {
  const [form, setForm] = useState<User>({
    id: "", name: "", email: "", role: "athlete", goal: "general",
    injuries: [], level: "intermediate", daysPerWeek: 4, createdAt: "",
  });

  useEffect(() => {
    if (user) setForm(user);
    else setForm({
      id: `u-${Date.now()}`, name: "", email: "", role: "athlete", goal: "general",
      injuries: [], level: "intermediate", daysPerWeek: 4, createdAt: new Date().toISOString(),
    });
  }, [user, open]);

  const set = (k: keyof User, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <ProModal isOpen={open} onClose={onClose} title={user ? "Editar usuario" : "Nuevo usuario"} size="md">
      <div className="space-y-4">
        <ProInput label="Nombre" value={form.name} onChange={(e) => set("name", e.target.value)} />
        <ProInput label="Email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">Rol</label>
            <select value={form.role} onChange={(e) => set("role", e.target.value)}
              className="w-full h-12 px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1C2128]">
              {ROLES.map((r) => <option key={r} value={r}>{roleLabels[r] ?? r}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">Meta</label>
            <select value={form.goal} onChange={(e) => set("goal", e.target.value)}
              className="w-full h-12 px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1C2128]">
              {GOALS.map((g) => <option key={g} value={g}>{goalLabels[g] ?? g}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">Nivel</label>
            <select value={form.level} onChange={(e) => set("level", e.target.value)}
              className="w-full h-12 px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1C2128]">
              {LEVELS.map((l) => <option key={l} value={l}>{levelLabels[l] ?? l}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">Días/semana</label>
            <select value={form.daysPerWeek} onChange={(e) => set("daysPerWeek", +e.target.value)}
              className="w-full h-12 px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1C2128]">
              {[1,2,3,4,5,6,7].map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">Lesiones</label>
          <div className="flex flex-wrap gap-2">
            {INJURIES.filter(i => i !== "none").map((inj) => {
              const active = form.injuries.includes(inj);
              return (
                <button key={inj} type="button"
                  onClick={() => set("injuries", active ? form.injuries.filter((i) => i !== inj) : [...form.injuries, inj])}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    active ? "bg-[#FF1493] text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}>
                  {injLabels[inj] ?? inj.replace("_", " ")}
                </button>
              );
            })}
          </div>
        </div>
        <ProButton variant="primary" fullWidth onClick={() => onSave(form)}>
          {user ? "Guardar cambios" : "Crear usuario"}
        </ProButton>
      </div>
    </ProModal>
  );
}

// ════════════════════════════════════════
//  EXERCISES TAB
// ════════════════════════════════════════
function ExercisesTab() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ExerciseCategory | "all">("all");
  const [editingEx, setEditingEx] = useState<Exercise | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => { setExercises(getExercises()); }, []);
  const refresh = () => setExercises(getExercises());

  const filtered = exercises.filter((ex) => {
    const matchCat = category === "all" || ex.category === category;
    const matchSearch = !search || ex.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500">{exercises.length} ejercicios</p>
        <ProButton variant="primary" size="sm" onClick={() => setShowAdd(true)}>+ Nuevo</ProButton>
      </div>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="◉ Buscar ejercicio..." className="w-full px-4 py-2 border-2 border-black dark:border-white rounded-none bg-white dark:bg-slate-900 text-black dark:text-white font-semibold focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all" />
      <div className="flex gap-1.5 overflow-x-auto py-2 -mx-4 px-4 scrollbar-hide">
        <button onClick={() => setCategory("all")}
          className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${category === "all" ? "bg-[#FF1493] text-white" : "bg-white dark:bg-[#1C2128] text-gray-500"}`}>
          Todos
        </button>
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCategory(c)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${category === c ? "bg-[#FF1493] text-white" : "bg-white dark:bg-[#1C2128] text-gray-500"}`}>
            {catLabels[c] ?? c}
          </button>
        ))}
      </div>

      <div className="space-y-1.5 mt-2">
        {filtered.slice(0, 80).map((ex) => (
          <div key={ex.id} className="flex items-center gap-2 bg-white dark:bg-[#1C2128] rounded-xl p-3 shadow-sm">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-[var(--color-brand-dark-blue)] dark:text-white truncate">{ex.name}</p>
              <div className="flex gap-1 mt-0.5">
                <ProBadge label={catLabels[ex.category] ?? ex.category} variant="secondary" size="sm" />
                <ProBadge label={levelLabels[ex.difficulty] ?? ex.difficulty} variant="info" size="sm" />
              </div>
            </div>
            <button onClick={() => setEditingEx(ex)} className="text-xs px-2 py-1 rounded-lg bg-gray-300 dark:bg-gray-300/20 text-gray-600 font-medium">Editar</button>
            <button onClick={() => setDeleteId(ex.id)} className="text-xs px-2 py-1 rounded-lg bg-red-400 dark:bg-red-400/20 text-pink-600 font-medium">×</button>
          </div>
        ))}
        {filtered.length > 80 && <p className="text-center text-xs text-gray-400 py-2">Mostrando 80 de {filtered.length}</p>}
      </div>

      {/* Edit Exercise Modal */}
      <ExerciseFormModal open={!!editingEx} exercise={editingEx}
        onClose={() => setEditingEx(null)}
        onSave={(ex) => { updateExercise(ex.id, ex); refresh(); setEditingEx(null); }} />

      {/* Add Exercise Modal */}
      <ExerciseFormModal open={showAdd} exercise={null}
        onClose={() => setShowAdd(false)}
        onSave={(ex) => { addExercise(ex); refresh(); setShowAdd(false); }} />

      <ProModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Eliminar ejercicio"
        actions={[
          { label: "Cancelar", onClick: () => setDeleteId(null), variant: "secondary" },
          { label: "Eliminar", onClick: () => { if (deleteId) { deleteExercise(deleteId); refresh(); } }, variant: "primary" }
        ]}
      >
        <p className="text-gray-600 dark:text-gray-400">¿Está seguro que desea eliminar este ejercicio?</p>
      </ProModal>
    </>
  );
}

function ExerciseFormModal({
  open, exercise, onClose, onSave,
}: {
  open: boolean; exercise: Exercise | null; onClose: () => void; onSave: (e: Exercise) => void;
}) {
  const blank: Exercise = {
    id: "", name: "", category: "strength", movement: "push", difficulty: "intermediate",
    equipment: [], muscleGroups: [], description: "", cues: [], riskyFor: [],
  };
  const [form, setForm] = useState<Exercise>(blank);
  const [equipStr, setEquipStr] = useState("");
  const [muscleStr, setMuscleStr] = useState("");

  useEffect(() => {
    if (exercise) {
      setForm(exercise);
      setEquipStr(exercise.equipment.join(", "));
      setMuscleStr(exercise.muscleGroups.join(", "));
    } else {
      setForm({ ...blank, id: `ex-${Date.now()}` });
      setEquipStr("");
      setMuscleStr("");
    }
  }, [exercise, open]);

  const set = (k: keyof Exercise, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    onSave({
      ...form,
      equipment: equipStr.split(",").map((s) => s.trim()).filter(Boolean),
      muscleGroups: muscleStr.split(",").map((s) => s.trim()).filter(Boolean),
    });
  };

  return (
    <ProModal isOpen={open} onClose={onClose} title={exercise ? "Editar ejercicio" : "Nuevo ejercicio"} size="lg">
      <div className="space-y-3">
        <ProInput label="Nombre" value={form.name} onChange={(e) => set("name", e.target.value)} />
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">Categoría</label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)}
              className="w-full h-10 px-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1C2128] text-sm">
              {CATEGORIES.map((c) => <option key={c} value={c}>{catLabels[c] ?? c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">Dificultad</label>
            <select value={form.difficulty} onChange={(e) => set("difficulty", e.target.value)}
              className="w-full h-10 px-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1C2128] text-sm">
              {LEVELS.map((l) => <option key={l} value={l}>{levelLabels[l] ?? l}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">Movimiento</label>
            <select value={form.movement} onChange={(e) => set("movement", e.target.value)}
              className="w-full h-10 px-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1C2128] text-sm">
              {["push","pull","squat","hinge","carry","lunge","rotation","gait","static"].map((m) => (
                <option key={m} value={m}>{moveLabels[m] ?? m}</option>
              ))}
            </select>
          </div>
        </div>
        <ProInput label="Equipamiento (separado por comas)" value={equipStr} onChange={(e) => setEquipStr(e.target.value)} placeholder="barra, mancuernas, banco" />
        <ProInput label="Músculos (separado por comas)" value={muscleStr} onChange={(e) => setMuscleStr(e.target.value)} placeholder="cuádriceps, glúteos, core" />
        <ProInput label="Descripción" value={form.description} onChange={(e) => set("description", e.target.value)} />
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">Riesgo por lesión</label>
          <div className="flex flex-wrap gap-1.5">
            {INJURIES.filter(i => i !== "none").map((inj) => {
              const active = form.riskyFor.includes(inj);
              return (
                <button key={inj} type="button"
                  onClick={() => set("riskyFor", active ? form.riskyFor.filter((i) => i !== inj) : [...form.riskyFor, inj])}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition ${
                    active ? "bg-[#FF1493] text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600"
                  }`}>
                  {injLabels[inj] ?? inj.replace("_", " ")}
                </button>
              );
            })}
          </div>
        </div>
        <ProButton variant="primary" fullWidth onClick={save}>
          {exercise ? "Guardar cambios" : "Crear ejercicio"}
        </ProButton>
      </div>
    </ProModal>
  );
}

// ════════════════════════════════════════
//  ROUTINES TAB
// ════════════════════════════════════════
function RoutinesTab() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => { setRoutines(getRoutines()); }, []);
  const refresh = () => setRoutines(getRoutines());

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500">{routines.length} rutinas</p>
        <a href="/coach/builder">
          <ProButton variant="primary" size="sm">+ Nueva rutina</ProButton>
        </a>
      </div>

      {routines.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-3">□</p>
          <p className="font-medium">No hay rutinas creadas</p>
          <p className="text-sm mt-1">Ve al Constructor de Rutinas para crear una</p>
        </div>
      ) : (
        <div className="space-y-2">
          {routines.map((r) => (
            <ProCard key={r.id} className="bg-white dark:bg-[#1C2128]">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-bold text-[var(--color-brand-dark-blue)] dark:text-white">{r.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {r.goal} &middot; {r.difficulty} &middot; ~{r.estimatedMinutes}min
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {r.blocks?.map((b, i) => <ProBadge key={i} label={b.type} variant="secondary" size="sm" />)}
                  </div>
                  {r.blocks?.map((b) => (
                    <div key={b.id} className="mt-2 ml-2">
                      <p className="text-xs font-medium text-gray-500">{b.name}:</p>
                      {b.exercises?.map((ex, i) => (
                        <p key={i} className="text-xs text-gray-400 ml-2">
                          {ex.exerciseName} — {ex.sets}×{ex.reps} {ex.load && `@${ex.load}`}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-1 ml-2">
                  <a href="/coach/builder" className="text-xs px-2 py-1 rounded-lg bg-gray-300 dark:bg-gray-300/20 text-gray-600 font-medium text-center">
                    Editar
                  </a>
                  <button onClick={() => setDeleteId(r.id)}
                    className="text-xs px-2 py-1 rounded-lg bg-red-400 dark:bg-red-400/20 text-pink-600 font-medium">
                    Borrar
                  </button>
                </div>
              </div>
            </ProCard>
          ))}
        </div>
      )}

      <ProModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Eliminar rutina"
        actions={[
          { label: "Cancelar", onClick: () => setDeleteId(null), variant: "secondary" },
          { label: "Eliminar", onClick: () => { if (deleteId) { deleteRoutine(deleteId); refresh(); } }, variant: "primary" }
        ]}
      >
        <p className="text-gray-600 dark:text-gray-400">¿Está seguro que desea eliminar esta rutina?</p>
      </ProModal>
    </>
  );
}
