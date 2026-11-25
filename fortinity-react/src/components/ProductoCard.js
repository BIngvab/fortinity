"use client";

import Link from "next/link";
import { useCarrito } from "../context/CarritoContext";
import { calcularPrecioFinal, formatearPrecio } from "../lib/precios";


export default function ProductoCard({ producto }) {

    const { agregarAlCarrito } = useCarrito();

    const precioFinal = calcularPrecioFinal(producto);

    const tieneDescuento = Number(producto.descuento) > 0;


    return (

        <div className="col-12 col-md-6 col-lg-4">

            <article className="card h-100">

                <img
                    src={producto.imagen}
                    className="card-img-top"
                    alt={producto.nombre}
                />


                <div className="card-body d-flex flex-column">

                    <h3 className="card-title h5">

                        {producto.nombre}

                    </h3>


                    <p className="card-text">

                        {producto.descripcion}

                    </p>


                    {tieneDescuento ? (

                        <div className="mb-3">

                            <span className="text-decoration-line-through text-secondary me-2">

                                ${formatearPrecio(producto.precio)}

                            </span>


                            <span className="badge bg-success">

                                -{producto.descuento}%

                            </span>


                            <p className="text-success fw-bold mt-2 mb-0">

                                Oferta: ${formatearPrecio(precioFinal)}

                            </p>

                        </div>

                    ) : (

                        <p>

                            <strong>

                                Valor: ${formatearPrecio(precioFinal)}

                            </strong>

                        </p>

                    )}


                    <button
                        className="btn btn-primary mt-auto"
                        type="button"
                        disabled={producto.stock <= 0}
                        onClick={() => agregarAlCarrito(producto)}
                    >

                        {producto.stock <= 0
                            ? "Sin stock"
                            : "Agregar al carrito"}

                    </button>


                    <Link
                        href={`/productos/${producto.id}`}
                        className="btn btn-outline-light mt-2"
                    >

                        Ver detalles

                    </Link>

                </div>
            </article>
        </div>
    );
}