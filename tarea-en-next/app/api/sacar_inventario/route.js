// API: /app/api/sacar_inventario/route.js
import { exec } from 'child_process';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  const ruta = path.join(process.cwd(), 'sacar_inventario.py');
  return new Promise((resolve) => {
    exec(`python "${ruta}"`, (error, stdout, stderr) => {
      if (error || stderr) {
        resolve(NextResponse.json({ ok: false, error: error?.message || stderr }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ ok: true, output: stdout }));
      }
    });
  });
}