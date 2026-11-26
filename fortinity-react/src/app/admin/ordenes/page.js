"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { peticionApi } from "../../../lib/api";
import { formatearPrecio } from "../../../lib/precios";

export default function Ordenes() {
    const [usuario, setUsuario] = useState(null);
    const [ordenes, setOrdenes] = useState([]);
    const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
    const [detalles, setDetalles] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [cargandoDetalle, setCargandoDetalle] = useState(false);
    const [error, setError] = useState("");

    
    useEffect(() => {
        async function cargarOrdenes() {
            try {
                const sesion = await peticionApi("/auth/me");


                setUsuario(sesion);


                if (!["ADMIN", "VENDEDOR"].includes(sesion.rol)) {
                    return;
                }


                const datos = await peticionApi("/boletas");

                
                setOrdenes(datos);
            } catch (e) {
                setError(e.message);
            } finally {
                setCargando(false);
            }
        }

        cargarOrdenes();
    }, []);

    async function verDetalle(orden) {
        setError("");
        setDetalles([]);
        setOrdenSeleccionada(orden);
        setCargandoDetalle(true);


        try {
            const datos = await peticionApi(
                `/boletas/${orden.id}/detalles`
            );

            setDetalles(datos);
        } catch (e) {
            setError(e.message);
        } finally {
            setCargandoDetalle(false);
        }
    }


    if (cargando) {
        return (
            <main className="container py-5 text-center">
                <h2>Cargando ordenes...</h2>
            </main>
        );
    }

    if (!usuario) {
        return (
            <main className="container py-5 text-center">
                <h2>Inicia sesión</h2>

                <p>Debes iniciar sesión para consultar órdenes.</p>


                {error && (
                    <p className="text-danger">{error}</p>
                )}


                <Link href="/login" className="btn btn-primary">
                    Iniciar sesión
                </Link>
            </main>
        );
    }

    if (!["ADMIN", "VENDEDOR"].includes(usuario.rol)) {
        return (
            <main className="container py-5 text-center">
                <h2>Acceso denegado</h2>


                <p>No tienes permisos para acceder a esta sección.</p>


                <Link href="/" className="btn btn-primary">
                    Volver al inicio
                </Link>
            </main>
        );
    }

    return (
        <main className="container py-5">

            <h1 className="text-center mb-4">
                Consulta de órdenes
            </h1>


            <p className="text-center">
                Usuario: {usuario.nombre} | Rol: {usuario.rol}
            </p>


            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}


            <div className="alert alert-info">
                Consulta las compras realizadas por los clientes
                de Fortinity.
            </div>


            {ordenSeleccionada && (
                <div className="card p-4 mb-4">

                    <h2>
                        Detalle de boleta N° {ordenSeleccionada.id}
                    </h2>


                    <p>Cliente: {ordenSeleccionada.cliente}</p>

                    <p>Estado: {ordenSeleccionada.estado}</p>


                    <p>
                        Fecha:{" "}
                        {new Date(
                            ordenSeleccionada.fecha
                        ).toLocaleString("es-CL")}
                    </p>


                    {cargandoDetalle ? (
                        <p>Cargando detalles...</p>
                    ) : (
                        <div className="table-responsive">

                            <table className="table table-dark table-striped">

                                <thead>
                                    <tr>

                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio unitario</th>
                                        <th>Subtotal</th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {detalles.map((detalle) => (
                                        <tr key={detalle.id}>

                                            <td>{detalle.producto}</td>
                                            <td>{detalle.cantidad}</td>


                                            <td>
                                                ${formatearPrecio(
                                                    detalle.precioUnitario
                                                )}
                                            </td>


                                            <td>
                                                ${formatearPrecio(
                                                    detalle.subtotal
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                        </div>
                    )}

                    <h3 className="text-end mt-3">
                        Total: ${formatearPrecio(
                            ordenSeleccionada.total
                        )}
                    </h3>


                    <button
                        className="btn btn-secondary mt-3"
                        onClick={() => setOrdenSeleccionada(null)}
                        disabled={cargandoDetalle}
                    >
                        Cerrar detalle
                    </button>

                </div>
            )}


            <h2 className="mb-3">Lista de órdenes</h2>


            {ordenes.length === 0 ? (
                <p>No hay órdenes registradas.</p>
            ) : (
                <div className="table-responsive">

                    <table className="table table-dark table-striped align-middle">

                        <thead>
                            <tr>

                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Acciones</th>

                            </tr>
                        </thead>


                        <tbody>
                            {ordenes.map((orden) => (
                                <tr key={orden.id}>

                                    <td>{orden.id}</td>

                                    <td>{orden.cliente}</td>


                                    <td>
                                        {new Date(
                                            orden.fecha
                                        ).toLocaleString("es-CL")}
                                    </td>


                                    <td>
                                        ${formatearPrecio(orden.total)}
                                    </td>


                                    <td>
                                        <span className={
                                            orden.estado === "COMPLETADA"
                                                ? "badge bg-success"
                                                : "badge bg-secondary"
                                        }>
                                            {orden.estado}
                                        </span>
                                    </td>


                                    <td>
                                        <button
                                            className="btn btn-info btn-sm"
                                            onClick={() => verDetalle(orden)}
                                            disabled={cargandoDetalle}
                                        >
                                            Ver detalle
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>
            )}

            <Link href="/admin" className="btn btn-primary mt-3">
                Volver al panel de productos
            </Link>

        </main>
    );
}