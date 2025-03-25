'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    const login = () => {
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

        const foundUser = storedUsers.find(
            (user: any) => user.email === username && user.password === password
        );

        if (foundUser) {
            localStorage.setItem('auth', 'true');
            router.push('/dashboard');
        } else {
            alert('Correo o contraseña incorrectos');
        }
    };

    const recuperar = () => {
        router.push('/recuperar');
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input type="text" id="username" placeholder="Correo electrónico" />
            <input type="password" id="password" placeholder="Contraseña" />
            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={login}>Login</button>
                <button onClick={recuperar} style={{ background: '#4A90E2', color: 'white' }}>
                    Recuperar contraseña
                </button>
            </div>
        </div>
    );
}