"use client";

import { useState } from "react";
import Link from "next/link";
import { registroSchema } from "../../lib/validaciones";


export default function Register() {

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [errores, setErrores] = useState({});



    function registrarUsuario(event) {
        event.preventDefault();

        setMensaje("");
        setErrores({});

        const resultado = registroSchema.safeParse({
            nombre,
            correo,
            password,
            confirmar
        });

        if (!resultado.success) {

            const erroresFormulario = {};

            resultado.error.issues.forEach((error) => {

                const campo = error.path[0];

                if (!erroresFormulario[campo]) {
                    erroresFormulario[campo] = error.message;

                }

            });

            setErrores(erroresFormulario);
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

                        {errores.nombre && (
                            <p className="text-danger mt-1">
                                {errores.nombre}
                            </p>
                        )}

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

                        {errores.correo && (
                            <p className="text-danger mt-1">
                                {errores.correo}
                            </p>
                        )}

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

                        {errores.password && (
                            <p className="text-danger mt-1">
                                {errores.password}
                            </p>
                        )}

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

                        {errores.confirmar && (
                            <p className="text-danger mt-1">
                                {errores.confirmar}
                            </p>
                        )}

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