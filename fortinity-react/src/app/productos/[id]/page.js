"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function DetalleProducto() {

    const { id } = useParams();


    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        async function cargarProducto() {

            setCargando(true);

            setProducto(null);

            setError("");


            try {

                const respuesta = await fetch(
                    "/api/productos",
                    {
                        cache: "no-store"
                    }
                );


                if (!respuesta.ok) {

                    throw new Error("Error al cargar producto");

                }


                const datos = await respuesta.json();


                const encontrado = datos.find(

                    (producto) => producto.id === Number(id)

                );


                setProducto(encontrado || null);

            } catch (error) {

                console.error(error);

                setError("No se pudo conectar con el servidor.");

            } finally {

                setCargando(false);

            }

        }


        cargarProducto();

    }, [id]);


    if (cargando) {

        return (

            <main className="container my-5 text-center">

                <p>Cargando producto...</p>

            </main>

        );

    }


    if (!producto) {

        return (

            <main className="container my-5 text-center">

                <h1>{error || "Producto no encontrado"}</h1>


                <Link
                    href="/productos"
                    className="btn btn-primary"
                >
                    Volver al catálogo

                </Link>

            </main>

        );

    }


    return (

        <main className="container my-5">

            <div className="row align-items-center g-4">

                <div className="col-md-6">

                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="img-fluid rounded"
                    />

                </div>


                <div className="col-md-6">

                    <h1>{producto.nombre}</h1>

                    <p>{producto.descripcion}</p>


                    <h3>
                        ${producto.precio.toLocaleString("es-CL")}

                    </h3>


                    <p>
                        Categoría: {producto.categoria}

                    </p>


                    <p>
                        Plataforma: {producto.plataforma || "No especificada"}

                    </p>


                    <p>
                        Stock disponible: {producto.stock}

                    </p>


                    <Link
                        href="/productos"
                        className="btn btn-primary mt-3"
                    >
                        Volver al catálogo

                    </Link>

                </div>

            </div>

        </main>

    );
}