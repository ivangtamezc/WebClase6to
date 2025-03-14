'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    const login = () => {
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        if (username === 'admin' && password === '1234') {
            localStorage.setItem('auth', 'true'); // Guarda la autenticación en el localStorage
            router.push('/dashboard'); // Redirige al dashboard
        } else {
            alert('Invalid username or password');
        }
    };

    const recuperar = () => {
        router.push('/recuperar'); // Redirige a la página de recuperación
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input type="text" id="username" placeholder="Username" />
            <input type="password" id="password" placeholder="Password" />
            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={login}>Login</button>
                <button onClick={recuperar} style={{ background: '#4A90E2', color: 'white' }}>
                    Recuperar contraseña
                </button>
            </div>
        </div>
    );
}


