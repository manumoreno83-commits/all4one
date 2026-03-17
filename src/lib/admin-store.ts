"use client";

import type { User, Exercise, Routine } from "@/types";
import { exercises as defaultExercises } from "./exercises";

const KEYS = {
  users: "a4o_users",
  exercises: "a4o_exercises_custom",
  routines: "a4o_routines",
};

// ── USERS ──

// No default users — production starts empty. Add real users via the admin panel.
const DEFAULT_USERS: User[] = [];

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
