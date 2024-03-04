import React, { useState } from 'react';
import './App.css';

import Home from './components/Home';
import Login from './components/Login'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from './credenciales';

const auth = getAuth(firebaseApp)

function App() {

  const [usuario, setUsuario] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUsuario(usuarioFirebase)
    }
    else {
      setUsuario(null)
    }
  })
  return (
    <div >
      {usuario ? <Home correoUsuario={usuario.email} /> : <Login />}
    </div >
  );
}

export default App;
