// Configuración del video
export const VIDEO_CONFIG = {
  // Dimensiones (9:16 ratio)
  WIDTH: 1080,
  HEIGHT: 1920,

  // Duración
  VIDEO_DURATION: 6, // segundos (5 seg fotos + 1 seg logo final)
  FRAMES_PER_SECOND: 2, // frames por segundo para fotos
  PHOTO_FRAMES_DURATION: 5, // segundos solo de fotos
  FINAL_LOGO_FRAMES: 10, // frames para el logo final (1 segundo a 10 fps)

  // Gradientes de fondo que alternan cada 1.25 segundos
  BACKGROUND_GRADIENTS: [
    { start: '#2C42D4', end: '#BACCF2' }, // Azul
    { start: '#FE9E48', end: '#FDDE81' }, // Naranja
    { start: '#EB4877', end: '#F6BBD1' }, // Rosa
  ],
  GRADIENT_CHANGE_INTERVAL: 1.25, // segundos

  // Grid de fotos
  GRID_PADDING: 40,
  GRID_GAP: 20,
  PHOTO_BORDER_WIDTH: 0,
  PHOTO_BORDER_COLOR: '#ffffff',

  // Transiciones
  TRANSITION_TYPE: 'fade' as const,
  TRANSITION_DURATION: 0.3, // segundos

  // Formato de salida
  OUTPUT_FORMAT: 'mp4',
  VIDEO_CODEC: 'libx264',
  VIDEO_QUALITY: 23, // 0-51, menor = mejor calidad
  PIXEL_FORMAT: 'yuv420p',

  // Limpieza
  CLEANUP_AFTER_DOWNLOAD: true,
  CLEANUP_OLD_FILES_HOURS: 1,
} as const;

// Calcular frames totales (solo fotos, sin contar frames finales)
export const TOTAL_FRAMES = VIDEO_CONFIG.PHOTO_FRAMES_DURATION * VIDEO_CONFIG.FRAMES_PER_SECOND;

// Patrones de rotación de fotos (índices 0-3)
export function getPhotoRotation(frameIndex: number): number[] {
  const patterns = [
    [0, 1, 2, 3], // Original
    [1, 2, 3, 0], // Rotar 1
    [2, 3, 0, 1], // Rotar 2
    [3, 0, 1, 2], // Rotar 3
  ];

  return patterns[frameIndex % patterns.length];
}
