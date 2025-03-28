import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email, newPassword } = await req.json();

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Recuperar contraseña',
      html: `
        <p>Has solicitado recuperar tu contraseña.</p>
        <p>Tu nueva contraseña temporal es:</p>
        <h2 style="color: #4A90E2;">${newPassword}</h2>
      `
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
