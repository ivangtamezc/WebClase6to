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

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input type="text" id="username" placeholder="Username" />
            <input type="password" id="password" placeholder="Password" />
            <button onClick={login}>Login</button>
        </div>
    );
}


