"use client";

import Link from "next/link";
import { useCarrito } from "../../context/CarritoContext";


export default function Carrito() {
    const { carrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();
    const total = carrito.reduce((acumulador, producto) => {
        return acumulador + producto.precio;

    }, 0);

    function comprar() {
    alert("Compra realizada correctamente.");

    vaciarCarrito();

    }


    return (
        <main className="container my-5">
            <h2 className="text-center mb-4">
                Carrito de Compras

            </h2>


            {carrito.length === 0 ? (
                <div className="text-center">

                    <p>Tu carrito está vacío.</p>

                    <Link href="/productos" className="btn btn-primary">
                        Ver productos

                    </Link>
                </div>
            ) : (
                <section>
                    {carrito.map((producto, index) => (

                        <div className="card mb-3" key={index}>
                            <div className="card-body">

                                <h3 className="h5">
                                    {producto.nombre}

                                </h3>

                                <p>
                                    Precio: ${producto.precio.toLocaleString("es-CL")}

                                </p>

                                <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => eliminarDelCarrito(index)}
                                >
                                    Eliminar del carrito
                                </button>

                            </div>
                        </div>

                    ))}

                    <h3 className="text-end mt-4">
                        Total: ${total.toLocaleString("es-CL")}

                    </h3>

                    <div className="text-end mt-3">


                        <button
                            className="btn btn-danger"
                            type="button"
                            onClick={vaciarCarrito}
                        >
                            Vaciar carrito

                        </button>

                        <button
                            className="btn btn-success me-2"
                            type="button"
                            onClick={comprar}
                        >
                            Comprar

                        </button>

                    </div>

                </section>
            )}
        </main>
    );
}