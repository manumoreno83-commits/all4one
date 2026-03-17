// ALL4ONE Brand Colors from https://all4one.es/
export const colors = {
  brand: {
    darkBlue: "#223754",
    darkBlueDark: "#1A2A42",
    darkBlueLight: "#2C4568",
    mediumBlue: "#496D91",
    mediumBlueLight: "#5A82AB",
    mediumBlueDark: "#3B5A78",
    orange: "#EC7910",
    orangeLight: "#F59340",
    orangeDark: "#D06A0C",
    yellow: "#FDC300",
    yellowLight: "#FFD340",
    yellowDark: "#E0AD00",
    red: "#E30518",
    redLight: "#FF2D3F",
    redDark: "#C00414",
  },
  semantic: {
    success: "#2ECC71",
    warning: "#FDC300",
    error: "#E30518",
    info: "#496D91",
  },
  block: {
    warmup: "#EC7910",
    strength: "#E30518",
    skill: "#9B59B6",
    conditioning: "#2ECC71",
    endurance: "#FF8200",
    mobility: "#496D91",
    recovery: "#1ABC9C",
  },
  whatsapp: "#25D366",
} as const;

// Gradient presets (CSS gradient strings)
export const gradients = {
  wave: "linear-gradient(135deg, #1A2A42, #223754, #496D91)",
  energy: "linear-gradient(90deg, #FF8200, #FFB700)",
  brand: "linear-gradient(90deg, #F59340, #EC7910, #D06A0C)",
  sunset: "linear-gradient(45deg, #EC7910, #FDC300)",
  ocean: "linear-gradient(180deg, #1A2A42, #223754, #3B5A78)",
  fire: "linear-gradient(90deg, #E30518, #EC7910, #FDC300)",
} as const;

// Block type to color mapping
export function blockColor(type: string): string {
  return colors.block[type as keyof typeof colors.block] ?? colors.brand.mediumBlue;
}
