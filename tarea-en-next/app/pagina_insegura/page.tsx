// app/pagina_insegura/page.js
import Image from 'next/image';


export default function UnsafePage() {
    return (
        <div>
            <header>
                <nav>
                    <ul className="nav-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/dashboard">pagina segura</a></li>
                    </ul>
                </nav>
            </header>

            <div className="segura-container">
                <h1>Esta es una pagina insegura</h1>
                <Image 
                    src="/robo.jpeg" 
                    alt="la pantera rosa" 
                    className="index-image" 
                    width={500} 
                    height={300} 
                />
            </div>
        </div>
    );
}
