import Link from "next/link";

export default function Productos() {

  return (
    <main className="container my-5 text-center">

      <h1>Productos de Fortinity 🎮</h1>

      <p>
        Aquí encontrarás todas nuestras cuentas gamer disponibles.
      </p>

      <Link href="/" className="btn btn-primary">
        Volver al inicio
      </Link>

    </main>
  );

}