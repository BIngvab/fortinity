"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { peticionApi } from "../../../lib/api";

export default function Usuarios() {

    const [usuario, setUsuario] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");


    useEffect(() => {

        async function iniciarPanel() {

            try {

                const sesion = await peticionApi("/auth/me");

                setUsuario(sesion);


                if (sesion.rol !== "ADMIN") {
                    return;
                }


                const datos = await peticionApi("/usuarios");

                setUsuarios(datos);

            } catch (e) {

                setError(e.message);

            } finally {

                setCargando(false);

            }
        }

        iniciarPanel();

    }, []);


    async function actualizarUsuario(ruta) {

        setGuardando(true);
        setMensaje("");
        setError("");


        try {

            const actualizado = await peticionApi(ruta, {
                method: "PATCH"
            });


            setUsuarios(anterior =>
                anterior.map(u =>
                    u.id === actualizado.id ? actualizado : u
                )
            );


            setMensaje("Usuario actualizado correctamente.");

        } catch (e) {

            setError(e.message);

        } finally {

            setGuardando(false);

        }
    }

    async function cambiarRol(id, rol) {

        if (id === usuario.id) {
            return;

        }


        if (!window.confirm(`¿Deseas cambiar el rol a ${rol}?`)) {
            return;

        }


        await actualizarUsuario(
            `/usuarios/${id}/rol?rol=${rol}`
        );

    }

    async function cambiarEstado(id, activo) {

        if (id === usuario.id) {
            return;

        }


        const accion = activo ? "activar" : "desactivar";


        if (!window.confirm(`¿Deseas ${accion} este usuario?`)) {
            return;

        }


        await actualizarUsuario(
            `/usuarios/${id}/estado?activo=${activo}`
        );

    }


    if (cargando) {

        return (
            <main className="container py-5 text-center">
                <h2>Cargando usuarios...</h2>
            </main>
        );

    }


    if (!usuario) {

        return (
            <main className="container py-5 text-center">

                <h2>Inicia sesión</h2>

                <p>Debes iniciar sesión para acceder.</p>


                {error && (
                    <p className="text-danger">{error}</p>

                )}


                <Link href="/login" className="btn btn-primary">

                    Iniciar sesión

                </Link>

            </main>
        );
    }


    if (usuario.rol !== "ADMIN") {

        return (
            <main className="container py-5 text-center">

                <h2>Acceso denegado</h2>


                <p>

                    No tienes permisos para administrar usuarios.

                </p>


                <Link href="/" className="btn btn-primary">
                    Volver al inicio

                </Link>

            </main>
        );
    }

    return (

        <main className="container py-5">


            <h1 className="text-center mb-4">

                Administración de usuarios

            </h1>


            <p className="text-center">

                Usuario: {usuario.nombre} | Rol: {usuario.rol}

            </p>


            <div className="alert alert-info">

                Administra los roles y estados de los usuarios
                registrados en Fortinity.

            </div>


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


            <h2 className="mb-3">

                Lista de usuarios

            </h2>


            <div className="table-responsive">

                <table className="table table-dark table-striped align-middle">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo electrónico</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Fecha de registro</th>
                            <th>Acciones</th>

                        </tr>

                    </thead>


                    <tbody>

                        {usuarios.map(u => (

                            <tr key={u.id}>

                                <td>{u.id}</td>

                                <td>{u.nombre}</td>

                                <td>{u.email}</td>

                                <td>


                                    <select
                                        className="form-select form-select-sm"
                                        value={u.rol}
                                        disabled={
                                            guardando ||
                                            u.id === usuario.id
                                        }
                                        onChange={e =>
                                            cambiarRol(
                                                u.id,
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="CLIENTE">
                                            CLIENTE

                                        </option>


                                        <option value="VENDEDOR">
                                            VENDEDOR

                                        </option>


                                        <option value="ADMIN">
                                            ADMIN

                                        </option>


                                    </select>

                                </td>


                                <td>

                                    <span className={
                                        u.activo
                                            ? "badge bg-success"
                                            : "badge bg-danger"
                                    }>

                                        {u.activo ? "Activo" : "Inactivo"}

                                    </span>

                                </td>


                                <td>

                                    {new Date(
                                        u.fechaRegistro
                                    ).toLocaleDateString("es-CL")}

                                </td>


                                <td>

                                    {u.id === usuario.id ? (

                                        <span>Tu cuenta</span>

                                    ) : (

                                        <button
                                            className={
                                                u.activo
                                                    ? "btn btn-danger btn-sm"
                                                    : "btn btn-success btn-sm"
                                            }
                                            disabled={guardando}
                                            onClick={() =>
                                                cambiarEstado(
                                                    u.id,
                                                    !u.activo
                                                )
                                            }
                                        >

                                            {u.activo
                                                ? "Desactivar"
                                                : "Activar"}

                                        </button>

                                    )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            <Link href="/admin" className="btn btn-primary">
            
                Volver al panel de productos

            </Link>

        </main>
    );
}