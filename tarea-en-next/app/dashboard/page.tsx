'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();
    const [dogImage, setDogImage] = useState(null);
    const [catImage, setCatImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('auth') === 'true';
        
        if (!isAuthenticated) {
            alert('You need to log in to access the dashboard');
            router.push('/login'); 
        }
    }, [router]);

    const logout = () => {
        localStorage.removeItem('auth');
        router.push('/');
    };

    // Función para obtener una nueva imagen de perro
    const fetchDogImage = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://dog.ceo/api/breeds/image/random");
            const data = await response.json();
            setDogImage(data.message);
        } catch (error) {
            setError("Error al obtener la imagen de perro");
        }
        setLoading(false);
    };

    const fetchCatImage = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://api.thecatapi.com/v1/images/search");
            const data = await response.json();
            setCatImage(data[0].url);
        } catch (error) {
            setError("Error al obtener la imagen de perro");
        }
        setLoading(false);
    };

    // Llamar a la API cuando se carga la página
    useEffect(() => {
        fetchDogImage();
        fetchCatImage();
    }, []);

    return (
        <div>
            <header>
                <nav>
                    <ul className="nav-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/pagina_insegura">Pagina insegura</a></li>
                    </ul>
                </nav>
            </header>

            <main style={{ textAlign: "center", padding: "20px" }}>
                <h1>Perros vs Gatos </h1>
                {loading && <p>Cargando...</p>}
                {error && <p>{error}</p>}
                <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                {dogImage && <img src={dogImage} alt="Perro" style={{height: "300px", width: "300px", borderRadius: "10px" }} />}
                {catImage && <img src={catImage} alt="Gato" style={{ height: "300px", width: "300px", borderRadius: "10px" }} />}
                </div>
                <br /><br />
                <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                    <button onClick={fetchDogImage} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
                        Cambiar perro
                    </button>
                    <button className="logout-btn" onClick={logout} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
                        Logout
                    </button>
                    <button onClick={fetchCatImage} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
                        Cabiar gato
                    </button>
                </div>
                
               

            </main>
        </div>
    );
}