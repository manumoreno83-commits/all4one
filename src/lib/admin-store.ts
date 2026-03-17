"use client";

import type { User, Exercise, Routine } from "@/types";
import { exercises as defaultExercises } from "./exercises";

const KEYS = {
  users: "a4o_users",
  exercises: "a4o_exercises_custom",
  routines: "a4o_routines",
};

// ── USERS ──

const DEFAULT_USERS: User[] = [
  { id: "coach-1", name: "Miguel", email: "coach@all4one.es", role: "coach", goal: "general", injuries: [], level: "elite", daysPerWeek: 6, createdAt: "2025-01-01" },
  { id: "a1", name: "María García", email: "maria@test.com", role: "athlete", goal: "hyrox", injuries: ["shoulder"], level: "intermediate", daysPerWeek: 4, createdAt: "2025-02-01" },
  { id: "a2", name: "Carlos Rodríguez", email: "carlos@test.com", role: "athlete", goal: "general", injuries: ["knee"], level: "beginner", daysPerWeek: 3, createdAt: "2025-02-15" },
  { id: "a3", name: "Ana López", email: "ana@test.com", role: "athlete", goal: "fat_loss", injuries: [], level: "intermediate", daysPerWeek: 5, createdAt: "2025-03-01" },
  { id: "a4", name: "Pedro Martínez", email: "pedro@test.com", role: "athlete", goal: "hyrox", injuries: [], level: "advanced", daysPerWeek: 5, createdAt: "2025-03-01" },
  { id: "a5", name: "Laura Sánchez", email: "laura@test.com", role: "athlete", goal: "deka", injuries: ["lower_back"], level: "intermediate", daysPerWeek: 4, createdAt: "2025-03-05" },
  { id: "a6", name: "Miguel Torres", email: "miguel@test.com", role: "athlete", goal: "general", injuries: [], level: "beginner", daysPerWeek: 3, createdAt: "2025-03-10" },
  { id: "a7", name: "Elena Ruiz", email: "elena@test.com", role: "athlete", goal: "rehab", injuries: ["hip"], level: "beginner", daysPerWeek: 2, createdAt: "2025-03-12" },
  { id: "a8", name: "David Fernández", email: "david@test.com", role: "athlete", goal: "hyrox", injuries: [], level: "elite", daysPerWeek: 6, createdAt: "2025-03-14" },
];

export function getUsers(): User[] {
  if (typeof window === "undefined") return DEFAULT_USERS;
  const raw = localStorage.getItem(KEYS.users);
  return raw ? JSON.parse(raw) : DEFAULT_USERS;
}

export function saveUsers(users: User[]) {
  localStorage.setItem(KEYS.users, JSON.stringify(users));
}

export function addUser(user: User) {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
}

export function updateUser(id: string, updates: Partial<User>) {
  const users = getUsers().map((u) => (u.id === id ? { ...u, ...updates } : u));
  saveUsers(users);
}

export function deleteUser(id: string) {
  saveUsers(getUsers().filter((u) => u.id !== id));
}

// ── EXERCISES ──

export function getExercises(): Exercise[] {
  if (typeof window === "undefined") return defaultExercises;
  const raw = localStorage.getItem(KEYS.exercises);
  return raw ? JSON.parse(raw) : defaultExercises;
}

export function saveExercises(exercises: Exercise[]) {
  localStorage.setItem(KEYS.exercises, JSON.stringify(exercises));
}

export function updateExercise(id: string, updates: Partial<Exercise>) {
  const exercises = getExercises().map((e) => (e.id === id ? { ...e, ...updates } : e));
  saveExercises(exercises);
}

export function addExercise(exercise: Exercise) {
  const exercises = getExercises();
  exercises.push(exercise);
  saveExercises(exercises);
}

export function deleteExercise(id: string) {
  saveExercises(getExercises().filter((e) => e.id !== id));
}

// ── ROUTINES ──

export function getRoutines(): Routine[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEYS.routines);
  return raw ? JSON.parse(raw) : [];
}

export function saveRoutines(routines: Routine[]) {
  localStorage.setItem(KEYS.routines, JSON.stringify(routines));
}

export function deleteRoutine(id: string) {
  saveRoutines(getRoutines().filter((r) => r.id !== id));
}

export function updateRoutine(id: string, updates: Partial<Routine>) {
  const routines = getRoutines().map((r) => (r.id === id ? { ...r, ...updates } : r));
  saveRoutines(routines);
}
