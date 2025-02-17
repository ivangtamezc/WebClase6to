import React, { useState } from 'react';
import './App.css';
import logo from './logo.svg';
import sonic from './sonic.jpeg';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin' && password === '1234') {
      setLoggedIn(true);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  if (loggedIn) {
    return (
      <div className="App">
        <header className="App-header">
          <h2>¡Felicidades! Entraste</h2>
          <img src={"sonic.jpeg"} alt="Sonic" className="sonic-image" />
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input 
            type="text" 
            placeholder="Usuario" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
      </header>
    </div>
  );
}

export default App;