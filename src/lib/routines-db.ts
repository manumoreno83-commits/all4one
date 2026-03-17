"use client";

import { supabase } from "./supabase";
import type { Routine, RoutineBlock, BlockExercise } from "@/types";

function requireSupabase() {
  if (!supabase) throw new Error("Supabase no configurado");
  return supabase;
}

// Save a routine with blocks and exercises
export async function saveRoutine(routine: Routine) {
  // 1. Insert routine
  const { error: routineError } = await requireSupabase().from("routines").upsert({
    id: routine.id,
    name: routine.name,
    description: routine.description,
    goal: routine.goal,
    difficulty: routine.difficulty,
    estimated_minutes: routine.estimatedMinutes,
    created_by: routine.createdBy,
  });
  if (routineError) throw routineError;

  // 2. Delete existing blocks for this routine (upsert approach)
  await requireSupabase().from("routine_blocks").delete().eq("routine_id", routine.id);

  // 3. Insert blocks
  for (const block of routine.blocks) {
    const { error: blockError } = await requireSupabase().from("routine_blocks").insert({
      id: block.id,
      routine_id: routine.id,
      type: block.type,
      name: block.name,
      duration_minutes: block.durationMinutes,
      notes: block.notes,
      sort_order: block.order,
    });
    if (blockError) throw blockError;

    // 4. Insert exercises for this block
    if (block.exercises.length > 0) {
      const { error: exError } = await requireSupabase().from("block_exercises").insert(
        block.exercises.map((ex) => ({
          id: ex.id,
          block_id: block.id,
          exercise_id: ex.exerciseId,
          exercise_name: ex.exerciseName,
          sets: ex.sets,
          reps: ex.reps,
          load: ex.load,
          load_type: ex.loadType,
          rest_seconds: ex.restSeconds,
          notes: ex.notes,
          sort_order: ex.order,
        }))
      );
      if (exError) throw exError;
    }
  }
}

// Get all routines (for coach)
export async function getRoutines(coachId?: string): Promise<Routine[]> {
  let query = requireSupabase().from("routines").select("*").order("created_at", { ascending: false });
  if (coachId) query = query.eq("created_by", coachId);

  const { data, error } = await query;
  if (error) throw error;
  if (!data) return [];

  // Load blocks and exercises for each routine
  const routines: Routine[] = [];
  for (const r of data) {
    const blocks = await getRoutineBlocks(r.id);
    routines.push({
      id: r.id,
      name: r.name,
      description: r.description,
      goal: r.goal as Routine["goal"],
      difficulty: r.difficulty as Routine["difficulty"],
      estimatedMinutes: r.estimated_minutes,
      createdBy: r.created_by,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
      blocks,
    });
  }
  return routines;
}

// Get blocks for a routine
async function getRoutineBlocks(routineId: string): Promise<RoutineBlock[]> {
  const { data: blocksData } = await requireSupabase()
    .from("routine_blocks")
    .select("*")
    .eq("routine_id", routineId)
    .order("sort_order");

  if (!blocksData) return [];

  const blocks: RoutineBlock[] = [];
  for (const b of blocksData) {
    const { data: exData } = await requireSupabase()
      .from("block_exercises")
      .select("*")
      .eq("block_id", b.id)
      .order("sort_order");

    blocks.push({
      id: b.id,
      type: b.type as RoutineBlock["type"],
      name: b.name,
      durationMinutes: b.duration_minutes,
      notes: b.notes,
      order: b.sort_order,
      exercises: (exData ?? []).map((e) => ({
        id: e.id,
        exerciseId: e.exercise_id,
        exerciseName: e.exercise_name,
        sets: e.sets,
        reps: e.reps,
        load: e.load,
        loadType: e.load_type as BlockExercise["loadType"],
        restSeconds: e.rest_seconds,
        notes: e.notes,
        order: e.sort_order,
      })),
    });
  }
  return blocks;
}

// Assign a routine to an athlete
export async function assignRoutine(
  routineId: string,
  athleteId: string,
  coachId: string,
  date: string
) {
  const { error } = await requireSupabase().from("assigned_workouts").insert({
    id: crypto.randomUUID(),
    routine_id: routineId,
    athlete_id: athleteId,
    coach_id: coachId,
    date,
    status: "scheduled",
  });
  if (error) throw error;
}

// Get assigned workouts for an athlete
export async function getAthleteWorkouts(athleteId: string) {
  const { data, error } = await requireSupabase()
    .from("assigned_workouts")
    .select("*, routines(name, goal, difficulty, estimated_minutes)")
    .eq("athlete_id", athleteId)
    .order("date", { ascending: false });
  if (error) throw error;
  return data;
}

// Get today's workout for an athlete
export async function getTodayWorkout(athleteId: string) {
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await requireSupabase()
    .from("assigned_workouts")
    .select("*, routines(name, goal, difficulty, estimated_minutes)")
    .eq("athlete_id", athleteId)
    .eq("date", today)
    .single();
  if (error && error.code !== "PGRST116") throw error; // PGRST116 = no rows
  return data;
}

// Log a completed workout
export async function logWorkout(log: {
  assignedWorkoutId?: string;
  routineId: string;
  athleteId: string;
  durationMinutes: number;
  completedExercises: number;
  totalExercises: number;
  notes: string;
}) {
  const { error } = await requireSupabase().from("workout_logs").insert({
    id: crypto.randomUUID(),
    assigned_workout_id: log.assignedWorkoutId ?? null,
    routine_id: log.routineId,
    athlete_id: log.athleteId,
    date: new Date().toISOString().split("T")[0],
    duration_minutes: log.durationMinutes,
    completed_exercises: log.completedExercises,
    total_exercises: log.totalExercises,
    notes: log.notes,
  });
  if (error) throw error;

  // Update assigned workout status
  if (log.assignedWorkoutId) {
    await requireSupabase()
      .from("assigned_workouts")
      .update({ status: "completed" })
      .eq("id", log.assignedWorkoutId);
  }
}
