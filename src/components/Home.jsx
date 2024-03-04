import React, { useEffect, useState } from 'react';
import { firebaseApp } from '../credenciales';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore'; // Importar getDoc aquí

// Obtener la instancia de autenticación y firestore de Firebase
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

function Home({ correoUsuario }) {
    // Estado inicial para los datos del usuario
    const valorInicial = {
        nombre: "",
        edad: "",
        profesion: "",
    }

    // Estado para almacenar los datos del usuario y la lista de usuarios
    const [user, setUser] = useState(valorInicial);
    const [lista, setLista] = useState([]);
    const [editUserId, setEditUserId] = useState('');

    // Función para capturar los cambios en los inputs del formulario
    const capturarInputs = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    // Función para obtener la lista de usuarios desde Firestore
    const obtenerUsuarios = async () => {
        try {
            // Obtener todos los documentos de la colección 'usuarios' en Firestore
            const querySnapshot = await getDocs(collection(db, "usuarios"));
            const usuarios = [];
            // Iterar sobre cada documento y agregarlo a la lista de usuarios
            querySnapshot.forEach((doc) => {
                usuarios.push({ ...doc.data(), id: doc.id });
            });
            // Establecer la lista de usuarios en el estado
            setLista(usuarios);
        } catch (error) {
            alert(error);
        }
    }

    // Efecto para cargar la lista de usuarios al cargar el componente
    useEffect(() => {
        obtenerUsuarios();
    }, []);

    // Función para eliminar un usuario de Firestore
    const eliminarUsuario = async (id) => {
        try {
            // Eliminar el documento correspondiente al usuario en Firestore
            await deleteDoc(doc(db, 'usuarios', id));
            // Obtener la lista actualizada de usuarios después de eliminar
            obtenerUsuarios();
        } catch (error) {
            console.log(error);
        }
    }

    // Función para editar un usuario de Firestore
    const editarUsuario = async (id) => {
        try {
            // Obtener el documento correspondiente al usuario en Firestore
            const docRef = doc(db, "usuarios", id);
            const docSnap = await getDoc(docRef);
            const userData = docSnap.data();
            // Establecer los datos del usuario en el estado y su ID para la edición
            setUser(userData);
            setEditUserId(id);
        } catch (error) {
            console.log(error);
        }
    }

    // Función para guardar los datos del usuario en Firestore
    const guardarDatos = async (e) => {
        e.preventDefault();
        try {
            // Si editUserId tiene un valor, actualiza el documento correspondiente
            if (editUserId) {
                await setDoc(doc(db, 'usuarios', editUserId), { ...user });
            } else { // Si no, agrega un nuevo documento
                await addDoc(collection(db, 'usuarios'), { ...user });
            }
        } catch (error) {
            console.log(error);
        }
        // Restablecer los valores del formulario y editUserId
        setUser({ ...valorInicial });
        setEditUserId('');
        // Obtener la lista actualizada de usuarios después de guardar
        obtenerUsuarios();
    }

    return (
        <div className='container text-white home'>
            {/* Mostrar el nombre de usuario */}
            <p className='fs-5'>Bienvenido, <strong>{correoUsuario}.</strong> Haz iniciado sesión</p>
            {/* Botón para cerrar sesión */}
            <button className='btn btn-primary' onClick={() => signOut(auth)}>Cerrar sesión</button>
            <hr />

            <div className='row'>
                {/* Formulario para ingresar datos de usuario */}
                <div className="col-md-4">
                    <h3 className='text-center mb-3'>Ingresar usuario</h3>
                    <form onSubmit={guardarDatos}>
                        <div className='card card-body'>
                            {/* Campos de texto para ingresar datos del usuario */}
                            <div className='form-group'>
                                <input type="text" name='nombre' className='form-control mb-3' placeholder='Ingresar el nombre del usuario' onChange={capturarInputs} value={user.nombre} />
                                <input type="text" name='edad' className='form-control mb-3' placeholder='Ingresar la edad del usuario' onChange={capturarInputs} value={user.edad} />
                                <input type="text" name='profesion' className='form-control mb-3' placeholder='Ingresar la profesion del usuario' onChange={capturarInputs} value={user.profesion} />
                            </div>
                            {/* Botón para guardar los datos del usuario */}
                            <button className='btn btn-primary'>Guardar</button>
                        </div>
                    </form>
                </div>
                {/* Sección para mostrar la lista de usuarios */}
                <div className="col-md-8">
                    <h2 className='text-center mb-5'>Lista de usuarios</h2>
                    <div className='container card '>
                        <div className='card-body'>
                            {/* Iterar sobre la lista de usuarios y mostrar cada uno */}
                            {lista.map((usuario) => (
                                <div key={usuario.id}>
                                    <p>Nombre: {usuario.nombre}</p>
                                    <p>Edad: {usuario.edad}</p>
                                    <p>Profesión: {usuario.profesion}</p>
                                    {/* Botón para eliminar el usuario */}
                                    <button className='btn btn-danger' onClick={() => eliminarUsuario(usuario.id)}>
                                        Eliminar
                                    </button>
                                    {/* Botón para editar el usuario */}
                                    <button className='btn btn-success m-1' onClick={() => editarUsuario(usuario.id)}>
                                        Editar
                                    </button>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
