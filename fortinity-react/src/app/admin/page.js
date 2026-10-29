"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { productos as productosOriginales } from "../../data/productos";

const CLAVE = "fortinityProductos";

export default function Admin() {

    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState("");
    const [editando, setEditando] = useState(null);

    useEffect(() => {

        const guardados = localStorage.getItem(CLAVE);

        try {
            setProductos(guardados !== null
                ? JSON.parse(guardados)
                : productosOriginales
            );

        } catch {
            setProductos(productosOriginales);
            
        }

    }, []);


    function actualizarProductos(nuevos) {

        setProductos(nuevos);
        localStorage.setItem(CLAVE, JSON.stringify(nuevos));

    }


    function limpiarFormulario() {

        setNombre("");
        setDescripcion("");
        setPrecio("");
        setImagen("");
        setEditando(null);

    }


    function guardarProducto(evento) {

        evento.preventDefault();

        const valor = Number(precio);

        if (!nombre.trim() || !Number.isFinite(valor) || valor <= 0) {
            alert("Ingresa un nombre y precio válidos.");

            return;
        }

        const datos = {
            nombre: nombre.trim(),
            descripcion,
            precio: valor,
            imagen: imagen || "/img/fortnite.jpg"

        };

        if (editando !== null) {

            const actualizados = productos.map((producto) =>
                producto.id === editando
                    ? { ...producto, ...datos }
                    : producto
            );

            actualizarProductos(actualizados);

        } else {

            const nuevoId = Math.max(
                0,
                ...productos.map((producto) => producto.id)
            ) + 1;

            actualizarProductos([
                ...productos,
                { id: nuevoId, ...datos }
            ]);

        }

        limpiarFormulario();

    }


    function editarProducto(producto) {

        setEditando(producto.id);
        setNombre(producto.nombre);
        setDescripcion(producto.descripcion);
        setPrecio(String(producto.precio));
        setImagen(producto.imagen);

        window.scrollTo({ top: 0, behavior: "smooth" });

    }


    function eliminarProducto(id) {

        if (!confirm("¿Seguro que deseas eliminar este producto?")) {
            return;
        }

        actualizarProductos(
            productos.filter((producto) => producto.id !== id)
        );

        if (editando === id) {
            limpiarFormulario();
        }

    }


    function restaurarProductos() {

        if (!confirm("¿Restaurar los productos originales?")) {
            return;
        }

        actualizarProductos(productosOriginales);
        limpiarFormulario();

    }


    return (
        <main className="container my-5">

            <h1 className="text-center mb-4">
                Administración de productos

            </h1>

            <p className="text-center">
                Crear, consultar, actualizar y eliminar productos.

            </p>

            <div className="card p-4 mb-4">

                <h2 className="h4">
                    {editando !== null
                        ? "Editar producto"
                        : "Agregar producto"}
                </h2>

                <form onSubmit={guardarProducto}>

                    <div className="mb-3">

                        <label className="form-label">
                            Nombre del producto

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
                            Descripción

                        </label>

                        <textarea
                            className="form-control"
                            value={descripcion}
                            onChange={(evento) => setDescripcion(evento.target.value)}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Precio

                        </label>

                        <input
                            type="number"
                            min="1"
                            className="form-control"
                            value={precio}
                            onChange={(evento) => setPrecio(evento.target.value)}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Imagen

                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="/img/fortnite.jpg"
                            value={imagen}
                            onChange={(evento) => setImagen(evento.target.value)}
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-success me-2"
                    >
                        {editando !== null
                            ? "Guardar cambios"
                            : "Agregar producto"}
                    </button>

                    {editando !== null && (

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={limpiarFormulario}
                        >
                            Cancelar
                        </button>

                    )}

                </form>

            </div>


            <h2>Lista de productos</h2>

            <div className="table-responsive">

                <table className="table table-dark table-striped">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                            
                        </tr>
                    </thead>

                    <tbody>

                        {productos.map((producto) => (

                            <tr key={producto.id}>

                                <td>{producto.id}</td>

                                <td>{producto.nombre}</td>

                                <td>
                                    ${producto.precio.toLocaleString("es-CL")}
                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editarProducto(producto)}
                                    >
                                        Editar

                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => eliminarProducto(producto.id)}
                                    >
                                        Eliminar

                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            <button
                className="btn btn-outline-warning me-2"
                onClick={restaurarProductos}
            >
                Restaurar productos
            </button>

            <Link href="/productos" className="btn btn-primary">
                Ver catálogo

            </Link>

        </main>
    );

}