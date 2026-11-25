"use client";

import Link from "next/link";
import { useCarrito } from "../../context/CarritoContext";
import { calcularPrecioFinal, formatearPrecio } from "../../lib/precios";


export default function Carrito() {

    const { carrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();


    const subtotal = carrito.reduce((acumulador, producto) => {

        return acumulador + Number(producto.precio);

    }, 0);


    const total = carrito.reduce((acumulador, producto) => {

        return acumulador + calcularPrecioFinal(producto);

    }, 0);


    const ahorro = subtotal - total;


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


                                {Number(producto.descuento) > 0 ? (

                                    <div className="mb-3">

                                        <span className="text-decoration-line-through text-secondary me-2">

                                            ${formatearPrecio(producto.precio)}

                                        </span>


                                        <span className="badge bg-success">

                                            -{producto.descuento}%

                                        </span>


                                        <p className="text-success fw-bold mt-2">

                                            Precio: ${formatearPrecio(calcularPrecioFinal(producto))}

                                        </p>

                                    </div>

                                ) : (

                                    <p>

                                        Precio: ${formatearPrecio(calcularPrecioFinal(producto))}

                                    </p>

                                )}


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


                    <div className="card p-4 mt-4 text-end">

                        <h4>

                            Subtotal: ${formatearPrecio(subtotal)}

                        </h4>


                        {ahorro > 0 && (

                            <p className="text-success">

                                Descuentos: -${formatearPrecio(ahorro)}

                            </p>

                        )}


                        <hr />


                        <h3>

                            Total: ${formatearPrecio(total)}

                        </h3>


                        <div className="mt-3">

                            <button
                                className="btn btn-danger me-2"
                                type="button"
                                onClick={vaciarCarrito}
                            >

                                Vaciar carrito

                            </button>


                            <Link
                                href="/checkout"
                                className="btn btn-success"
                            >

                                Comprar

                            </Link>

                        </div>
                        
                    </div>

                </section>
            )}
        </main>
    );
}