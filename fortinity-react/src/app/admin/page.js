"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { peticionApi } from "../../lib/api";
import { formatearPrecio } from "../../lib/precios";


const formularioInicial = {

    nombre: "",
    descripcion: "",
    precio: "",
    descuento: 0,
    stock: 0,
    imagen: "",
    plataforma: "",
    desarrollador: "",
    categoriaId: "",
    destacado: false

};


export default function Admin() {

    const [usuario, setUsuario] = useState(null);
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [formulario, setFormulario] = useState(formularioInicial);

    const [editando, setEditando] = useState(null);
    const [detalle, setDetalle] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);


    const esAdmin = usuario?.rol === "ADMIN";


    useEffect(() => {

        async function iniciarPanel() {

            try {

                const perfil = await peticionApi("/auth/me");

                setUsuario(perfil);


                if (!["ADMIN", "VENDEDOR"].includes(perfil.rol)) {

                    return;

                }


                const listaProductos = await peticionApi("/productos/todos");

                setProductos(listaProductos);


                if (perfil.rol === "ADMIN") {

                    const listaCategorias = await peticionApi("/categorias");

                    setCategorias(listaCategorias);

                }

            } catch (error) {

                setError(error.message);

            } finally {

                setCargando(false);

            }

        }


        iniciarPanel();

    }, []);


    async function cargarProductos() {

        const datos = await peticionApi("/productos/todos");

        setProductos(datos);

    }


    function cambiarCampo(evento) {

        const { name, value, checked, type } = evento.target;

        setFormulario((actual) => ({

            ...actual,
            [name]: type === "checkbox" ? checked : value

        }));

    }


    function limpiarFormulario() {

        setFormulario({ ...formularioInicial });
        setEditando(null);

    }


    async function guardarProducto(evento) {

        evento.preventDefault();

        if (!esAdmin || guardando) return;


        setMensaje("");
        setError("");


        const datos = {

            nombre: formulario.nombre.trim(),
            descripcion: formulario.descripcion,
            precio: Number(formulario.precio),
            descuento: Number(formulario.descuento),
            stock: Number(formulario.stock),
            imagen: formulario.imagen,
            plataforma: formulario.plataforma,
            desarrollador: formulario.desarrollador,
            destacado: formulario.destacado

        };


        if (!datos.nombre || datos.precio <= 0) {

            setError("Ingresa un nombre y precio válidos.");

            return;

        }


        setGuardando(true);


        try {

            if (editando !== null) {

                await peticionApi(

                    `/productos/${editando}?categoriaId=${formulario.categoriaId}`,

                    {
                        method: "PUT",
                        body: JSON.stringify(datos)
                    }

                );


                setMensaje("Producto actualizado correctamente.");

            } else {

                await peticionApi(

                    `/productos?categoriaId=${formulario.categoriaId}`,

                    {
                        method: "POST",
                        body: JSON.stringify(datos)
                    }

                );


                setMensaje("Producto agregado correctamente.");

            }


            limpiarFormulario();

            await cargarProductos();

        } catch (error) {

            setError(error.message);

        } finally {

            setGuardando(false);

        }

    }


    function editarProducto(producto) {

        if (!esAdmin) return;


        setEditando(producto.id);
        setDetalle(null);


        setFormulario({

            nombre: producto.nombre,
            descripcion: producto.descripcion || "",
            precio: producto.precio,
            descuento: producto.descuento,
            stock: producto.stock,
            imagen: producto.imagen || "",
            plataforma: producto.plataforma || "",
            desarrollador: producto.desarrollador || "",
            categoriaId: producto.categoriaId,
            destacado: producto.destacado

        });


        setMensaje("");
        setError("");


        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    }


    function verDetalle(producto) {

        setDetalle(producto);

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    }


    async function cambiarEstado(producto) {

        if (guardando || !esAdmin) return;


        const accion = producto.activo
            ? "eliminar"
            : "restaurar";


        if (!confirm(`¿Deseas ${accion} este producto?`)) {

            return;

        }


        setMensaje("");
        setError("");
        setGuardando(true);


        try {

            if (producto.activo) {

                await peticionApi(`/productos/${producto.id}`, {

                    method: "DELETE"

                });


                setMensaje("Producto desactivado correctamente.");

            } else {

                await peticionApi(

                    `/productos/${producto.id}/restaurar`,

                    {
                        method: "PATCH"
                    }

                );


                setMensaje("Producto restaurado correctamente.");

            }


            if (editando === producto.id) {

                limpiarFormulario();

            }


            setDetalle(null);

            await cargarProductos();

        } catch (error) {

            setError(error.message);

        } finally {

            setGuardando(false);

        }

    }


    if (cargando) {

        return (

            <main className="container my-5 text-center">

                <h2>Cargando administración...</h2>

            </main>

        );

    }


    if (!usuario) {

        return (

            <main className="container my-5 text-center">

                <h1>Inicia sesión</h1>

                <p>
                    Debes iniciar sesión para acceder a la administración.
                </p>


                {error && <p className="text-danger">{error}</p>}


                <Link href="/login" className="btn btn-primary">

                    Iniciar sesión

                </Link>

            </main>

        );

    }


    if (!["ADMIN", "VENDEDOR"].includes(usuario.rol)) {

        return (

            <main className="container my-5 text-center">

                <h1>Acceso denegado</h1>

                <p>No tienes permisos para acceder a esta sección.</p>


                <Link href="/" className="btn btn-primary">

                    Volver al inicio

                </Link>

            </main>

        );

    }


    return (

        <main className="container my-5">

            <h1 className="text-center mb-4">

                {esAdmin
                    ? "Administración de productos"
                    : "Consulta de productos"}

            </h1>


            <p className="text-center">

                Usuario: {usuario.nombre} | Rol: {usuario.rol}

            </p>


            {!esAdmin && (

                <div className="alert alert-info">

                    Puedes consultar los productos y sus detalles.

                </div>

            )}


            {mensaje && (

                <div className="alert alert-success">

                    {mensaje}

                </div>

            )}


            {error && (

                <div className="alert alert-danger">

                    {error}

                </div>

            )}


            {detalle && (

                <div className="card p-4 mb-4">

                    <h2 className="mb-4">Detalle del producto</h2>


                    <div className="row align-items-center">

                        <div className="col-md-4">

                            {detalle.imagen && (

                                <img
                                    src={detalle.imagen}
                                    alt={detalle.nombre}
                                    className="img-fluid rounded mb-3"
                                />

                            )}

                        </div>


                        <div className="col-md-8">

                            <h3>{detalle.nombre}</h3>

                            <p>{detalle.descripcion}</p>

                            <p>ID: {detalle.id}</p>

                            <p>Precio: ${formatearPrecio(detalle.precio)}</p>

                            <p>Descuento: {detalle.descuento}%</p>

                            <p>Stock: {detalle.stock}</p>

                            <p>Categoría: {detalle.categoria}</p>

                            <p>Plataforma: {detalle.plataforma || "No especificada"}</p>

                            <p>Desarrollador: {detalle.desarrollador || "No especificado"}</p>

                            <p>Estado: {detalle.activo ? "Activo" : "Inactivo"}</p>

                            <p>Destacado: {detalle.destacado ? "Sí" : "No"}</p>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="btn btn-secondary mt-3"
                        onClick={() => setDetalle(null)}
                    >

                        Cerrar detalle

                    </button>

                </div>

            )}


            {esAdmin && (

                <div className="card p-4 mb-4">

                    <h2 className="h4 mb-3">

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
                                className="form-control"
                                name="nombre"
                                value={formulario.nombre}
                                onChange={cambiarCampo}
                                maxLength={150}
                                required
                            />

                        </div>


                        <div className="mb-3">

                            <label className="form-label">

                                Descripción

                            </label>


                            <textarea
                                className="form-control"
                                name="descripcion"
                                value={formulario.descripcion}
                                onChange={cambiarCampo}
                            />

                        </div>


                        <div className="row">

                            <div className="col-md-4 mb-3">

                                <label className="form-label">Precio</label>


                                <input
                                    type="number"
                                    className="form-control"
                                    name="precio"
                                    min="1"
                                    step="1"
                                    value={formulario.precio}
                                    onChange={cambiarCampo}
                                    required
                                />

                            </div>


                            <div className="col-md-4 mb-3">

                                <label className="form-label">Descuento (%)</label>


                                <input
                                    type="number"
                                    className="form-control"
                                    name="descuento"
                                    min="0"
                                    max="100"
                                    value={formulario.descuento}
                                    onChange={cambiarCampo}
                                    required
                                />

                            </div>


                            <div className="col-md-4 mb-3">

                                <label className="form-label">Stock</label>


                                <input
                                    type="number"
                                    className="form-control"
                                    name="stock"
                                    min="0"
                                    value={formulario.stock}
                                    onChange={cambiarCampo}
                                    required
                                />

                            </div>

                        </div>


                        <div className="mb-3">

                            <label className="form-label">Categoría</label>


                            <select
                                className="form-select"
                                name="categoriaId"
                                value={formulario.categoriaId}
                                onChange={cambiarCampo}
                                required
                            >

                                <option value="">

                                    Selecciona una categoría

                                </option>


                                {categorias.map((categoria) => (

                                    <option
                                        key={categoria.id}
                                        value={categoria.id}
                                    >

                                        {categoria.nombre}

                                    </option>

                                ))}

                            </select>

                        </div>


                        <div className="mb-3">

                            <label className="form-label">Imagen</label>


                            <input
                                className="form-control"
                                name="imagen"
                                placeholder="/img/fortnite.jpg"
                                value={formulario.imagen}
                                onChange={cambiarCampo}
                                maxLength={1000}
                            />

                        </div>


                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">Plataforma</label>


                                <input
                                    className="form-control"
                                    name="plataforma"
                                    value={formulario.plataforma}
                                    onChange={cambiarCampo}
                                    maxLength={100}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">Desarrollador</label>


                                <input
                                    className="form-control"
                                    name="desarrollador"
                                    value={formulario.desarrollador}
                                    onChange={cambiarCampo}
                                    maxLength={150}
                                />

                            </div>

                        </div>


                        <div className="form-check mb-3">

                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="destacado"
                                name="destacado"
                                checked={formulario.destacado}
                                onChange={cambiarCampo}
                            />


                            <label
                                className="form-check-label"
                                htmlFor="destacado"
                            >

                                Producto destacado

                            </label>

                        </div>


                        <button
                            type="submit"
                            className="btn btn-success me-2"
                            disabled={guardando}
                        >

                            {guardando
                                ? "Procesando..."
                                : editando !== null
                                    ? "Guardar cambios"
                                    : "Agregar producto"}

                        </button>


                        {editando !== null && (

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={limpiarFormulario}
                                disabled={guardando}
                            >

                                Cancelar

                            </button>

                        )}

                    </form>

                </div>

            )}


            <h2 className="mb-3">Lista de productos</h2>


            <div className="table-responsive">

                <table className="table table-dark table-striped align-middle">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Estado</th>
                            <th>Acciones</th>

                        </tr>

                    </thead>


                    <tbody>

                        {productos.map((producto) => (

                            <tr key={producto.id}>

                                <td>{producto.id}</td>

                                <td>{producto.nombre}</td>

                                <td>{producto.categoria}</td>

                                <td>${formatearPrecio(producto.precio)}</td>

                                <td>{producto.stock}</td>


                                <td>

                                    <span className={producto.activo
                                        ? "badge bg-success"
                                        : "badge bg-danger"}>

                                        {producto.activo
                                            ? "Activo"
                                            : "Inactivo"}

                                    </span>

                                </td>


                                <td>

                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() => verDetalle(producto)}
                                    >

                                        Ver detalle

                                    </button>


                                    {esAdmin && (

                                        <>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => editarProducto(producto)}
                                                disabled={guardando}
                                            >

                                                Editar

                                            </button>


                                            <button
                                                className={producto.activo
                                                    ? "btn btn-danger btn-sm"
                                                    : "btn btn-success btn-sm"}
                                                onClick={() => cambiarEstado(producto)}
                                                disabled={guardando}
                                            >

                                                {producto.activo
                                                    ? "Eliminar"
                                                    : "Restaurar"}

                                            </button>

                                        </>

                                    )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>


            <Link href="/productos" className="btn btn-primary">

                Ver catálogo

            </Link>

        </main>
    );
}