'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function SubirExcel({ onUploadSuccess }: { onUploadSuccess: () => void }) {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [mensaje, setMensaje] = useState('');
  const [subiendo, setSubiendo] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!archivo) return;

    setSubiendo(true);
    const formData = new FormData();
    formData.append('file', archivo);

    const res = await fetch('/api/subir_excel', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setMensaje(data.message || 'Archivo cargado.');
    setSubiendo(false);
    onUploadSuccess();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', textAlign: 'center' }}>
      <h2>Subir archivo Excel</h2>
      <input
        type="file"
        accept=".xlsx"
        onChange={(e) => setArchivo(e.target.files?.[0] || null)}
        required
      />
      <button
        type="submit"
        disabled={subiendo}
        style={{
          marginLeft: '1rem',
          padding: '8px 16px',
          backgroundColor: subiendo ? 'gray' : '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {subiendo ? 'Subiendo...' : 'Subir Excel'}
      </button>
      {mensaje && <p style={{ marginTop: '1rem' }}>{mensaje}</p>}
    </form>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [dogImages, setDogImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [excelSubido, setExcelSubido] = useState(false);
  
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

  const descargarArchivo = async () => {
    const res = await fetch('/api/descargar');

    if (!res.ok) {
      alert('❌ No se encontró el archivo para descargar.');
      return;
    }

    const blob = await res.blob();
    const disposition = res.headers.get('Content-Disposition');
    const match = disposition?.match(/filename="(.+)"/);
    const filename = match?.[1] || 'archivo.xlsx';

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

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

  const paginatedImages = dogImages.slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage);

  const ejecutarTodo = async () => {
    setIsProcessing(true);
    setProgress(0);
    setStatusText('Iniciando...');

    const pasos = [
      { url: '/api/sacar_codigo', progreso: 20, texto: 'Ejecutando sacar_codigo...' },
      { url: '/api/sacar_inventario', progreso: 70, texto: 'Procesando inventario...' },
      { url: '/api/sacar_existencias', progreso: 90, texto: 'Consultando existencias...' },
      { url: '/api/guardar_excel', progreso: 100, texto: 'Guardando Excel...' },
    ];

    for (const paso of pasos) {
      try {
        setStatusText(paso.texto);
        const res = await fetch(paso.url);
        const data = await res.json();
        if (!data.ok) throw new Error(data.error || 'Error en ' + paso.url);
        setProgress(paso.progreso);
      } catch (err) {
        alert('❌ Error al ejecutar ' + paso.url);
        setIsProcessing(false);
        return;
      }
    }

    alert('✅ Script ejecutado.');
    setIsProcessing(false);
  };

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
        <SubirExcel onUploadSuccess={() => setExcelSubido(true)} />

        <button
          onClick={ejecutarTodo}
          disabled={!excelSubido || isProcessing}
          style={{
            padding: '10px 20px',
            backgroundColor: !excelSubido || isProcessing ? 'gray' : 'black',
            color: 'white',
            borderRadius: '5px',
            marginBottom: '1rem',
            cursor: !excelSubido || isProcessing ? 'not-allowed' : 'pointer'
          }}
        >
          {isProcessing ? statusText : 'Ejecutar y Descargar Excel'}
        </button>

        <button
          onClick={async (e) => {
            const button = e.target as HTMLButtonElement;
            button.disabled = true;
            button.innerText = "Descargando...";
            await descargarArchivo();
            button.innerText = "Descargado ✓";
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2e7d32',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Descargar Excel Final
        </button>

        {isProcessing && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ background: '#ccc', borderRadius: '10px', overflow: 'hidden', height: '20px', width: '60%', margin: 'auto' }}>
              <div style={{ width: `${progress}%`, background: 'green', height: '100%', transition: 'width 0.5s' }}></div>
            </div>
            <p>{progress}%</p>
          </div>
        )}

        <h1>Perros: </h1>
        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}
        <br /><br />

        <p>Página {currentPage + 1} de {Math.ceil(dogImages.length / imagesPerPage)}</p>

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
