"use client";
import { useState } from "react";


export default function Contacto() {

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [asunto, setAsunto] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [mensajeContacto, setMensajeContacto] = useState("");


    function enviarFormulario(evento) {
        evento.preventDefault();

        if (
            !nombre.trim() ||
            !correo.trim() ||
            !asunto.trim() ||
            !mensaje.trim()

        ) {
            setMensajeContacto("Debes completar todos los campos.");
            return;

        }


        setMensajeContacto("¡Mensaje validado correctamente!");


        setNombre("");
        setCorreo("");
        setAsunto("");
        setMensaje("");

    }


    return (
        <main className="container my-5">

            <section className="text-center mb-5">

                <h1 className="fw-bold">
                    Contacto

                </h1>


                <p>
                    Si tienes alguna duda o consulta, puedes escribirnos.

                </p>

            </section>


            <section className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card p-4">

                        <h2 className="h4 text-center mb-4">
                            Envíanos un mensaje

                        </h2>


                        <form onSubmit={enviarFormulario}>
                            <div className="mb-3">
                                <label
                                    htmlFor="contactoNombre"
                                    className="form-label"
                                >
                                    Nombre:

                                </label>

                                <input
                                    type="text"
                                    id="contactoNombre"
                                    className="form-control"
                                    value={nombre}
                                    onChange={(evento) => setNombre(evento.target.value)}
                                    required
                                />
                            </div>


                            <div className="mb-3">
                                <label
                                    htmlFor="contactoCorreo"
                                    className="form-label"
                                >
                                    Correo:
                                </label>

                                <input
                                    type="email"
                                    id="contactoCorreo"
                                    className="form-control"
                                    value={correo}
                                    onChange={(evento) => setCorreo(evento.target.value)}
                                    required
                                />
                            </div>


                            <div className="mb-3">
                                <label
                                    htmlFor="asunto"
                                    className="form-label"
                                >
                                    Asunto:
                                </label>

                                <input
                                    type="text"
                                    id="asunto"
                                    className="form-control"
                                    value={asunto}
                                    onChange={(evento) => setAsunto(evento.target.value)}
                                    required
                                />
                            </div>


                            <div className="mb-3">

                                <label
                                    htmlFor="mensaje"
                                    className="form-label"
                                >
                                    Mensaje:
                                </label>

                                <textarea
                                    id="mensaje"
                                    className="form-control"
                                    rows="5"
                                    value={mensaje}
                                    onChange={(evento) => setMensaje(evento.target.value)}
                                    required
                                />
                            </div>


                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Enviar mensaje

                            </button>


                            {mensajeContacto && (

                                <p
                                    className="text-center mt-3"
                                    role="status"
                                >
                                    {mensajeContacto}

                                </p>

                            )}
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}