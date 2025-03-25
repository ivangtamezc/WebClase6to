'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        birthdate: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleClear = () => {
        setFormData({
            name: '',
            birthdate: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

        const emailExists = storedUsers.some((user: any) => user.email === formData.email);

        if (emailExists) {
            alert('Este correo ya está registrado');
            return;
        }

        const newUser = {
            name: formData.name,
            birthdate: formData.birthdate,
            email: formData.email,
            password: formData.password
        };

        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));

        alert('¡Usuario registrado con éxito!');
        handleClear();
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Registro de Cuenta</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
                <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
                <input type="password" name="confirmPassword" placeholder="Confirmar Contraseña" value={formData.confirmPassword} onChange={handleChange} required />
                <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Registrar</button>
                <button type="button" onClick={handleClear} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#ff6666', color: 'white' }}>Borrar Datos</button>
            </form>
            <p>¿Ya tienes una cuenta? <Link href="/login">Inicia sesión</Link></p>
        </div>
    );
}