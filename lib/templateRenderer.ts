import { createCanvas, loadImage, registerFont } from 'canvas';
import { VIDEO_CONFIG } from './videoConfig';
import path from 'path';
import fs from 'fs/promises';

// Registrar fuentes
const fontsDir = path.join(process.cwd(), 'public');
registerFont(path.join(fontsDir, 'ITCAvantGardeStd-Bold-Condensed.otf'), {
  family: 'ITC Avant Garde Gothic Std',
  weight: '700',
});

export async function renderFrame(photos: string[], outputPath: string, frameIndex: number = 0): Promise<void> {
  const canvas = createCanvas(VIDEO_CONFIG.WIDTH, VIDEO_CONFIG.HEIGHT);
  const ctx = canvas.getContext('2d');

  // Fondo con gradiente que cambia cada 1.25 segundos
  const timeInSeconds = frameIndex / VIDEO_CONFIG.FRAMES_PER_SECOND;
  const gradientIndex = Math.floor(timeInSeconds / VIDEO_CONFIG.GRADIENT_CHANGE_INTERVAL) % VIDEO_CONFIG.BACKGROUND_GRADIENTS.length;
  const gradient = VIDEO_CONFIG.BACKGROUND_GRADIENTS[gradientIndex];

  const bgGradient = ctx.createLinearGradient(0, 0, 0, VIDEO_CONFIG.HEIGHT);
  bgGradient.addColorStop(0, gradient.start);
  bgGradient.addColorStop(1, gradient.end);
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, VIDEO_CONFIG.WIDTH, VIDEO_CONFIG.HEIGHT);

  // Calcular centrado vertical de todos los elementos
  // 👉 AJUSTA AQUÍ EL TAMAÑO DE TEXTO: cambia el valor de fontSize
  const headerPadding = 60;
  const fontSize = 90;
  const gridSize = 1000;
  const logoHeight = 150; // Altura estimada del logo

  // Calcular altura total de contenido
  const titleHeight = fontSize;
  const rectHeight = fontSize + 60;
  const spaceBetweenTitleAndGrid = 60;
  const spaceBetweenGridAndLogo = 80;
  const totalContentHeight = titleHeight + rectHeight + spaceBetweenTitleAndGrid + gridSize + spaceBetweenGridAndLogo + logoHeight;

  // Calcular offset para centrar verticalmente
  const startY = (VIDEO_CONFIG.HEIGHT - totalContentHeight) / 2;

  // Header - Título (90px con padding)
  ctx.fillStyle = 'white';
  ctx.font = `bold ${fontSize}px "ITC Avant Garde Gothic Std", Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';

  // 👉 AJUSTA AQUÍ LA POSICIÓN VERTICAL DEL TÍTULO: cambia titleY
  const titleY = startY + fontSize;
  ctx.fillText('MA MAGIC SUNNY,', VIDEO_CONFIG.WIDTH / 2, titleY);

  // Título destacado con padding y centrado verticalmente
  const highlightText = 'MA CRÉATION !';
  const rectX = headerPadding;
  const rectY = titleY + 20;
  const rectWidth = VIDEO_CONFIG.WIDTH - (headerPadding * 2);

  // Dibujar fondo blanco
  ctx.fillStyle = 'white';
  ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

  // Centrar texto verticalmente en el rectángulo
  ctx.fillStyle = gradient.start;
  ctx.font = `bold ${fontSize}px "ITC Avant Garde Gothic Std", Arial`;
  ctx.textBaseline = 'middle';
  ctx.fillText(highlightText, VIDEO_CONFIG.WIDTH / 2, rectY + rectHeight / 2);

  // Grid de fotos (2x2)
  // 👉 AJUSTA AQUÍ LA POSICIÓN DEL GRID: cambia gridY para mover las fotos
  const gridX = (VIDEO_CONFIG.WIDTH - gridSize) / 2;
  const gridY = rectY + rectHeight + spaceBetweenTitleAndGrid;
  const photoSize = (gridSize - VIDEO_CONFIG.GRID_GAP) / 2;

  const positions = [
    { x: gridX, y: gridY }, // Top-left
    { x: gridX + photoSize + VIDEO_CONFIG.GRID_GAP, y: gridY }, // Top-right
    { x: gridX, y: gridY + photoSize + VIDEO_CONFIG.GRID_GAP }, // Bottom-left
    { x: gridX + photoSize + VIDEO_CONFIG.GRID_GAP, y: gridY + photoSize + VIDEO_CONFIG.GRID_GAP }, // Bottom-right
  ];

  // Renderizar fotos
  for (let i = 0; i < 4; i++) {
    const pos = positions[i];

    // Borde
    ctx.fillStyle = VIDEO_CONFIG.PHOTO_BORDER_COLOR;
    ctx.fillRect(
      pos.x - VIDEO_CONFIG.PHOTO_BORDER_WIDTH,
      pos.y - VIDEO_CONFIG.PHOTO_BORDER_WIDTH,
      photoSize + VIDEO_CONFIG.PHOTO_BORDER_WIDTH * 2,
      photoSize + VIDEO_CONFIG.PHOTO_BORDER_WIDTH * 2
    );

    // Foto
    try {
      const img = await loadImage(photos[i]);
      ctx.drawImage(img, pos.x, pos.y, photoSize, photoSize);
    } catch {
      // Si falla, dibujar rectángulo negro
      ctx.fillStyle = '#000';
      ctx.fillRect(pos.x, pos.y, photoSize, photoSize);
    }
  }

  // Footer - Logo SVG
  // 👉 AJUSTA AQUÍ EL TAMAÑO Y POSICIÓN DEL LOGO
  try {
    const logoPath = path.join(process.cwd(), 'public', 'logo-svg.svg');
    const logoImg = await loadImage(logoPath);
    const logoWidth = 400;
    const logoImgHeight = (logoImg.height / logoImg.width) * logoWidth;
    const logoX = (VIDEO_CONFIG.WIDTH - logoWidth) / 2;
    const logoY = gridY + gridSize + spaceBetweenGridAndLogo;

    ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoImgHeight);
  } catch (error) {
    // Si falla cargar el logo, usar texto como fallback
    ctx.fillStyle = 'white';
    ctx.font = 'bold 180px "ITC Avant Garde Gothic Std", Arial';
    ctx.textAlign = 'center';
    ctx.fillText('MAGIC', VIDEO_CONFIG.WIDTH / 2, 1750);

    ctx.font = 'bold 100px "ITC Avant Garde Gothic Std", Arial';
    ctx.fillText('AFFLELOU', VIDEO_CONFIG.WIDTH / 2, 1830);
  }

  // Guardar frame
  const buffer = canvas.toBuffer('image/png');
  await fs.writeFile(outputPath, buffer);
}

export async function renderFinalFrame(frameIndex: number, totalFrames: number, outputPath: string): Promise<void> {
  const canvas = createCanvas(VIDEO_CONFIG.WIDTH, VIDEO_CONFIG.HEIGHT);
  const ctx = canvas.getContext('2d');

  // Fondo negro
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, VIDEO_CONFIG.WIDTH, VIDEO_CONFIG.HEIGHT);

  // Logo SVG centrado con efecto fade
  try {
    const logoPath = path.join(process.cwd(), 'public', 'logo-svg.svg');
    const logoImg = await loadImage(logoPath);
    const logoWidth = 600;
    const logoHeight = (logoImg.height / logoImg.width) * logoWidth;
    const logoX = (VIDEO_CONFIG.WIDTH - logoWidth) / 2;
    const logoY = (VIDEO_CONFIG.HEIGHT - logoHeight) / 2;

    // Crear canvas temporal para convertir logo a blanco
    const tempCanvas = createCanvas(logoWidth, logoHeight);
    const tempCtx = tempCanvas.getContext('2d');
    
    // Dibujar logo original
    tempCtx.drawImage(logoImg, 0, 0, logoWidth, logoHeight);
    
    // Convertir a blanco manteniendo el alpha
    tempCtx.globalCompositeOperation = 'source-in';
    tempCtx.fillStyle = '#FFFFFF';
    tempCtx.fillRect(0, 0, logoWidth, logoHeight);
    
    // Efecto fade: aumentar opacidad gradualmente entre frames
    const fadeOpacity = 0.2 + (frameIndex / (totalFrames - 1)) * 0.6;
    ctx.globalAlpha = fadeOpacity;
    ctx.drawImage(tempCanvas, logoX, logoY);
    ctx.globalAlpha = 1.0;
  } catch {
    // Si falla cargar el logo, usar texto como fallback
    ctx.fillStyle = 'white';
    ctx.font = 'bold 180px "ITC Avant Garde Gothic Std", Arial';
    ctx.textAlign = 'center';
    ctx.fillText('MAGIC', VIDEO_CONFIG.WIDTH / 2, VIDEO_CONFIG.HEIGHT / 2 - 50);

    ctx.font = 'bold 100px "ITC Avant Garde Gothic Std", Arial';
    ctx.fillText('AFFLELOU', VIDEO_CONFIG.WIDTH / 2, VIDEO_CONFIG.HEIGHT / 2 + 50);
  }

  // Guardar frame
  const buffer = canvas.toBuffer('image/png');
  await fs.writeFile(outputPath, buffer);
}
