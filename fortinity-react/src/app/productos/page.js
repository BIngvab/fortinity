"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ProductoCard from "../../components/ProductoCard";


export default function Productos() {

    const [productos, setProductos] = useState([]);

    useEffect(() => {

        async function cargarProductos() {

            try {

                const respuesta = await fetch("/api/productos");

                if (!respuesta.ok) {
                    throw new Error("Error al obtener los productos");
                }

                const datos = await respuesta.json();

                setProductos(datos);

            } catch (error) {

                console.error("Error al cargar productos:", error);

            }

        }

        cargarProductos();

    }, []);


    return (
        <main className="container my-5">

            <section className="text-center mb-5">
                <h1>Catálogo de productos</h1>

                <p>
                    Encuentra cuentas con contenido exclusivo para tus juegos favoritos.
                </p>

            </section>


            <section>
                <div className="row g-4">

                    {productos.map((producto) => (

                        <ProductoCard
                            key={producto.id}
                            producto={producto}

                        />

                    ))}

                </div>
            </section>


            <div className="text-center mt-5">

                <Link href="/" className="btn btn-primary">
                    Volver al inicio

                </Link>

            </div>

        </main>
    );

}