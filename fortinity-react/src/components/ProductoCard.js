"use client";
import Link from "next/link";

import { useCarrito } from "../context/CarritoContext";


export default function ProductoCard({ producto }) {
    const { agregarAlCarrito } = useCarrito();
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


                    <p>
                        <strong>
                            Valor: ${producto.precio.toLocaleString("es-CL")}
                        </strong>

                    </p>

                    <button
                        className="btn btn-primary mt-auto"
                        type="button"
                        onClick={() => agregarAlCarrito(producto)}
                        
                    >
                        Agregar al carrito
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