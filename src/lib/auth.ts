"use client";

import { supabase } from "./supabase";
import type { User } from "@/types";

function requireSupabase() {
  if (!supabase) throw new Error("Supabase no configurado. Usa modo demo.");
  return supabase;
}

// Sign up a new user (athlete or coach)
export async function signUp(
  email: string,
  password: string,
  name: string,
  role: "coach" | "athlete"
) {
  const sb = requireSupabase();
  const { data, error } = await sb.auth.signUp({
    email,
    password,
    options: { data: { name, role } },
  });
  if (error) throw error;
  return data;
}

// Sign in
export async function signIn(email: string, password: string) {
  const sb = requireSupabase();
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

// Sign out
export async function signOut() {
  const sb = requireSupabase();
  const { error } = await sb.auth.signOut();
  if (error) throw error;
}

// Get current session
export async function getSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// Get user profile from profiles table
export async function getProfile(userId: string): Promise<User | null> {
  const sb = requireSupabase();
  const { data, error } = await sb
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
    goal: data.goal as User["goal"],
    injuries: data.injuries as User["injuries"],
    level: data.level as User["level"],
    daysPerWeek: data.days_per_week,
    avatarUrl: data.avatar_url ?? undefined,
    createdAt: data.created_at,
  };
}

// Update user profile
export async function updateProfile(
  userId: string,
  updates: { name?: string; goal?: string; level?: string; days_per_week?: number; injuries?: string[] }
) {
  const sb = requireSupabase();
  const { error } = await sb
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", userId);
  if (error) throw error;
}

// Get all athletes (for coach)
export async function getAthletes() {
  const sb = requireSupabase();
  const { data, error } = await sb
    .from("profiles")
    .select("*")
    .eq("role", "athlete")
    .order("name");
  if (error) throw error;
  return data;
}
