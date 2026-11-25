export async function GET() {

    try {

        const respuesta = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/productos`,
            {
                cache: "no-store"
            }
        );


        if (!respuesta.ok) {

            throw new Error("Error al consultar el backend");

        }


        const productos = await respuesta.json();


        return Response.json(productos);

    } catch (error) {

        console.error("Error de conexion:", error);


        return Response.json(
            {
                mensaje: "No se pudieron obtener los productos"
            },
            {
                status: 503
            }
        );
    }
}