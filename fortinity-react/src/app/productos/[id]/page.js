"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCarrito } from "../../../context/CarritoContext";
import { calcularPrecioFinal, formatearPrecio } from "../../../lib/precios";


export default function DetalleProducto() {

    const { id } = useParams();

    const { agregarAlCarrito } = useCarrito();


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


    const precioFinal = calcularPrecioFinal(producto);

    const tieneDescuento = Number(producto.descuento) > 0;


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


                    {tieneDescuento ? (

                        <div className="mb-3">

                            <span className="text-decoration-line-through text-secondary me-2">

                                ${formatearPrecio(producto.precio)}

                            </span>


                            <span className="badge bg-success">

                                -{producto.descuento}%

                            </span>


                            <h3 className="text-success mt-2">

                                ${formatearPrecio(precioFinal)}

                            </h3>

                        </div>

                    ) : (

                        <h3>

                            ${formatearPrecio(precioFinal)}

                        </h3>

                    )}


                    <p>

                        Categoría: {producto.categoria}

                    </p>


                    <p>

                        Plataforma: {producto.plataforma || "No especificada"}

                    </p>


                    <p>

                        Desarrollador: {producto.desarrollador || "No especificado"}

                    </p>


                    <p>

                        Stock disponible: {producto.stock}

                    </p>


                    <button
                        type="button"
                        className="btn btn-primary mt-3 me-2"
                        disabled={producto.stock <= 0}
                        onClick={() => agregarAlCarrito(producto)}
                    >

                        {producto.stock <= 0
                            ? "Sin stock"
                            : "Agregar al carrito"}

                    </button>


                    <Link
                        href="/productos"
                        className="btn btn-outline-light mt-3"
                    >

                        Volver al catálogo

                    </Link>

                </div>

            </div>

        </main>

    );
}