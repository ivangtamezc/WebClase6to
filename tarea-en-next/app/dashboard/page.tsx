'use client';


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function DashboardPage() {
    const router = useRouter();
    const [dogImages, setDogImages] = useState([]);


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const imagesPerPage = 5;


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


    // Función para obtener un array de 20 imágenes de perro
    const fetchDogImages = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://dog.ceo/api/breeds/image/random/20");
            const data = await response.json();
            setDogImages(data.message);
        } catch (error) {
            setError("Error al obtener las imágenes de perros");
        }
        setLoading(false);
    };






    useEffect(() => {
        fetchDogImages();
       
    }, []);


    // Paginación: obtiene las imágenes a mostrar en la página actual
    const paginatedImages = dogImages.slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage);


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
                <h1>Perros: </h1>
                {loading && <p>Cargando...</p>}
                {error && <p>{error}</p>}
               
                <br /><br />


                <p>Página {currentPage + 1} de 4</p>


                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", justifyContent: "center" }}>
                    {paginatedImages.map((image, index) => (
                        <img key={index} src={image} alt="Perro" style={{ height: "150px", width: "150px", borderRadius: "10px" }} />
                    ))}
                </div>
                <br /><br />
                <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                    <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} disabled={currentPage === 0} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
                        ⬅️ Anterior
                    </button>
                    <button onClick={() => setCurrentPage((prev) => (prev + 1) < (dogImages.length / imagesPerPage) ? prev + 1 : prev)} disabled={(currentPage + 1) >= (dogImages.length / imagesPerPage)} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
                        Siguiente ➡️
                    </button>
                </div>
                <br />
                <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                   
                    <button className="logout-btn" onClick={logout} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
                        Logout
                    </button>
                   
                </div>
            </main>
        </div>
    );
}
