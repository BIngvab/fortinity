export default function Blog() {
    const publicaciones = [
        {
            id: "blog1",
            titulo: "¿Qué debes saber antes de comprar una cuenta?",
            descripcion: "Comprar una cuenta puede ser una opción para conseguir contenido que ya no está disponible o que es difícil de obtener.",
            contenido: [
                "Antes de comprar una cuenta es importante revisar la información del producto, su contenido, precio y características.",
                "También es recomendable conocer las condiciones de la compra antes de realizarla."
            ]

        },
        {
            id: "blog2",
            titulo: "¿Por qué las skins son importantes para los jugadores?",
            descripcion: "Las skins permiten personalizar la apariencia de los personajes y son una parte importante de la experiencia de muchos jugadores.",
            contenido: [
                "Las skins permiten personalizar los personajes y darle un estilo diferente a cada jugador.",
                "Algunas skins pueden ser difíciles de conseguir porque fueron obtenidas durante eventos o temporadas anteriores."
            ]

        }
    ];


    return (
        <main className="container my-5">
            <section className="text-center mb-5">

                <h1 className="fw-bold">Blog Fortinity</h1>

                <p>
                    Descubre información y consejos sobre tus videojuegos favoritos.
                </p>

            </section>


            <section className="row g-4 mb-5">
                {publicaciones.map((publicacion) => (

                    <div
                        className="col-12 col-md-6"
                        key={publicacion.id}
                    >

                        <article className="card h-100 p-4">

                            <h2 className="h4">
                                {publicacion.titulo}

                            </h2>

                            <p>
                                {publicacion.descripcion}

                            </p>

                            <a
                                href={`#${publicacion.id}`}
                                className="btn btn-primary mt-auto"
                            >
                                Leer más

                            </a>

                        </article>

                    </div>
                ))}
            </section>


            <section className="mb-5">

                <h2 className="text-center mb-4">
                    Nuestros artículos

                </h2>

                {publicaciones.map((publicacion) => (

                    <article
                        id={publicacion.id}
                        key={publicacion.id}
                        className="card p-4 mb-4"
                    >

                        <h3 className="h4 mb-3">
                            {publicacion.titulo}
                            
                        </h3>

                        {publicacion.contenido.map((parrafo, index) => (

                            <p key={index}>
                                {parrafo}

                            </p>

                        ))}
                    </article>
                ))}
            </section>
        </main>
    );
}