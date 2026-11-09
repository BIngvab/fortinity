import { z } from "zod";


export const registroSchema = z.object({
    nombre: z.string()
        .trim()
        .min(2, "El nombre debe tener al menos 2 caracteres."),

    correo: z.email("Debes ingresar un correo válido."),

    password: z.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres.")
        .regex(/[a-zA-Z]/, "Debe contener al menos una letra.")
        .regex(/[0-9]/, "Debe contener al menos un número.")
        .regex(/[^a-zA-Z0-9]/, "Debe contener al menos un carácter especial."),

    confirmar: z.string()

}).refine((datos) => datos.password === datos.confirmar, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmar"]

});
