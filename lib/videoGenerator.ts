import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs/promises';
import path from 'path';
import { VIDEO_CONFIG, TOTAL_FRAMES, getPhotoRotation } from './videoConfig';

export class VideoGenerator {
  constructor() {
    // No initialization needed for native FFmpeg
  }

  async generateVideo(photos: string[]): Promise<string> {
    if (photos.length !== 4) {
      throw new Error('Se requieren exactamente 4 fotos');
    }

    // Crear directorio temporal
    const tempDir = path.join(process.cwd(), 'public', 'temp');
    await fs.mkdir(tempDir, { recursive: true });

    const timestamp = Date.now();
    let frameCounter = 0;

    try {
      // Generar frames con fotos - cada uno se repite 5 veces para mantener 0.5 seg a 10 fps
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const rotation = getPhotoRotation(i);
        const rotatedPhotos = rotation.map(idx => photos[idx]);
        
        const framePath = await this.generateFrame(rotatedPhotos, i, tempDir, timestamp, frameCounter);
        
        // Repetir cada frame de foto 5 veces (0.5 segundos a 10 fps)
        for (let rep = 0; rep < 5; rep++) {
          frameCounter++;
        }
      }

      // Generar frames finales con logo (10 frames únicos para fade suave en 1 segundo a 10 fps)
      const finalFramesCount = VIDEO_CONFIG.FINAL_LOGO_FRAMES;
      for (let i = 0; i < finalFramesCount; i++) {
        await this.generateFinalFrame(i, finalFramesCount, tempDir, timestamp, frameCounter);
        frameCounter++;
      }

      // Generar video con FFmpeg
      const videoPath = await this.assembleVideo(tempDir, timestamp, frameCounter);

      return `/temp/${path.basename(videoPath)}`;
    } catch (error) {
      console.error('Error generating video:', error);
      throw error;
    }
  }

  private async generateFrame(
    photos: string[],
    frameIndex: number,
    tempDir: string,
    timestamp: number,
    frameCounter: number
  ): Promise<string> {
    const { renderFrame } = await import('./templateRenderer');
    
    // Generar el frame una vez
    const baseFramePath = path.join(tempDir, `frame-${timestamp}-base-${frameIndex.toString().padStart(4, '0')}.png`);
    await renderFrame(photos, baseFramePath, frameIndex);
    
    // Copiar el frame 5 veces
    for (let rep = 0; rep < 5; rep++) {
      const framePath = path.join(tempDir, `frame-${timestamp}-${(frameCounter + rep).toString().padStart(4, '0')}.png`);
      await fs.copyFile(baseFramePath, framePath);
    }
    
    // Eliminar el frame base
    await fs.unlink(baseFramePath).catch(() => {});
    
    return baseFramePath;
  }

  private async generateFinalFrame(
    frameIndex: number,
    totalFrames: number,
    tempDir: string,
    timestamp: number,
    frameCounter: number
  ): Promise<void> {
    const { renderFinalFrame } = await import('./templateRenderer');
    const framePath = path.join(tempDir, `frame-${timestamp}-${frameCounter.toString().padStart(4, '0')}.png`);
    
    await renderFinalFrame(frameIndex, totalFrames, framePath);
  }

  private async assembleVideo(
    tempDir: string,
    timestamp: number,
    totalFrames: number
  ): Promise<string> {
    const outputPath = path.join(tempDir, `video-${timestamp}.mp4`);
    const inputPattern = path.join(tempDir, `frame-${timestamp}-%04d.png`);

    return new Promise((resolve, reject) => {
      ffmpeg()
        .input(inputPattern)
        .inputOptions([
          '-framerate 10',
          '-start_number 0'
        ])
        .outputOptions([
          '-c:v libx264',
          '-pix_fmt yuv420p',
          `-crf ${VIDEO_CONFIG.VIDEO_QUALITY}`,
          '-movflags +faststart'
        ])
        .output(outputPath)
        .on('end', async () => {
          // Limpiar frames temporales
          const files = await fs.readdir(tempDir);
          for (const file of files) {
            if (file.startsWith(`frame-${timestamp}-`) && file.endsWith('.png')) {
              await fs.unlink(path.join(tempDir, file)).catch(() => {});
            }
          }
          resolve(outputPath);
        })
        .on('error', (err) => {
          console.error('FFmpeg error:', err);
          reject(err);
        })
        .run();
    });
  }

  async cleanup(videoPath: string) {
    try {
      const fullPath = path.join(process.cwd(), 'public', videoPath);
      await fs.unlink(fullPath);
    } catch (error) {
      console.error('Error cleaning up video:', error);
    }
  }

  async cleanupOldFiles() {
    const tempDir = path.join(process.cwd(), 'public', 'temp');
    const files = await fs.readdir(tempDir);
    const now = Date.now();
    const maxAge = VIDEO_CONFIG.CLEANUP_OLD_FILES_HOURS * 60 * 60 * 1000;

    for (const file of files) {
      const filePath = path.join(tempDir, file);
      const stats = await fs.stat(filePath);
      
      if (now - stats.mtimeMs > maxAge) {
        await fs.unlink(filePath).catch(() => {});
      }
    }
  }
}
