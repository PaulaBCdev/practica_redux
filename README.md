# 🛒 Nodepop (ZOCO) - Proyecto con React y Redux

Este es un proyecto desarrollado como parte de los módulos de **Fundamentos de React** y **React Avanzado**. Se trata de una **aplicación web de compra y venta de productos**, conectada con un backend llamado [Nodepop](https://github.com/davidjj76/nodepop-api), que permite gestionar anuncios de forma eficiente.

---

## 📌 Objetivo del proyecto

Crear una **SPA (Single Page Application)** con React que permita a los usuarios autenticados gestionar anuncios de productos: ver, crear, filtrar, eliminar y explorar detalles. Además, en la segunda fase del proyecto, se ha integrado **Redux** para la gestión del estado global y se han incorporado **tests unitarios** para asegurar el correcto funcionamiento de la lógica de negocio.

---

## 🧠 Nuevas funcionalidades en React Avanzado

Durante el módulo de React Avanzado, se introdujeron mejoras clave al proyecto:

### 🗂️ Redux

- Se implementó un **estado global con Redux** para desacoplar la lógica de los componentes y mejorar la escalabilidad de la app.
- Se definieron **acciones** y **reducers** para manejar el estado de autenticación, anuncios y filtros de forma centralizada.
- Se usaron **selectores** para acceder al estado de forma eficiente y reutilizable.
- Se creó una **colección de hooks** para encapsular la lógica de interacción con el store.

### 🧪 Testing con Vitest

- Se añadieron **tests unitarios** para:
  - Reducers (asegurando la actualización correcta del estado).
  - Acciones (verificando la lógica que se dispara).
  - Selectores (probando que extraen los datos esperados).
  - Componentes clave (con mocks cuando fue necesario).
- Se utilizó **Vitest** como entorno de pruebas por su velocidad y compatibilidad con Vite.
- En algunos casos, se **mockearon funciones o módulos completos** para aislar la lógica a testear.

---

## Tecnologías utilizadas

- **React** (con Vite)
- **Typescript** para manejar los tipos
- **Redux** para conectar el store con los componentes
- **CSS** puro y **Styled Components** para los estilos
- **Axios** para llamadas HTTP
- **React Router** para el enrutado
- **Clsx** para manejar clases condicionales
- **Prettier** para mantener el código ordenado

---

## Estructura general de la aplicación

### Rutas públicas

- `/login`: Página de login con opción de "Recordar sesión" (persistencia en `localStorage`).

### Rutas protegidas (requieren login)

- `/`: Redirecciona a `/adverts`
- `/adverts`: Listado de anuncios con filtros aplicables.
- `/adverts/:id`: Detalle del anuncio.
- `/adverts/new`: Crear un nuevo anuncio.
- `*`: Página de error 404 para rutas no válidas.

---

## Descripción de páginas principales

### LoginPage

- Formulario de login con persistencia de sesión.
- Uso de Redux para manejar el estado de autenticación.

### AdvertsPage

- Lista de anuncios con filtros:
  - Nombre
  - Tipo (compra/venta)
  - Rango de precios
  - Tags
- Estado gestionado con Redux.
- Si no hay anuncios, se muestra un mensaje con enlace para crear uno.

### AdvertPage

- Detalle de un anuncio con opción de borrado (con confirmación personalizada).
- Redux actualiza el estado tras eliminar el anuncio.

### NewAdvertPage

- Formulario para crear un nuevo anuncio con validaciones.
- Al enviar, redirige automáticamente a la vista de detalle.
- Usa Redux para manejar el estado de anuncios.

---

## ✅ Tests realizados

- Reducers:
  - Comprobación de estados iniciales y mutaciones esperadas.
- Acciones:
  - Verificación de la lógica de negocio y peticiones asíncronas (cuando aplica).
- Selectores:
  - Extraen datos filtrados o transformados desde el store.
- Componentes:
  - Se testean en aislamiento usando **React Testing Library**.
  - Uso de **mocks** para evitar dependencias externas.

---

## 📦 Cómo ejecutar el proyecto

1. Clona este repositorio.
2. Instala dependencias:
   ```bash
   npm install
   ```
