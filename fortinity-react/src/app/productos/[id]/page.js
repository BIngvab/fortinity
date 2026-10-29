"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { productos as productosOriginales } from "../../../data/productos";


export default function DetalleProducto() {

    const { id } = useParams();

    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);


    useEffect(() => {

        const guardados = localStorage.getItem("fortinityProductos");

        let listaProductos = productosOriginales;

        if (guardados !== null) {

            try {

                const datos = JSON.parse(guardados);

                if (Array.isArray(datos)) {
                    listaProductos = datos;
                }

            } catch (error) {

                console.error("Error al cargar productos:", error);

            }

        }

        const encontrado = listaProductos.find(
            (producto) => producto.id === Number(id)
        );

        setProducto(encontrado || null);
        setCargando(false);

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

                <h1>Producto no encontrado</h1>

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