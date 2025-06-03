import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const tempDir = path.join(process.cwd(), 'temp');
  const archivos = fs.readdirSync(tempDir).filter(file => file.endsWith('.xlsx'));

  if (archivos.length === 0) {
    return NextResponse.json({ ok: false, error: 'Archivo no encontrado' }, { status: 404 });
  }

  const nombreArchivo = archivos[0];
  const ruta = path.join(tempDir, nombreArchivo);
  const buffer = fs.readFileSync(ruta);

  // Borrar después de leer
  fs.unlinkSync(ruta);

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${nombreArchivo}"`,
    },
  });
}
