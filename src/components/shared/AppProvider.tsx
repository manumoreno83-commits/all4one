"use client";

import React, { useState, useEffect } from "react";
import { AppContext, loadState, saveState, type AppState } from "@/lib/store";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setStateRaw] = useState<AppState>({
    user: null,
    role: null,
    coachMode: false,
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setStateRaw(loadState());
    setReady(true);
  }, []);

  const setState = (s: AppState) => {
    setStateRaw(s);
    saveState(s);
  };

  if (!ready) return null;

  return (
    <AppContext.Provider value={{ state, setState }}>
      <div className={state.coachMode ? "coach-mode" : ""}>{children}</div>
    </AppContext.Provider>
  );
}
