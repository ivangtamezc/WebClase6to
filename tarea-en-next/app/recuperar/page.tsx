'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = storedUsers.some((user: any) => user.email === email);

        if (!userExists) {
            alert('Este correo no está registrado.');
            return;
        }

        // Generar nueva contraseña de 4 dígitos
        const newPassword = Math.floor(1000 + Math.random() * 9000).toString();

        // Actualizar la contraseña del usuario
        const updatedUsers = storedUsers.map((user: any) =>
            user.email === email ? { ...user, password: newPassword } : user
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword }),
            });

            const result = await response.json();

            if (result.success) {
                alert(`📨 Se envió tu nueva contraseña a: ${email}`);
            } else {
                alert('Hubo un error al enviar el correo.');
                console.error(result.error);
            }
        } catch (error) {
            alert('Error de conexión al servidor.');
            console.error(error);
        }
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
                    Enviar nueva contraseña
                </button>
            </form>
            
            <p>¿No tienes una cuenta? <Link href="/register">Regístrate</Link></p>
        </div>
    );
}
