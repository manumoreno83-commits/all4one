// Exercise ID to YouTube Video ID mapping
// Format: https://www.youtube.com/embed/{videoId}

export const exerciseVideos: Record<string, string> = {
  // Strength Exercises
  s01: "https://www.youtube.com/embed/QyIpP4S5sPY", // Back Squat
  s02: "https://www.youtube.com/embed/V2BeijIeH40", // Front Squat
  s03: "https://www.youtube.com/embed/3UYeRl9hvr0", // Goblet Squat
  s04: "https://www.youtube.com/embed/1JC9BFxlXl8", // Bulgarian Split Squat
  s05: "https://www.youtube.com/embed/r4MzxtBKyNE", // Deadlift
  s06: "https://www.youtube.com/embed/JCXAeIsz8aE", // Romanian Deadlift
  s07: "https://www.youtube.com/embed/Syt3mFLiYnI", // Sumo Deadlift
  s08: "https://www.youtube.com/embed/CwGLkiL02Zs", // Trap Bar Deadlift
  s09: "https://www.youtube.com/embed/rT7DgCr-3pg", // Bench Press
  s10: "https://www.youtube.com/embed/DbvRnAWNdXc", // Incline Bench Press
  s11: "https://www.youtube.com/embed/VeIsSQNw_dE", // Dumbbell Bench Press
  s12: "https://www.youtube.com/embed/ZKy4R8448OM", // Floor Press
  s13: "https://www.youtube.com/embed/2yjwXTZQDDY", // Overhead Press
  s14: "https://www.youtube.com/embed/QXYHwVhKmDQ", // Dumbbell Shoulder Press
  s15: "https://www.youtube.com/embed/ZFQg-gSPa2k", // Push Press
  s16: "https://www.youtube.com/embed/sVbKzp0Qs2s", // Barbell Row
  s17: "https://www.youtube.com/embed/S5eeQRmVBPM", // Dumbbell Row
  s18: "https://www.youtube.com/embed/0Pg0yuvzD3Y", // Pendlay Row
  s19: "https://www.youtube.com/embed/Dvxj5OVo5Gg", // Pull-Up
  s20: "https://www.youtube.com/embed/JfthXydLK1o", // Chin-Up
  s21: "https://www.youtube.com/embed/9EHcF-F3t1g", // Lat Pulldown
  s22: "https://www.youtube.com/embed/6E8MC8pqKaU", // Seated Cable Row
  s23: "https://www.youtube.com/embed/Jvdy2BryVcw", // Hip Thrust
  s24: "https://www.youtube.com/embed/QQvSzhm1UYc", // Walking Lunge
  s25: "https://www.youtube.com/embed/8qMvq9149Gs", // Step-Up
  s26: "https://www.youtube.com/embed/SrqN6kxMbFw", // Leg Press
  s27: "https://www.youtube.com/embed/Pld8wRotTak", // Leg Curl
  s28: "https://www.youtube.com/embed/YDZ95YQVATU", // Leg Extension
  s29: "https://www.youtube.com/embed/FinOu7Y0gqE", // Calf Raise

  // Conditioning Exercises
  c01: "https://www.youtube.com/embed/n99PGLCXZh0", // Assault Bike
  c02: "https://www.youtube.com/embed/UWkBEhMeVHc", // Rowing
  c03: "https://www.youtube.com/embed/0WjXKVV2aQw", // Ski Erg
  c04: "https://www.youtube.com/embed/ZXoP3bnqWAw", // Box Jump
  c05: "https://www.youtube.com/embed/JZQA0DHY5FI", // Burpee
  c06: "https://www.youtube.com/embed/S_MFs0kH_nU", // Thruster
  c07: "https://www.youtube.com/embed/ypVz_dNJm2c", // Wall Ball
  c08: "https://www.youtube.com/embed/FQKAu3msjZY", // Kettlebell Swing
  c09: "https://www.youtube.com/embed/cMuHvD1KvfY", // Battle Ropes
  c10: "https://www.youtube.com/embed/3tT3Vo_FLBg", // Med Ball Slam
  c11: "https://www.youtube.com/embed/-iD6fBWBbSs", // Box Step-Over
  c12: "https://www.youtube.com/embed/_VXp8WIVaBE", // Jumping Lunges
};

export function getVideoUrl(exerciseId: string): string | undefined {
  return exerciseVideos[exerciseId];
}
