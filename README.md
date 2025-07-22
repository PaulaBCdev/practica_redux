# 🛒 Nodepop (ZOCO) - Proyecto de React

Este es mi proyecto final para el módulo de **Fundamentos de React**. Se trata de una **aplicación web de compra venta de productos** desde la que se puede gestionar el backend de anuncios de compra y venta llamado [Nodepop](https://github.com/davidjj76/nodepop-api).

---

## 📌 Objetivo del proyecto

Crear una **SPA (Single Page Application)** con React para gestionar anuncios de productos a través de un backend ya creado, con funcionalidades de login, listado de productos, creación, visualización y borrado de anuncios.

La app permite hacer filtros de búsqueda, y protege las rutas privadas para que solo puedan acceder usuarios autenticados.

---

## Tecnologías utilizadas

- **React** (con Vite)
- **CSS** puro y **Styled Components** para los estilos
- **Axios** para llamadas HTTP
- **React Router** para el enrutado
- **Clsx** para manejar clases condicionales
- **Prettier** para mantener el código ordenado

---

## Estructura general de la aplicación

### Rutas públicas

- `/login`: Página de login donde se pide el email y la contraseña. Tiene un checkbox para "Recordar sesión" y así no tener que volver a loguearse cada vez.

### Rutas protegidas (solo si estás logueado)

- `/`: Redirecciona automáticamente a `/adverts`
- `/adverts`: Página principal donde se listan los anuncios. Aquí se pueden aplicar filtros.
- `/adverts/:id`: Página de detalle de un anuncio concreto.
- `/adverts/new`: Página para crear un nuevo anuncio.
- `*`: Cualquier ruta no existente lleva a una página de error 404.

---

## Qué hace cada página

### LoginPage

- Formulario para hacer login.
- Si marcamos "Recordar sesión", se guarda en el `localStorage`.

### AdvertsPage

- Lista de todos los anuncios con info básica: nombre, precio, tipo (compra/venta), y tags.
- Tiene una zona de **filtros**, que permite buscar por:
  - Nombre
  - Tipo (compra o venta)
  - Rango de precios
  - Tags
- Cada anuncio tiene un enlace a su detalle.
- Si no hay anuncios, se muestra un mensaje con enlace para crear uno.

### AdvertPage

- Muestra el detalle completo de un anuncio.
- Incluye la imagen (o un placeholder si no tiene).
- Se puede **borrar** el anuncio con confirmación personalizada (no se usa `window.confirm`).
- Al borrar, redirige al listado de anuncios.

### NewAdvertPage

- Formulario para crear un anuncio con los siguientes campos:
  - Nombre (requerido)
  - Tipo (compra o venta) (requerido)
  - Precio (requerido)
  - Tags (requerido)
  - Imagen (opcional)
- Las validaciones están hechas con React.
- Al crear el anuncio, se redirige automáticamente a su página de detalle.

---
