const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function peticionApi(ruta, opciones = {}) {

    const headers = {

        "Content-Type": "application/json",

        ...opciones.headers

    };


    const token = typeof window !== "undefined"

        ? sessionStorage.getItem("fortinity_token")

        : null;


    if (token && opciones.autenticado !== false) {

        headers.Authorization = `Bearer ${token}`;

    }


    const respuesta = await fetch(`${API_URL}${ruta}`, {

        ...opciones,

        headers,

        cache: "no-store"

    });


    if (respuesta.status === 204) {

        return null;

    }


    const datos = await respuesta.json().catch(() => null);


    if (!respuesta.ok) {

        const mensajes = {

            400: "Los datos ingresados no son válidos.",

            401: "Credenciales incorrectas o sesión expirada.",

            403: "No tienes permisos para realizar esta operación.",

            404: "El recurso solicitado no existe.",

            409: "Existe un conflicto con los datos ingresados."

        };


        throw new Error(

            datos?.message ||

            datos?.mensaje ||

            mensajes[respuesta.status] ||

            "Error de conexión con el servidor."

        );

    }


    return datos;

}


export function guardarSesion(datos) {

    sessionStorage.setItem("fortinity_token", datos.token);

    sessionStorage.setItem(

        "fortinity_usuario",

        JSON.stringify(datos.usuario)

    );


    window.dispatchEvent(new Event("sesion-actualizada"));

}


export function obtenerUsuario() {

    if (typeof window === "undefined") {

        return null;

    }


    try {

        return JSON.parse(

            sessionStorage.getItem("fortinity_usuario")

        );

    } catch {

        return null;

    }

}


export function cerrarSesion() {

    sessionStorage.removeItem("fortinity_token");

    sessionStorage.removeItem("fortinity_usuario");


    window.dispatchEvent(new Event("sesion-actualizada"));

}