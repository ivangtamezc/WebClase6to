// app/page.tsx
import Image from 'next/image';
import './style.css';

export default function HomePage() {
    return (
        <div>
            <header>
                <nav>
                    <ul className="nav-links">
                        <li><a href="/pagina_insegura">Pagina insegura</a></li>
                        <li><a href="/dashboard">Dashboard</a></li>
                    </ul>
                </nav>
            </header>

            <div className="dashboard-container">
                <h1>Bienvenido a mi pagina</h1>
                <Image 
                    src="/pantera.jpeg" 
                    alt="A pink panther" 
                    className="index-image" 
                    width={500} 
                    height={300} 
                />
            </div>
        </div>
    );
}
