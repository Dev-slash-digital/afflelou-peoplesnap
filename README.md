# Afflelou PeopleSnap - Magic Sunny Campaign

Aplicación web interactiva para la campaña Magic Sunny de Afflelou. Permite a los usuarios crear videos personalizados con sus selfies.

## 🎯 Características

- 📸 Captura de 4 selfies con cámara web/móvil
- 🎬 Generación de video automática (6 segundos)
- 🌐 Soporte multiidioma (Francés/Inglés)
- 📱 Diseño responsive (móvil primero)
- 🎨 Gradientes animados de fondo
- ⚡ Procesamiento en el navegador (sin servidor)

## 🛠️ Tecnologías

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19, Tailwind CSS
- **Video:** FFmpeg WebAssembly
- **Base de datos:** Supabase
- **Tipado:** TypeScript
- **Fuentes:** ITC Avant Garde Gothic Std

## 📋 Requisitos previos

- Node.js 20+
- npm o yarn
- Cuenta de Supabase

## 🚀 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/Dev-slash-digital/afflelou-peoplesnap.git
cd afflelou-peoplesnap
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env.local
```

Editar `.env.local` con tus credenciales de Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima
```

4. Ejecutar en desarrollo:
```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## 📦 Build de producción

```bash
npm run build
npm start
```

## 🗄️ Configuración de Supabase

Crear tabla `submissions`:

```sql
CREATE TABLE submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT NOT NULL,
  date_naissance DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar acceso público (solo para inserts)
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON submissions
  FOR INSERT TO anon
  WITH CHECK (true);
```

## 🌐 Deploy

### Vercel (Recomendado)

1. Conectar repositorio en [vercel.com](https://vercel.com)
2. Configurar variables de entorno
3. Deploy automático

### Netlify

1. Conectar repositorio en [netlify.com](https://netlify.com)
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Configurar variables de entorno

## 📁 Estructura del proyecto

```
afflelou-peoplesnap/
├── app/                      # Páginas de Next.js
│   ├── start/               # Página inicial
│   ├── permission/          # Permisos de cámara
│   ├── take-selfie/         # Captura de fotos
│   ├── validate-selfie/     # Validación de foto
│   ├── form/                # Formulario de datos
│   └── final-processing/    # Generación y descarga de video
├── components/              # Componentes reutilizables
│   ├── Button.tsx
│   ├── Input.tsx
│   └── LanguageSelector.tsx
├── lib/                     # Lógica de negocio
│   ├── videoGeneratorClient.ts  # Generador de video (cliente)
│   ├── videoConfig.ts           # Configuración del video
│   ├── translations.ts          # Traducciones FR/EN
│   └── supabase.ts             # Cliente de Supabase
├── hooks/                   # React hooks personalizados
│   └── useTranslation.ts
└── public/                  # Archivos estáticos
    ├── logo-svg.svg
    └── fonts/
```

## 🎨 Personalización

### Colores de gradientes

Editar `lib/videoConfig.ts`:

```typescript
BACKGROUND_GRADIENTS: [
  { start: '#2C42D4', end: '#BACCF2' }, // Azul
  { start: '#FE9E48', end: '#FDDE81' }, // Naranja
  { start: '#EB4877', end: '#F6BBD1' }, // Rosa
]
```

### Duración del video

```typescript
VIDEO_DURATION: 7, // segundos
FRAMES_PER_SECOND: 2,
FINAL_LOGO_FRAMES: 10,
```

## 🐛 Solución de problemas

### Error de cámara
- Verificar permisos del navegador
- Usar HTTPS (requerido para acceso a cámara)

### Video no se genera
- Verificar que el navegador soporte WebAssembly
- Limpiar caché del navegador
- Verificar consola para errores

### Error de Supabase
- Verificar variables de entorno
- Verificar políticas RLS en Supabase
- Verificar que la tabla existe

## 📄 Licencia

Propiedad de Afflelou. Todos los derechos reservados.

## 👥 Contacto

Para soporte o consultas: [tu-email@ejemplo.com]

---

Desarrollado con ❤️ para Afflelou Magic Sunny Campaign
