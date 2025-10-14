import { NextRequest, NextResponse } from 'next/server';
import { VideoGenerator } from '@/lib/videoGenerator';

export const maxDuration = 60; // 60 segundos máximo para la función

// Configurar CORS para permitir llamadas desde Netlify
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const { photos } = await request.json();

    if (!photos || !Array.isArray(photos) || photos.length !== 4) {
      return NextResponse.json(
        { error: 'Se requieren exactamente 4 fotos' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validar que las fotos sean base64
    for (const photo of photos) {
      if (!photo || typeof photo !== 'string' || !photo.startsWith('data:image')) {
        return NextResponse.json(
          { error: 'Formato de foto inválido' },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    // Generar video
    const generator = new VideoGenerator();
    const videoUrl = await generator.generateVideo(photos);

    // Convertir la URL de /temp/video-xxx.mp4 a /api/video/video-xxx.mp4
    const filename = videoUrl.split('/').pop();
    const apiVideoUrl = `/api/video/${filename}`;

    return NextResponse.json({
      success: true,
      videoUrl: apiVideoUrl,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Error generating video:', error);
    return NextResponse.json(
      { error: 'Error al generar el video', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
