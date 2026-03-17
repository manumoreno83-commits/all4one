// Supabase Database Types
// These match the SQL schema that will be created in Supabase

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: "coach" | "athlete" | "admin";
          goal: string;
          level: string;
          days_per_week: number;
          injuries: string[];
          avatar_url: string | null;
          coach_pin: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      exercises: {
        Row: {
          id: string;
          name: string;
          category: string;
          movement: string;
          difficulty: string;
          equipment: string[];
          muscle_groups: string[];
          description: string;
          cues: string[];
          video_url: string | null;
          risky_for: string[];
        };
        Insert: Database["public"]["Tables"]["exercises"]["Row"];
        Update: Partial<Database["public"]["Tables"]["exercises"]["Insert"]>;
      };
      routines: {
        Row: {
          id: string;
          name: string;
          description: string;
          goal: string;
          difficulty: string;
          estimated_minutes: number;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["routines"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["routines"]["Insert"]>;
      };
      routine_blocks: {
        Row: {
          id: string;
          routine_id: string;
          type: string;
          name: string;
          duration_minutes: number;
          notes: string;
          sort_order: number;
        };
        Insert: Database["public"]["Tables"]["routine_blocks"]["Row"];
        Update: Partial<Database["public"]["Tables"]["routine_blocks"]["Insert"]>;
      };
      block_exercises: {
        Row: {
          id: string;
          block_id: string;
          exercise_id: string;
          exercise_name: string;
          sets: number;
          reps: string;
          load: string;
          load_type: string;
          rest_seconds: number;
          notes: string;
          sort_order: number;
        };
        Insert: Database["public"]["Tables"]["block_exercises"]["Row"];
        Update: Partial<Database["public"]["Tables"]["block_exercises"]["Insert"]>;
      };
      assigned_workouts: {
        Row: {
          id: string;
          routine_id: string;
          athlete_id: string;
          coach_id: string;
          date: string;
          status: "scheduled" | "in_progress" | "completed" | "skipped";
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["assigned_workouts"]["Row"], "created_at">;
        Update: Partial<Database["public"]["Tables"]["assigned_workouts"]["Insert"]>;
      };
      workout_logs: {
        Row: {
          id: string;
          assigned_workout_id: string | null;
          routine_id: string;
          athlete_id: string;
          date: string;
          duration_minutes: number;
          completed_exercises: number;
          total_exercises: number;
          notes: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["workout_logs"]["Row"], "created_at">;
        Update: Partial<Database["public"]["Tables"]["workout_logs"]["Insert"]>;
      };
      personal_records: {
        Row: {
          id: string;
          athlete_id: string;
          exercise_id: string;
          exercise_name: string;
          value: number;
          unit: string;
          date: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["personal_records"]["Row"], "created_at">;
        Update: Partial<Database["public"]["Tables"]["personal_records"]["Insert"]>;
      };
    };
  };
};
