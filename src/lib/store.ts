"use client";

import { createContext, useContext } from "react";
import type { User, UserRole } from "@/types";

// Simple auth / app state stored in localStorage
const STORAGE_KEY = "a4o_state";

export interface AppState {
  user: User | null;
  role: UserRole | null;
  coachMode: boolean; // extra-large UI for coach
}

const defaultState: AppState = {
  user: null,
  role: null,
  coachMode: false,
};

export function loadState(): AppState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultState, ...JSON.parse(raw) } : defaultState;
  } catch {
    return defaultState;
  }
}

export function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearState() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// Context for components
export const AppContext = createContext<{
  state: AppState;
  setState: (s: AppState) => void;
}>({ state: defaultState, setState: () => {} });

export function useApp() {
  return useContext(AppContext);
}
