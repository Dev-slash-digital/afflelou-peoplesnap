import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { VIDEO_CONFIG, TOTAL_FRAMES, getPhotoRotation } from './videoConfig';

export class VideoGeneratorClient {
    private ffmpeg: FFmpeg;
    private loaded = false;

    constructor() {
        this.ffmpeg = new FFmpeg();
    }

    async initialize() {
        if (this.loaded) return;

        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';

        this.ffmpeg.on('log', ({ message }) => {
            console.log('FFmpeg:', message);
        });

        this.ffmpeg.on('progress', ({ progress }) => {
            console.log('Progress:', Math.round(progress * 100) + '%');
        });

        await this.ffmpeg.load({
            coreURL: `${baseURL}/ffmpeg-core.js`,
            wasmURL: `${baseURL}/ffmpeg-core.wasm`,
        });

        this.loaded = true;
    }

    async generateVideo(photos: string[]): Promise<Blob> {
        if (photos.length !== 4) {
            throw new Error('Se requieren exactamente 4 fotos');
        }

        await this.initialize();

        try {
            let frameCounter = 0;
            
            // Generar frames con fotos - cada uno se repite 5 veces para mantener 0.5 seg a 10 fps
            for (let i = 0; i < TOTAL_FRAMES; i++) {
                const rotation = getPhotoRotation(i);
                const rotatedPhotos = rotation.map(idx => photos[idx]);

                const frameBlob = await this.generateFrame(rotatedPhotos, i);
                
                // Repetir cada frame de foto 5 veces (0.5 segundos a 10 fps)
                for (let rep = 0; rep < 5; rep++) {
                    const frameName = `frame-${frameCounter.toString().padStart(4, '0')}.png`;
                    await this.ffmpeg.writeFile(frameName, await fetchFile(frameBlob));
                    frameCounter++;
                }
            }

            // Generar frames finales con logo (10 frames únicos para fade suave en 1 segundo a 10 fps)
            const finalFramesCount = VIDEO_CONFIG.FINAL_LOGO_FRAMES;
            for (let i = 0; i < finalFramesCount; i++) {
                const frameBlob = await this.generateFinalFrame(i, finalFramesCount);
                const frameName = `frame-${frameCounter.toString().padStart(4, '0')}.png`;

                await this.ffmpeg.writeFile(frameName, await fetchFile(frameBlob));
                frameCounter++;
            }

            // Generar video a 10 fps constante
            await this.ffmpeg.exec([
                '-framerate', '10',
                '-i', 'frame-%04d.png',
                '-c:v', VIDEO_CONFIG.VIDEO_CODEC,
                '-pix_fmt', VIDEO_CONFIG.PIXEL_FORMAT,
                '-crf', VIDEO_CONFIG.VIDEO_QUALITY.toString(),
                'output.mp4'
            ]);

            // Leer video generado
            const videoData = await this.ffmpeg.readFile('output.mp4');

            // Limpiar archivos del filesystem virtual
            for (let i = 0; i < frameCounter; i++) {
                await this.ffmpeg.deleteFile(`frame-${i.toString().padStart(4, '0')}.png`).catch(() => { });
            }
            await this.ffmpeg.deleteFile('output.mp4').catch(() => { });

            return new Blob([videoData as BlobPart], { type: 'video/mp4' });
        } catch (error) {
            console.error('Error in generateVideo:', error);
            throw error;
        }
    }

    private async generateFrame(photos: string[], frameIndex: number): Promise<Blob> {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            canvas.width = VIDEO_CONFIG.WIDTH;
            canvas.height = VIDEO_CONFIG.HEIGHT;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject(new Error('No se pudo obtener contexto 2D'));
                return;
            }

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
            ctx.font = `bold ${fontSize}px Arial, sans-serif`;
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

            ctx.fillStyle = 'white';
            ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

            ctx.fillStyle = gradient.start;
            ctx.font = `bold ${fontSize}px Arial, sans-serif`;
            ctx.textBaseline = 'middle';
            ctx.fillText(highlightText, VIDEO_CONFIG.WIDTH / 2, rectY + rectHeight / 2);

            // Grid de fotos (2x2)
            // 👉 AJUSTA AQUÍ LA POSICIÓN DEL GRID: cambia gridY para mover las fotos
            const gridX = (VIDEO_CONFIG.WIDTH - gridSize) / 2;
            const gridY = rectY + rectHeight + spaceBetweenTitleAndGrid;
            const photoSize = (gridSize - VIDEO_CONFIG.GRID_GAP) / 2;

            const positions = [
                { x: gridX, y: gridY },
                { x: gridX + photoSize + VIDEO_CONFIG.GRID_GAP, y: gridY },
                { x: gridX, y: gridY + photoSize + VIDEO_CONFIG.GRID_GAP },
                { x: gridX + photoSize + VIDEO_CONFIG.GRID_GAP, y: gridY + photoSize + VIDEO_CONFIG.GRID_GAP },
            ];

            let loadedImages = 0;
            const images: HTMLImageElement[] = [];

            // Cargar todas las imágenes
            photos.forEach((photoData, index) => {
                const img = new Image();
                img.onload = () => {
                    images[index] = img;
                    loadedImages++;

                    if (loadedImages === 4) {
                        // Dibujar todas las fotos
                        images.forEach((img, i) => {
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
                            ctx.drawImage(img, pos.x, pos.y, photoSize, photoSize);
                        });

                        // Footer - Logo SVG
                        // 👉 AJUSTA AQUÍ EL TAMAÑO Y POSICIÓN DEL LOGO
                        const logoImg = new Image();
                        logoImg.onload = () => {
                            const logoWidth = 400;
                            const logoImgHeight = (logoImg.height / logoImg.width) * logoWidth;
                            const logoX = (VIDEO_CONFIG.WIDTH - logoWidth) / 2;
                            const logoY = gridY + gridSize + spaceBetweenGridAndLogo;

                            ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoImgHeight);

                            // Convertir canvas a blob
                            canvas.toBlob((blob) => {
                                if (blob) {
                                    resolve(blob);
                                } else {
                                    reject(new Error('No se pudo convertir canvas a blob'));
                                }
                            }, 'image/png');
                        };
                        logoImg.onerror = () => {
                            // Si falla, continuar sin logo
                            canvas.toBlob((blob) => {
                                if (blob) {
                                    resolve(blob);
                                } else {
                                    reject(new Error('No se pudo convertir canvas a blob'));
                                }
                            }, 'image/png');
                        };
                        logoImg.src = '/logo-svg.svg';
                    }
                };

                img.onerror = () => {
                    reject(new Error(`Error cargando imagen ${index}`));
                };

                img.src = photoData;
            });
        });
    }

    private async generateFinalFrame(frameIndex: number = 0, totalFrames: number = 4): Promise<Blob> {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            canvas.width = VIDEO_CONFIG.WIDTH;
            canvas.height = VIDEO_CONFIG.HEIGHT;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject(new Error('No se pudo obtener contexto 2D'));
                return;
            }

            // Fondo negro
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, VIDEO_CONFIG.WIDTH, VIDEO_CONFIG.HEIGHT);

            // Logo SVG centrado con efecto fade
            const logoImg = new Image();
            logoImg.onload = () => {
                const logoWidth = 600;
                const logoHeight = (logoImg.height / logoImg.width) * logoWidth;
                const logoX = (VIDEO_CONFIG.WIDTH - logoWidth) / 2;
                const logoY = (VIDEO_CONFIG.HEIGHT - logoHeight) / 2;

                // Crear canvas temporal para convertir logo a blanco
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = logoWidth;
                tempCanvas.height = logoHeight;
                const tempCtx = tempCanvas.getContext('2d');
                
                if (tempCtx) {
                    // Dibujar logo original
                    tempCtx.drawImage(logoImg, 0, 0, logoWidth, logoHeight);
                    
                    // Convertir a blanco manteniendo el alpha
                    tempCtx.globalCompositeOperation = 'source-in';
                    tempCtx.fillStyle = '#FFFFFF';
                    tempCtx.fillRect(0, 0, logoWidth, logoHeight);
                    
                    // Efecto fade: aumentar opacidad gradualmente entre frames
                    // Frame 0: 0.2, Frame 1: 0.4, Frame 2: 0.6, Frame 3: 0.8
                    const fadeOpacity = 0.2 + (frameIndex / (totalFrames - 1)) * 0.6;
                    ctx.globalAlpha = fadeOpacity;
                    ctx.drawImage(tempCanvas, logoX, logoY);
                    ctx.globalAlpha = 1.0;
                }

                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('No se pudo convertir canvas a blob'));
                    }
                }, 'image/png');
            };
            logoImg.onerror = () => {
                reject(new Error('Error cargando logo para frame final'));
            };
            logoImg.src = '/logo-svg.svg';
        });
    }
}
