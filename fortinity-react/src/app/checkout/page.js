"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCarrito } from "../../context/CarritoContext";
import { peticionApi, obtenerUsuario } from "../../lib/api";
import { calcularPrecioFinal, formatearPrecio } from "../../lib/precios";


export default function Checkout() {

    const { carrito, vaciarCarrito } = useCarrito();


    const [usuario, setUsuario] = useState(null);
    const [resumen, setResumen] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);
    const [listo, setListo] = useState(false);


    useEffect(() => {

        setUsuario(obtenerUsuario());
        setListo(true);

    }, []);


    const subtotal = carrito.reduce((acumulador, producto) => {

        return acumulador + Number(producto.precio);

    }, 0);


    const total = carrito.reduce((acumulador, producto) => {

        return acumulador + calcularPrecioFinal(producto);

    }, 0);


    const ahorro = subtotal - total;


    async function confirmarCompra(evento) {

        evento.preventDefault();

        if (cargando || carrito.length === 0) return;


        setMensaje("");
        setCargando(true);


        try {

            const productos = {};

            carrito.forEach((producto) => {

                if (productos[producto.id]) {

                    productos[producto.id].cantidad++;

                } else {

                    productos[producto.id] = {

                        productoId: Number(producto.id),
                        cantidad: 1

                    };

                }

            });


            const boleta = await peticionApi("/boletas/comprar", {

                method: "POST",

                body: JSON.stringify(Object.values(productos))

            });


            setResumen(boleta);

            vaciarCarrito();

        } catch (error) {

            setMensaje(error.message);

        } finally {

            setCargando(false);

        }

    }


    if (!listo) {

        return <main className="container my-5">Cargando...</main>;

    }


    if (resumen) {

        return (

            <main className="container my-5">

                <div className="card p-4">

                    <h1 className="text-success">

                        ¡Compra realizada correctamente!

                    </h1>


                    <p>Gracias por comprar en Fortinity.</p>

                    <hr />


                    <h3>Boleta N° {resumen.id}</h3>

                    <p>Cliente: {resumen.cliente || usuario?.nombre}</p>

                    <p>Estado: {resumen.estado}</p>


                    <p>

                        Fecha: {new Date(resumen.fecha).toLocaleString("es-CL")}

                    </p>


                    <p>Entrega: Digital</p>


                    <h3>

                        Total: ${formatearPrecio(resumen.total)}

                    </h3>


                    <Link href="/" className="btn btn-primary mt-3">

                        Volver al inicio

                    </Link>

                </div>

            </main>

        );

    }


    if (!usuario) {

        return (

            <main className="container my-5 text-center">

                <h1>Inicia sesión para comprar</h1>

                <p>Debes ingresar a tu cuenta de Fortinity.</p>


                <Link href="/login" className="btn btn-primary">

                    Iniciar sesión

                </Link>

            </main>

        );

    }


    if (usuario.rol !== "CLIENTE") {

        return (

            <main className="container my-5 text-center">

                <h1>Compra no disponible</h1>

                <p>Debes utilizar una cuenta de cliente para comprar.</p>


                <Link href="/" className="btn btn-primary">

                    Volver al inicio

                </Link>

            </main>

        );

    }


    if (carrito.length === 0) {

        return (

            <main className="container my-5 text-center">

                <h1>Checkout</h1>

                <p>No tienes productos para comprar.</p>


                <Link href="/productos" className="btn btn-primary">

                    Ver productos

                </Link>

            </main>

        );

    }


    return (

        <main className="container my-5">

            <h1 className="text-center mb-4">

                Finalizar compra

            </h1>


            <div className="row g-4">

                <div className="col-md-7">

                    <form onSubmit={confirmarCompra}>

                        <div className="mb-3">

                            <label className="form-label">

                                Nombre completo

                            </label>


                            <input
                                className="form-control"
                                value={usuario.nombre}
                                readOnly
                            />

                        </div>


                        <div className="mb-3">

                            <label className="form-label">

                                Correo electrónico

                            </label>


                            <input
                                className="form-control"
                                value={usuario.email}
                                readOnly
                            />

                        </div>


                        <div className="mb-3">

                            <label className="form-label">

                                Tipo de entrega

                            </label>


                            <input
                                className="form-control"
                                value="Entrega digital"
                                readOnly
                            />

                        </div>


                        <button
                            type="submit"
                            className="btn btn-success me-2"
                            disabled={cargando}
                        >

                            {cargando
                                ? "Procesando compra..."
                                : "Confirmar compra"}

                        </button>


                        <Link
                            href="/carrito"
                            className="btn btn-outline-light"
                        >

                            Volver al carrito

                        </Link>


                        {mensaje && (

                            <p className="text-danger mt-3">

                                {mensaje}

                            </p>

                        )}

                    </form>

                </div>


                <div className="col-md-5">

                    <div className="card p-3">

                        <h3>Resumen del pedido</h3>

                        <hr />


                        {carrito.map((producto, index) => (

                            <div key={index} className="mb-3">

                                <strong>{producto.nombre}</strong>


                                {Number(producto.descuento) > 0 ? (

                                    <div>

                                        <span className="text-decoration-line-through text-secondary me-2">

                                            ${formatearPrecio(producto.precio)}

                                        </span>


                                        <span className="badge bg-success">

                                            -{producto.descuento}%

                                        </span>


                                        <p className="text-success mt-2 mb-0">

                                            ${formatearPrecio(calcularPrecioFinal(producto))}

                                        </p>

                                    </div>

                                ) : (

                                    <p>

                                        ${formatearPrecio(calcularPrecioFinal(producto))}

                                    </p>

                                )}

                            </div>

                        ))}


                        <hr />


                        <p>

                            Subtotal: ${formatearPrecio(subtotal)}

                        </p>


                        {ahorro > 0 && (

                            <p className="text-success">

                                Descuentos: -${formatearPrecio(ahorro)}

                            </p>

                        )}


                        <hr />


                        <h4>

                            Total estimado: ${formatearPrecio(total)}

                        </h4>

                    </div>
                </div>
            </div>
        </main>
    );
}