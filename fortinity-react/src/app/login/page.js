"use client";
import { useState } from "react";
import Link from "next/link";


export default function Login() {

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");


    function iniciarSesion(event) {
        event.preventDefault();

        if (!correo.trim() || !password.trim()) {
            setMensaje("Debes completar todos los campos.");
            return;

        }
        setMensaje("Formulario de inicio de sesión validado correctamente.");

    }


    return (
        <main className="container my-5">
            <section className="text-center mb-5">

                <h1 className="fw-bold">Iniciar Sesión</h1>

                <p>
                    Ingresa tus datos para acceder a Fortinity.

                </p>

            </section>


            <section
                className="card p-4 mx-auto"
                style={{ maxWidth: "450px" }}
            >

                <h2 className="h4 text-center mb-4">
                    Bienvenido a Fortinity

                </h2>


                <form onSubmit={iniciarSesion}>

                    <div className="mb-3">
                        <label htmlFor="loginCorreo" className="form-label">
                            Correo:

                        </label>

                        <input
                            type="email"
                            id="loginCorreo"
                            className="form-control"
                            value={correo}
                            onChange={(event) => setCorreo(event.target.value)}
                            required
                        />

                    </div>


                    <div className="mb-3">

                        <label htmlFor="loginPassword" className="form-label">
                            Contraseña:

                        </label>

                        <input
                            type="password"
                            id="loginPassword"
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Iniciar Sesión

                    </button>

                </form>


                {mensaje && (

                    <p className="text-center mt-3">
                        {mensaje}

                    </p>

                )}


                <p className="text-center mt-4">

                    ¿No tienes una cuenta?{" "}

                    <Link href="/register">
                        Registrarse
                        
                    </Link>

                </p>

            </section>

        </main>
    );

}