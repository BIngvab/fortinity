import { productos } from "../../../data/productos";


export async function GET() {
    return Response.json(productos);

}