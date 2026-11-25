"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ProductoCard from "../../components/ProductoCard";


export default function Productos() {

    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);


    useEffect(() => {

        async function cargarProductos() {

            try {

                const respuesta = await fetch(
                    "/api/productos",
                    {
                        cache: "no-store"
                    }
                );


                if (!respuesta.ok) {

                    throw new Error("Error al obtener los productos");

                }


                const datos = await respuesta.json();

                setProductos(datos);

            } catch (error) {

                console.error("Error al cargar productos:", error);

                setError("No se pudieron cargar los productos.");

            } finally {

                setCargando(false);

            }

        }


        cargarProductos();

    }, []);


    const productosFiltrados = productos.filter((producto) =>

        producto.nombre.toLowerCase().includes(
            busqueda.toLowerCase()
        )

    );


    return (

        <main className="container my-5">

            <section className="text-center mb-5">

                <h1>Catálogo de productos</h1>

                <p>
                    Encuentra cuentas con contenido exclusivo para tus juegos favoritos.

                </p>

                <input
                    type="text"
                    className="form-control mx-auto"
                    style={{ maxWidth: "400px" }}
                    placeholder="Buscar productos..."
                    value={busqueda}
                    onChange={(evento) => setBusqueda(evento.target.value)}
                />

            </section>


            {cargando && (

                <p className="text-center">
                    Cargando productos...

                </p>

            )}


            {error && (

                <p className="alert alert-danger">
                    {error}

                </p>

            )}


            <section>

                <div className="row g-4">

                    {productosFiltrados.map((producto) => (

                        <ProductoCard
                            key={producto.id}
                            producto={producto}
                        />

                    ))}

                </div>


                {productosFiltrados.length === 0 && !error && !cargando && (

                    <p className="text-center mt-4">
                        No se encontraron productos.

                    </p>

                )}

            </section>


            <div className="text-center mt-5">

                <Link href="/" className="btn btn-primary">
                    Volver al inicio

                </Link>

            </div>

        </main>

    );
}