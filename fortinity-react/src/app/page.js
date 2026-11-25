"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProductoCard from "../components/ProductoCard";


export default function Home() {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");


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

                    throw new Error("Error al cargar productos");

                }


                const datos = await respuesta.json();


                setProductos(
                    datos.filter((producto) => producto.destacado)
                );

            } catch (error) {

                console.error(error);

                setError("No se pudieron cargar los productos destacados.");

            } finally {

                setCargando(false);

            }

        }


        cargarProductos();

    }, []);


    return (

        <main className="container my-5">

            <section className="text-center mb-5">

                <h2>Bienvenidos a Fortinity</h2>

                <p>Encuentra tu cuenta ideal para tus videojuegos favoritos.</p>

                <p>Explora nuestro catálogo y encuentra la cuenta de tus sueños.</p>

                <Link href="/productos" className="btn btn-primary">
                    Ver Productos

                </Link>

            </section>


            <section className="mb-5">

                <h2>Categorías de Productos</h2>

                <ul>

                    <li>Juegos</li>

                    <li>Cuentas</li>

                    <li>Monedas virtuales</li>

                    <li>Gift Cards</li>

                    <li>Keys</li>

                </ul>

            </section>


            <section>

                <h2 className="text-center mb-4">
                    Productos Destacados

                </h2>


                {cargando && (

                    <p className="text-center">
                        Cargando productos destacados...

                    </p>

                )}


                {error && (

                    <p className="alert alert-danger">
                        {error}

                    </p>

                )}


                <div className="row g-4">

                    {productos.map((producto) => (

                        <ProductoCard
                            key={producto.id}
                            producto={producto}
                        />

                    ))}

                </div>

            </section>
            
        </main>
    );
}