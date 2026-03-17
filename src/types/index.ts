// ALL4ONE Type Definitions — mirrors SwiftData models

export type UserRole = "coach" | "athlete" | "admin";
export type TrainingGoal = "hyrox" | "deka" | "fat_loss" | "general" | "rehab";
export type ExerciseCategory = "strength" | "conditioning" | "endurance" | "mobility" | "core" | "recovery" | "hyrox" | "deka";
export type MovementPattern = "push" | "pull" | "squat" | "hinge" | "carry" | "lunge" | "rotation" | "gait" | "static";
export type Difficulty = "beginner" | "intermediate" | "advanced" | "elite";
export type InjuryType = "shoulder" | "knee" | "lower_back" | "hip" | "ankle" | "wrist" | "elbow" | "neck" | "none";
export type BlockType = "warmup" | "strength" | "skill" | "conditioning" | "endurance" | "mobility" | "recovery";
export type LoadType = "kg" | "bodyweight" | "band" | "percent_rm" | "rpe" | "distance" | "calories";
export type WorkoutStatus = "scheduled" | "in_progress" | "completed" | "skipped";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  goal: TrainingGoal;
  injuries: InjuryType[];
  level: Difficulty;
  daysPerWeek: number;
  avatarUrl?: string;
  createdAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  movement: MovementPattern;
  difficulty: Difficulty;
  equipment: string[];
  muscleGroups: string[];
  description: string;
  cues: string[];
  videoUrl?: string;
  riskyFor: InjuryType[];
}

export interface InjuryAlternative {
  exerciseId: string;
  injuryType: InjuryType;
  alternativeId: string;
  reason: string;
}

export interface BlockExercise {
  id: string;
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: string; // "8-10", "AMRAP", "30s", etc.
  load: string;
  loadType: LoadType;
  restSeconds: number;
  notes: string;
  order: number;
}

export interface RoutineBlock {
  id: string;
  type: BlockType;
  name: string;
  exercises: BlockExercise[];
  durationMinutes: number;
  notes: string;
  order: number;
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  blocks: RoutineBlock[];
  goal: TrainingGoal;
  difficulty: Difficulty;
  estimatedMinutes: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScheduledWorkout {
  id: string;
  routineId: string;
  routineName: string;
  athleteId: string;
  date: string;
  status: WorkoutStatus;
}

export interface WorkoutLog {
  id: string;
  routineId: string;
  routineName: string;
  athleteId: string;
  date: string;
  durationMinutes: number;
  completedExercises: number;
  totalExercises: number;
  notes: string;
}

export interface SetLog {
  exerciseId: string;
  exerciseName: string;
  setNumber: number;
  reps: number;
  weight: number;
  completed: boolean;
}

export interface PersonalRecord {
  id: string;
  athleteId: string;
  exerciseId: string;
  exerciseName: string;
  value: number;
  unit: string;
  date: string;
}

// Quick Mode templates
export interface QuickTemplate {
  id: string;
  name: string;
  icon: string;
  description: string;
  goal: TrainingGoal;
  blocks: Omit<RoutineBlock, "id">[];
}
