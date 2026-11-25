"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { peticionApi, guardarSesion } from "../../lib/api";


export default function Register() {

    const router = useRouter();

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);


    async function registrarUsuario(event) {

        event.preventDefault();

        setMensaje("");


        if (!nombre.trim() || !correo.trim() || !password.trim()) {

            setMensaje("Debes completar todos los campos.");

            return;

        }


        if (password.length < 8) {

            setMensaje("La contraseña debe tener al menos 8 caracteres.");

            return;

        }


        if (password !== confirmarPassword) {

            setMensaje("Las contraseñas no coinciden.");

            return;

        }


        setCargando(true);


        try {

            const datos = await peticionApi("/auth/register", {

                method: "POST",

                autenticado: false,

                body: JSON.stringify({

                    nombre: nombre.trim(),

                    email: correo.trim(),

                    password

                })

            });


            guardarSesion(datos);

            router.push("/");

        } catch (error) {

            setMensaje(error.message);

        } finally {

            setCargando(false);

        }

    }


    return (

        <main className="container my-5">

            <section className="text-center mb-5">

                <h1 className="fw-bold">Registrarse</h1>

                <p>Crea tu cuenta en Fortinity.</p>

            </section>


            <section
                className="card p-4 mx-auto"
                style={{ maxWidth: "450px" }}
            >

                <h2 className="h4 text-center mb-4">
                    Crear cuenta

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

                        <label htmlFor="confirmarPassword" className="form-label">
                            Confirmar contraseña:

                        </label>

                        <input
                            type="password"
                            id="confirmarPassword"
                            className="form-control"
                            value={confirmarPassword}
                            onChange={(event) => setConfirmarPassword(event.target.value)}
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={cargando}
                    >

                        {cargando ? "Registrando..." : "Registrarse"}

                    </button>

                </form>


                {mensaje && (

                    <p className="text-danger text-center mt-3">
                        {mensaje}

                    </p>

                )}


                <p className="text-center mt-4">

                    ¿Ya tienes una cuenta?{" "}

                    <Link href="/login">
                        Iniciar sesión

                    </Link>

                </p>

            </section>

        </main>

    );
}