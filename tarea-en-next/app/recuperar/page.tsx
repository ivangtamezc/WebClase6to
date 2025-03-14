'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(`Se ha enviado un enlace de recuperación a: ${email} (aún no conectado a backend)`);
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Recuperar Contraseña</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Correo Electrónico" 
                    value={email} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    Enviar enlace de recuperación
                </button>
            </form>
            
            <p>¿No tienes una cuenta? <Link href="/register">Regístrate</Link></p>
        </div>
    );
}
