# Generador de Plantillas de Email

Proyecto **React + TypeScript + Vite** para construir **plantillas de email editables** con bloques drag & drop.

---

## Características

- **Arrastrar y soltar**: Usando [`@dnd-kit/core`](https://docs.dndkit.com/).  
- **Contenido editable**: Edición inline con [`react-contenteditable`](https://github.com/lovasoa/react-contenteditable).  
- **Bloques dinámicos**: Añade bloques configurables y editables.  
- **Estilos personalizables**: Cambia colores, bordes, tamaños y más por bloque.  
- **Iconos**: Integra [`react-icons`](https://react-icons.github.io/react-icons/) para la UI.  
- **Vite-powered**: Recarga rápida (HMR) y build optimizado con TypeScript.

---

## Cómo empezar

Instalar dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Generar build de producción:

```bash
npm run build
```

## Estructura del proyecto

- `src/components/` – Componentes de UI.  
- `src/types/` – Tipos compartidos de TypeScript.  
- `src/App.tsx` – Archivo principal de la aplicación.
- `src/index.tsx` – Punto de entrada de la app.

## Tipos de bloques

El editor soporta múltiples tipos de bloques, incluyendo texto, imágenes, contenedores y grids.

## Cómo editar bloques

1. Arrastra un bloque desde la barra lateral al canvas.  
2. Selecciona el bloque para editar sus **propiedades** en el inspector:  
   - Contenido de texto  
   - URL y tamaño de imagen  
   - Filas y columnas (para bloques tipo grid)  
   - Estilos inline CSS  

## Dependencias principales

- `@dnd-kit/core` – Arrastrar y soltar 
- `react-contenteditable` – Edición inline  
- `react-icons` – Iconos para UI

## Notas

- Los bloques se implementan como grillas de celdas `contentEditable`, con bordes opcionales.  
- El template está optimizado para HTML compatible con email, por lo que se utiliza estilos inline.  
- El proyecto es **100% TypeScript** y fácil de ampliar con nuevos tipos de bloque.