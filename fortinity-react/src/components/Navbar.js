"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { obtenerUsuario, cerrarSesion } from "../lib/api";


export default function Navbar() {

    const router = useRouter();

    const [usuario, setUsuario] = useState(null);


    useEffect(() => {

        function actualizarSesion() {

            setUsuario(obtenerUsuario());

        }


        actualizarSesion();


        window.addEventListener(
            "sesion-actualizada",
            actualizarSesion
        );


        return () => {

            window.removeEventListener(
                "sesion-actualizada",
                actualizarSesion
            );

        };

    }, []);


    function salir() {

        cerrarSesion();

        setUsuario(null);

        router.push("/login");

    }


    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">

            <div className="container">

                <Link className="navbar-brand" href="/">
                    Fortinity
                </Link>


                <div className="d-flex flex-wrap gap-3 align-items-center">

                    <Link className="text-white" href="/">
                        Inicio
                    </Link>

                    <Link className="text-white" href="/productos">
                        Productos
                    </Link>

                    <Link className="text-white" href="/nosotros">
                        Sobre nosotros
                    </Link>

                    <Link className="text-white" href="/blog">
                        Blog
                    </Link>

                    <Link className="text-white" href="/contacto">
                        Contacto
                    </Link>


                    {!usuario ? (

                        <>

                            <Link className="text-white" href="/login">
                                Iniciar Sesión
                            </Link>

                            <Link className="text-white" href="/register">
                                Registrarse
                            </Link>

                        </>

                    ) : (

                        <>

                            <span className="text-white">
                                Hola, {usuario.nombre}
                            </span>


                            {(usuario.rol === "ADMIN" ||
                              usuario.rol === "VENDEDOR") && (

                                <Link className="text-white" href="/admin">
                                    Administración
                                </Link>

                            )}


                            <button
                                className="btn btn-outline-light btn-sm"
                                onClick={salir}
                            >
                                Cerrar sesión
                            </button>

                        </>

                    )}


                    <Link className="text-white" href="/carrito">
                        🛒 Carrito
                    </Link>
                </div>
            </div>
        </nav>
    );
}