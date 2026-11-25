"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { peticionApi, guardarSesion } from "../../lib/api";


export default function Login() {

    const router = useRouter();

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);


    async function iniciarSesion(event) {

        event.preventDefault();

        setMensaje("");


        if (!correo.trim() || !password.trim()) {

            setMensaje("Debes completar todos los campos.");

            return;

        }


        setCargando(true);


        try {

            const datos = await peticionApi("/auth/login", {

                method: "POST",

                autenticado: false,

                body: JSON.stringify({

                    email: correo.trim(),

                    password

                })

            });


            guardarSesion(datos);


            if (
                datos.usuario.rol === "ADMIN" ||
                datos.usuario.rol === "VENDEDOR"
            ) {

                router.push("/admin");

            } else {

                router.push("/");

            }

        } catch (error) {

            setMensaje(error.message);

        } finally {

            setCargando(false);

        }

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
                        disabled={cargando}
                    >

                        {cargando ? "Iniciando sesión..." : "Iniciar Sesión"}

                    </button>

                </form>


                {mensaje && (

                    <p className="text-danger text-center mt-3">
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