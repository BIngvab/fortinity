const API_URL = process.env.NEXT_PUBLIC_API_URL;


let renovacionPendiente = null;


function obtenerExpiracion(token) {

    try {

        const contenido = token.split(".")[1];

        const base64 = contenido
            .replace(/-/g, "+")
            .replace(/_/g, "/");


        const datos = JSON.parse(atob(base64));


        return datos.exp * 1000;

    } catch {

        return 0;

    }
}


async function renovarToken(token) {

    if (renovacionPendiente?.token === token) {

        return renovacionPendiente.promesa;

    }


    const promesa = (async () => {

        const respuesta = await fetch(
            `${API_URL}/auth/refresh`,
            {

                method: "POST",

                headers: {

                    "Authorization": `Bearer ${token}`,

                    "Content-Type": "application/json"

                },

                cache: "no-store"

            }
        );


        if (!respuesta.ok) {

            if (respuesta.status === 401
                && sessionStorage.getItem("fortinity_token") === token) {

                cerrarSesion();

            }


            throw new Error("No se pudo renovar la sesión.");

        }


        const datos = await respuesta.json();


        if (sessionStorage.getItem("fortinity_token") !== token) {

            throw new Error("La sesión ha cambiado.");

        }


        guardarSesion(datos);


        return datos.token;

    })();


    renovacionPendiente = {

        token,

        promesa

    };


    try {

        return await promesa;

    } finally {

        if (renovacionPendiente?.promesa === promesa) {

            renovacionPendiente = null;

        }

    }

}


export async function peticionApi(ruta, opciones = {}) {

    const headers = {

        "Content-Type": "application/json",

        ...opciones.headers

    };


    let token = typeof window !== "undefined"

        ? sessionStorage.getItem("fortinity_token")

        : null;


    if (token && opciones.autenticado !== false) {

        const expiracion = obtenerExpiracion(token);

        const tiempoRestante = expiracion - Date.now();


        if (tiempoRestante <= 0) {

            cerrarSesion();


            throw new Error(
                "Tu sesión ha expirado. Inicia sesión nuevamente."
            );

        }


        if (tiempoRestante <= 5 * 60 * 1000
            && ruta !== "/auth/refresh") {

            token = await renovarToken(token);

        }


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

        if (respuesta.status === 401
            && opciones.autenticado !== false
            && token
            && typeof window !== "undefined"
            && sessionStorage.getItem("fortinity_token") === token) {

            cerrarSesion();

        }


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