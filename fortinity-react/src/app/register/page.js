"use client";

import { useState } from "react";
import Link from "next/link";


export default function Register() {

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [mensaje, setMensaje] = useState("");


    function registrarUsuario(event) {

        event.preventDefault();

        if (!nombre.trim() || !correo.trim() || !password || !confirmar) {
            setMensaje("Debes completar todos los campos.");
            return;

        }

        if (password !== confirmar) {
            setMensaje("Las contraseñas no coinciden.");
            return;

        }

        if (password.length < 6) {
            setMensaje("La contraseña debe tener al menos 6 caracteres.");
            return;

        }

        setMensaje("Formulario de registro validado correctamente.");

    }


    return (
        <main className="container my-5">
            <section className="text-center mb-5">

                <h1 className="fw-bold">Registrarse</h1>

                <p>
                    Completa el formulario para comenzar en Fortinity.

                </p>

            </section>


            <section
                className="card p-4 mx-auto"
                style={{ maxWidth: "450px" }}
            >

                <h2 className="h4 text-center mb-4">
                    Crear una cuenta

                </h2>


                <form onSubmit={registrarUsuario}>

                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">
                            Nombre:

                        </label>

                        <input
                            type="text"
                            id="nombre"
                            className="form-control"
                            value={nombre}
                            onChange={(event) => setNombre(event.target.value)}
                            required
                        />

                    </div>


                    <div className="mb-3">

                        <label htmlFor="correo" className="form-label">
                            Correo:

                        </label>

                        <input
                            type="email"
                            id="correo"
                            className="form-control"
                            value={correo}
                            onChange={(event) => setCorreo(event.target.value)}
                            required
                        />

                    </div>


                    <div className="mb-3">

                        <label htmlFor="password" className="form-label">
                            Contraseña:

                        </label>

                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />

                    </div>


                    <div className="mb-3">

                        <label htmlFor="confirmar" className="form-label">
                            Confirmar contraseña:

                        </label>

                        <input
                            type="password"
                            id="confirmar"
                            className="form-control"
                            value={confirmar}
                            onChange={(event) => setConfirmar(event.target.value)}
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Registrarse

                    </button>

                </form>


                {mensaje && (

                    <p className="text-center mt-3">
                        {mensaje}

                    </p>

                )}


                <p className="text-center mt-4">

                    ¿Ya tienes una cuenta?{" "}

                    <Link href="/login">
                        Iniciar Sesión
                        
                    </Link>

                </p>

            </section>

        </main>
    );

}