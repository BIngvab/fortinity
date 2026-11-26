
# Fortinity — Frontend

Proyecto desarrollado para la asignatura Desarrollo Fullstack II de Duoc UC.


## Descripción del proyecto

Fortinity es una plataforma web de comercio electrónico orientada a la venta de videojuegos y cuentas de plataformas digitales.

La aplicación permite consultar productos, registrar usuarios, iniciar sesión, administrar un carrito de compras y generar órdenes de compra.

El sistema se encuentra integrado con un backend desarrollado en Spring Boot y una base de datos MySQL.


## Tecnologías utilizadas

- Next.js
- React
- JavaScript
- Bootstrap
- Zod
- Vitest
- API REST
- Autenticación JWT
- Git y GitHub


## Requisitos previos

- Node.js 22.12 o superior de una rama LTS compatible.
- NPM.
- Backend de Fortinity configurado y ejecutándose.
- Base de datos MySQL configurada en el backend.


## Instalación

Desde la carpeta principal del repositorio, acceder al proyecto:

```bash
cd fortinity-react
```

Instalar las dependencias:

```bash
npm ci
```


## Configuración del entorno

Crear un archivo llamado `.env.local` utilizando como referencia el archivo `.env.example`.

Agregar la siguiente variable de entorno:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

Esta variable permite establecer la conexión con la API REST versionada del backend.


## Ejecución del proyecto

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

En Windows, si PowerShell restringe la ejecución de scripts, utilizar:

```powershell
npm.cmd run dev
```

Acceder desde el navegador:

http://localhost:3000


## Funcionalidades principales

- Registro e inicio de sesión de usuarios.
- Autenticación mediante JWT.
- Control de acceso según roles.
- Catálogo de productos conectado al backend.
- Visualización de productos destacados.
- Aplicación de descuentos.
- Administración del carrito de compras.
- Generación de boletas.
- Actualización de stock.
- Administración de productos.
- Consulta de órdenes de compra.
- Administración de roles y estados de usuarios.


## Roles del sistema

### Administrador

- Consultar, crear y editar productos.
- Desactivar y restaurar productos.
- Consultar órdenes y sus detalles.
- Administrar roles y estados de usuarios.


### Vendedor

- Consultar productos y sus detalles.
- Consultar órdenes de compra.
- Acceso restringido a la modificación de productos y usuarios.


### Cliente

- Consultar el catálogo.
- Agregar productos al carrito.
- Realizar compras.
- Generar boletas.
- Acceso restringido a los paneles administrativos.


## Integración con el backend

El frontend consume los servicios de la API REST mediante solicitudes HTTP y utiliza tokens JWT para acceder a los recursos protegidos.

La dirección base de la API es:

http://localhost:8080/api/v1

La documentación de los endpoints se encuentra disponible mediante Swagger:

http://localhost:8080/swagger-ui/index.html

Las rutas originales del backend se mantienen por compatibilidad.


## Pruebas unitarias

Para ejecutar las pruebas automatizadas con Vitest:

```bash
npx vitest run
```

En Windows también se puede utilizar:

```powershell
npx.cmd vitest run
```

Se verificaron 11 pruebas unitarias relacionadas con el catálogo original, precios, descuentos y cálculo de totales.

Las pruebas de integración y seguridad se realizaron adicionalmente mediante Postman y Swagger.



## Seguridad

El sistema utiliza autenticación JWT y autorización basada en roles.

Los permisos se verifican tanto en la interfaz del frontend como en el backend, siendo este último el responsable de autorizar las operaciones.

El archivo `.env.local` se mantiene excluido del control de versiones.


## Renovación automática del JWT

Los tokens JWT tienen una duración de 3600 segundos.

El frontend comprueba la expiración del token antes de realizar solicitudes autenticadas.

Cuando quedan cinco minutos o menos de vigencia, se solicita la renovación mediante el endpoint:

POST /api/v1/auth/refresh

El nuevo token se almacena en sessionStorage y permite continuar utilizando la aplicación.

Si el token ha expirado, se cierra la sesión y el usuario debe autenticarse nuevamente.

La renovación requiere un JWT vigente y no utiliza un refresh token independiente.

Esta funcionalidad fue verificada mediante Postman y las herramientas de desarrollo del navegador.



## Repositorios

Frontend:

https://github.com/BIngvab/fortinity

Backend:

https://github.com/BIngvab/fortinity-backend

Rama de desarrollo: `develop`.


## Contexto académico

Proyecto desarrollado como parte de la asignatura Desarrollo Fullstack II de Duoc UC.


## Año

2026
