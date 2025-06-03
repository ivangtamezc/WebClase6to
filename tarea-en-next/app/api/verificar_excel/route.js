// app/api/verificar_excel/route.js
import fs from 'fs';
import path from 'path';

export async function GET() {
  const archivos = fs.readdirSync(process.cwd());
  const validos = archivos.filter((f) => f.endsWith('.xlsx') && f !== 'base_codigos.xlsx');
  const hayArchivo = validos.length > 0;

  return Response.json({ ok: hayArchivo });
}
