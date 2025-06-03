// app/api/subir_excel/route.js
import { writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file || typeof file === 'string') {
    return NextResponse.json({ ok: false, error: 'Archivo inválido.' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const savePath = path.join(process.cwd(), file.name); // sobrescribe si ya existe

  await writeFile(savePath, buffer);
  return NextResponse.json({ ok: true, message: 'Archivo subido correctamente.' });
}

