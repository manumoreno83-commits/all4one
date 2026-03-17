// Nano Banana Monochrome Colors
export const colors = {
  brand: {
    darkBlue: "#333333",
    darkBlueDark: "#1A1A1A",
    darkBlueLight: "#4A4A4A",
    mediumBlue: "#666666",
    mediumBlueLight: "#808080",
    mediumBlueDark: "#4D4D4D",
    orange: "#FF1493",
    orangeLight: "#FF69B4",
    orangeDark: "#C70C6A",
    yellow: "#999999",
    yellowLight: "#AAAAAA",
    yellowDark: "#777777",
    red: "#FF1493",
    redLight: "#FF69B4",
    redDark: "#C70C6A",
  },
  semantic: {
    success: "#2ECC71",
    warning: "#F59E0B",
    error: "#FF1493",
    info: "#666666",
  },
  block: {
    warmup: "#FF1493",
    strength: "#808080",
    skill: "#999999",
    conditioning: "#FF1493",
    endurance: "#666666",
    mobility: "#7A7A7A",
    recovery: "#AAAAAA",
  },
  whatsapp: "#25D366",
} as const;

// Gradient presets (Monochrome)
export const gradients = {
  wave: "linear-gradient(135deg, #FFFFFF, #F5F5F5, #EEEEEE)",
  energy: "linear-gradient(90deg, #FF1493, #FF69B4)",
  brand: "linear-gradient(90deg, #808080, #666666, #4D4D4D)",
  sunset: "linear-gradient(45deg, #999999, #777777)",
  ocean: "linear-gradient(180deg, #FFFFFF, #F5F5F5, #E8E8E8)",
  fire: "linear-gradient(90deg, #FF1493, #FF69B4, #AAAAAA)",
} as const;

// Block type to color mapping
export function blockColor(type: string): string {
  return colors.block[type as keyof typeof colors.block] ?? colors.brand.mediumBlue;
}
