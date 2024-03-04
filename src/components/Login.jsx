import React, { useState } from 'react';

import Uno from '../images/zyzz1.jpg';
import Dos from '../images/zyzz2.jpg';
import Tres from '../images/zyzz3.jpg';

import { firebaseApp } from '../credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(firebaseApp);

function Login() {
    const [registro, setRegistro] = useState(false);
    const [mostrarContraseña, setMostrarContraseña] = useState(false);

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const correo = e.target.email.value;
        const contraseña = e.target.contraseña.value;

        if (registro) {
            await createUserWithEmailAndPassword(auth, correo, contraseña);
        } else {
            await signInWithEmailAndPassword(auth, correo, contraseña);
        }
    };

    return (
        <div className='row container p-4'>
            <div className="col-md-8">
                <div id="carouselExample" className="carousel slide">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={Uno} alt="" className='tamaño-imagen' />
                        </div>
                        <div className="carousel-item">
                            <img src={Dos} alt="" className='tamaño-imagen' />
                        </div>
                        <div className="carousel-item">
                            <img src={Tres} alt="" className='tamaño-imagen' />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            {/* en esta seccion sera el formulario */}
            <div className="col-md-4">
                <div className='mt-5 ms-5'>
                    <h1>{registro ? "registrate" : "iniciar sesion"}</h1>
                    <form onSubmit={handlerSubmit} >
                        <div className='mb-3'>
                            <label className='form-label'>Direccion de Email:</label>
                            <input className='form-control' type="email" placeholder='Ingresar email' id="email" required />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Contraseña: </label>
                            <div className="input-group">
                                <input className='form-control' type={mostrarContraseña ? "text" : "password"} placeholder='Ingresar contraseña' id="contraseña" required />
                                <button className="btn btn-outline-secondary" type="button" onClick={() => setMostrarContraseña(!mostrarContraseña)}>
                                    {mostrarContraseña ? "Ocultar" : "Mostrar"}
                                </button>
                            </div>
                        </div>

                        <button className='btn btn-primary' type='submit'>
                            {registro ? "registrate" : "inicia sesion"}
                        </button>
                    </form>

                    <div className='form-group'>
                        <button className='btn btn-secondary mt-4 form-control' onClick={() => setRegistro(!registro)}>
                            {registro ? "Ya tienes una cuenta? Inicia sesion" : "No tienes cuenta? Registrate"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
