function obtenerCarrito() {
    let carrito = localStorage.getItem("carrito");

    if (carrito) {
        return JSON.parse(carrito);
    } else {
        return [];
    }
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarCarrito(nombre, precio) {
    let carrito = obtenerCarrito();

    let producto = {
        nombre: nombre,
        precio: precio
    };

    carrito.push(producto);

    guardarCarrito(carrito);

    alert(nombre + " se agregó al carrito.");
}

function mostrarCarrito() {
    let lista = document.getElementById("lista-carrito");
    let total = document.getElementById("total-carrito");

    if (!lista || !total) {
        return;
    }

    let carrito = obtenerCarrito();

    lista.innerHTML = "";

    let totalCompra = 0;

    if (carrito.length === 0) {
        lista.innerHTML = "<p>El carrito está vacío.</p>";
        total.innerHTML = "Total: $0";
        return;
    }

    for (let i = 0; i < carrito.length; i++) {

        let producto = document.createElement("div");

        producto.innerHTML = `
            <h3>${carrito[i].nombre}</h3>
            <p>Precio: $${carrito[i].precio}</p>
            <button onclick="eliminarProducto(${i})">
                Eliminar
            </button>
        `;

        lista.appendChild(producto);

        totalCompra = totalCompra + carrito[i].precio;
    }

    total.innerHTML = "Total: $" + totalCompra;
}

function eliminarProducto(posicion) {
    let carrito = obtenerCarrito();

    carrito.splice(posicion, 1);

    guardarCarrito(carrito);

    mostrarCarrito();
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");

    mostrarCarrito();
}

function comprar() {
    let carrito = obtenerCarrito();

    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    alert("Compra realizada correctamente.");

    localStorage.removeItem("carrito");

    mostrarCarrito();
}


/* Registro */

let formularioRegistro = document.getElementById("formRegistro");

if (formularioRegistro) {

    formularioRegistro.addEventListener("submit", function(event) {

        event.preventDefault();

        let nombre = document.getElementById("nombre").value;
        let correo = document.getElementById("correo").value;
        let password = document.getElementById("password").value;
        let confirmar = document.getElementById("confirmar").value;
        let mensaje = document.getElementById("mensajeRegistro");

        if (nombre === "" || correo === "" || password === "" || confirmar === "") {
            mensaje.innerHTML = "Completa todos los campos.";
            return;
        }

        if (!correo.includes("@")) {
            mensaje.innerHTML = "Ingresa un correo válido.";
            return;
        }

        if (password.length < 6) {
            mensaje.innerHTML = "La contraseña debe tener al menos 6 caracteres.";
            return;
        }

        if (password !== confirmar) {
            mensaje.innerHTML = "Las contraseñas no coinciden.";
            return;
        }

        localStorage.setItem("usuarioNombre", nombre);
        localStorage.setItem("usuarioCorreo", correo);
        localStorage.setItem("usuarioPassword", password);

        mensaje.innerHTML = "Registro realizado correctamente.";

        formularioRegistro.reset();
    });
}


/* Login */

let formularioLogin = document.getElementById("formLogin");

if (formularioLogin) {

    formularioLogin.addEventListener("submit", function(event) {

        event.preventDefault();

        let correo = document.getElementById("loginCorreo").value;
        let password = document.getElementById("loginPassword").value;
        let mensaje = document.getElementById("mensajeLogin");

        let correoGuardado = localStorage.getItem("usuarioCorreo");
        let passwordGuardada = localStorage.getItem("usuarioPassword");

        if (correo === "" || password === "") {
            mensaje.innerHTML = "Completa todos los campos.";
            return;
        }

        if (correo === correoGuardado && password === passwordGuardada) {
            mensaje.innerHTML = "Inicio de sesión correcto.";
        } else {
            mensaje.innerHTML = "Correo o contraseña incorrectos.";
        }
    });
}


/* Contacto */

let formularioContacto = document.getElementById("formContacto");

if (formularioContacto) {

    formularioContacto.addEventListener("submit", function(event) {

        event.preventDefault();

        let nombre = document.getElementById("contactoNombre").value;
        let correo = document.getElementById("contactoCorreo").value;
        let asunto = document.getElementById("asunto").value;
        let mensaje = document.getElementById("mensaje").value;
        let respuesta = document.getElementById("mensajeContacto");

        if (nombre === "" || correo === "" || asunto === "" || mensaje === "") {
            respuesta.innerHTML = "Completa todos los campos.";
            return;
        }

        if (!correo.includes("@")) {
            respuesta.innerHTML = "Ingresa un correo válido.";
            return;
        }

        respuesta.innerHTML = "Mensaje enviado correctamente.";

        formularioContacto.reset();
    });
}


/* Mostrar carrito */

mostrarCarrito();
