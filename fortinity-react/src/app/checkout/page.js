"use client";

import Link from "next/link";
import { useState } from "react";
import { useCarrito } from "../../context/CarritoContext";


export default function Checkout() {

    const { carrito, vaciarCarrito } = useCarrito();
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [direccion, setDireccion] = useState("");
    const [entrega, setEntrega] = useState("digital");
    const [compraRealizada, setCompraRealizada] = useState(false);
    const [resumen, setResumen] = useState(null);

    const total = carrito.reduce((acumulador, producto) => {
        return acumulador + producto.precio;

    }, 0);


    function confirmarCompra(evento) {

        evento.preventDefault();

        if (carrito.length === 0) {
            return;

        }

        setResumen({
            nombre,
            correo,
            direccion,
            entrega,
            productos: [...carrito],
            total

        });

        vaciarCarrito();
        setCompraRealizada(true);

    }


    if (compraRealizada && resumen) {

        return (
            <main className="container my-5">

                <div className="card p-4">

                    <h1 className="text-success">
                        ¡Compra realizada correctamente!

                    </h1>

                    <p>
                        Gracias por comprar en Fortinity.

                    </p>

                    <h3>Resumen de compra</h3>

                    <p>Cliente: {resumen.nombre}</p>
                    <p>Correo: {resumen.correo}</p>

                    <p>
                        Entrega: {resumen.entrega === "digital"
                            ? "Entrega digital"
                            : "Entrega a domicilio"}

                    </p>

                    {resumen.entrega === "domicilio" && (
                        <p>Dirección: {resumen.direccion}</p>

                    )}

                    {resumen.productos.map((producto, index) => (

                        <p key={index}>
                            {producto.nombre} -
                            ${producto.precio.toLocaleString("es-CL")}

                        </p>

                    ))}

                    <h3>
                        Total: ${resumen.total.toLocaleString("es-CL")}

                    </h3>

                    <Link href="/" className="btn btn-primary mt-3">
                        Volver al inicio

                    </Link>
                </div>
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
                                type="text"
                                className="form-control"
                                value={nombre}
                                onChange={(evento) => setNombre(evento.target.value)}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Correo electrónico
                                
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                value={correo}
                                onChange={(evento) => setCorreo(evento.target.value)}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Tipo de entrega

                            </label>

                            <select
                                className="form-select"
                                value={entrega}
                                onChange={(evento) => setEntrega(evento.target.value)}
                            >
                                <option value="digital">
                                    Entrega digital

                                </option>

                                <option value="domicilio">
                                    Entrega a domicilio

                                </option>

                            </select>

                        </div>

                        {entrega === "domicilio" && (

                            <div className="mb-3">

                                <label className="form-label">
                                    Dirección de entrega

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={direccion}
                                    onChange={(evento) => setDireccion(evento.target.value)}
                                    required
                                />

                            </div>

                        )}

                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            Confirmar compra

                        </button>

                    </form>

                </div>


                <div className="col-md-5">

                    <div className="card p-3">

                        <h3>Resumen del pedido</h3>

                        {carrito.map((producto, index) => (

                            <p key={index}>
                                {producto.nombre} -
                                ${producto.precio.toLocaleString("es-CL")}

                            </p>

                        ))}

                        <hr />

                        <h4>
                            Total: ${total.toLocaleString("es-CL")}
                            
                        </h4>

                    </div>

                </div>

            </div>

        </main>
    );

}