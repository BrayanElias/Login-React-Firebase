import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Importar correctamente los iconos


// Importar las imágenes del carrusel
import Uno from '../images/zyzz1.jpg';
import Dos from '../images/zyzz2.jpg';
import Tres from '../images/zyzz3.jpg';
import Cuatro from '../images/zyzz4.jpg';

// Importar Firebase y sus funciones de autenticación
import { firebaseApp } from '../credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Obtener la instancia de autenticación de Firebase
const auth = getAuth(firebaseApp);

function Login() {
    const [registro, setRegistro] = useState(false); // Estado para manejar el modo de registro
    const [mostrarContraseña, setMostrarContraseña] = useState(false); // Estado para mostrar/ocultar la contraseña
    const [activeIndex, setActiveIndex] = useState(0); // Estado para mantener el índice de la imagen activa en el carrusel

    // Función para pasar a la siguiente diapositiva del carrusel
    const nextSlide = () => {
        const nextIndex = (activeIndex + 1) % 4; // Ajustar 4 al número total de imágenes en tu carrusel
        setActiveIndex(nextIndex);
    };

    // Efecto para cambiar de diapositiva automáticamente cada 2 segundos
    useEffect(() => {
        const interval = setInterval(nextSlide, 4000); // Cambiar de diapositiva cada 3 segundos
        return () => clearInterval(interval);
    }, [activeIndex]);

    // Función para manejar el envío del formulario de inicio de sesión/registro
    const handlerSubmit = async (e) => {
        e.preventDefault();
        const correo = e.target.email.value;
        const contraseña = e.target.contraseña.value;

        try {
            if (registro) {
                await createUserWithEmailAndPassword(auth, correo, contraseña); // Crear un nuevo usuario
            } else {
                await signInWithEmailAndPassword(auth, correo, contraseña); // Iniciar sesión con un usuario existente
            }
        } catch (error) {
            // Mostrar una alerta en caso de error
            toast.error('Correo o Contraseña\n NO VÁLIDOS', {
                style: {
                    fontFamily: '"Kode Mono", monospace',
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                    height: "70px",
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
                duration: 4000,
            });
        }
    };

    return (
        <div className='container p-4 login'>
            <div className="col-md-6 mx-auto"> {/* Alinear el formulario al centro */}
                {/* Carrusel de imágenes */}
                <div id="carouselExample" className="carousel slide">
                    <div className="carousel-inner">
                        {/* Primera imagen */}
                        <div className={`carousel-item ${activeIndex === 0 ? 'active' : ''}`}>
                            <img src={Uno} alt="" className='tamaño-imagen' />
                        </div>
                        {/* Segunda imagen */}
                        <div className={`carousel-item ${activeIndex === 1 ? 'active' : ''}`}>
                            <img src={Dos} alt="" className='tamaño-imagen' />
                        </div>
                        {/* Tercera imagen */}
                        <div className={`carousel-item ${activeIndex === 2 ? 'active' : ''}`}>
                            <img src={Tres} alt="" className='tamaño-imagen' />
                        </div>
                        {/* Cuarta imagen */}
                        <div className={`carousel-item ${activeIndex === 3 ? 'active' : ''}`}>
                            <img src={Cuatro} alt="" className='tamaño-imagen' />
                        </div>
                    </div>
                    {/* Botón para la diapositiva anterior */}
                    {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button> */}
                    {/* Botón para la diapositiva siguiente */}
                    {/* <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button> */}
                </div>
            </div>
            {/* Sección del formulario de inicio de sesión/registro */}
            <div className="col-md-5 mx-auto"> {/* Alinear el formulario al centro */}
                <div className='mt-5 contenedor-form'>
                    {/* Encabezado del formulario */}
                    <h1 className='text-center fs-7 fw-bold title-form' >{registro ? "Regístrate" : "Iniciar Sesión"}</h1>
                    {/* Formulario */}
                    <form className='form-login' onSubmit={handlerSubmit} >
                        <div className='mb-3'>
                            {/* Campo de correo electrónico */}
                            <label className='form-label title-email'>Dirección de Email:</label>
                            <input className='form-control' type="email" placeholder='Ingresar email' id="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" required />
                        </div>
                        <div className='mb-3'>
                            {/* Campo de contraseña */}
                            <label className='form-label title-email'>Contraseña:</label>
                            <div className="input-group">
                                <input className='form-control' type={mostrarContraseña ? "text" : "password"} placeholder='Ingresar contraseña' id="contraseña" minLength="6" required />
                                {/* Botón para mostrar/ocultar la contraseña */}
                                <button className="btn btn-outline-secondary bg-white text-secondary" type="button" style={{ borderColor: "#DEE2E6" }} onClick={() => setMostrarContraseña(!mostrarContraseña)}>
                                    <FontAwesomeIcon icon={mostrarContraseña ? faEyeSlash : faEye} /> {/* Usar el icono correcto */}
                                </button>
                            </div>
                        </div>
                        {/* Botón para enviar el formulario */}
                        <button className='btn btn-lg btn-primary d-block mx-auto' type='submit'>
                            {registro ? "Regístrate" : "Iniciar Sesión"}
                        </button>
                    </form>
                    {/* Botón para cambiar entre iniciar sesión y registrarse */}
                    <div className='form-group'>
                        <button className='btn btn-secondary mt-4 form-control' onClick={() => setRegistro(!registro)}>
                            {registro ? "¿Ya tienes una cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
                        </button>
                    </div>
                </div>
            </div>
            {/* Componente Toast para mostrar alertas */}
            <Toaster />
        </div>
    );
}

export default Login;
