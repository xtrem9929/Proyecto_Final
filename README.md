# LimpIA Ica - Gestión Inteligente de Residuos

Una plataforma web completa desarrollada en HTML, CSS y JavaScript puro para la gestión de residuos sólidos urbanos en Ica, Perú.

## 🚀 Características

- **Diseño Responsivo**: Adaptable a todos los dispositivos
- **Base de Datos Local**: Utiliza localStorage para persistencia de datos
- **Formularios Interactivos**: Para reportes, puntos de acopio y contacto
- **Sistema de Notificaciones**: Feedback visual para todas las acciones
- **Modales Dinámicos**: Para visualizar detalles de reportes y puntos
- **Búsqueda y Filtros**: Funcionalidad completa de búsqueda
- **Estadísticas en Tiempo Real**: Métricas actualizadas automáticamente

## 📁 Estructura del Proyecto

\`\`\`
limpia-ica/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── images/             # Carpeta de imágenes
│   ├── placeholder.html
│   ├── basura-acumulada-esquina.png
│   ├── lleno-contenedor-basura.png
│   ├── reciclaje-en-casa.png
│   ├── environmental-impact-waste.png
│   └── destacado-reciclaje.png
└── README.md           # Este archivo
\`\`\`

## 🛠️ Instalación en Hostinger

### Paso 1: Preparar los Archivos
1. Descarga todos los archivos del proyecto
2. Añade las imágenes necesarias en la carpeta `images/`

### Paso 2: Subir a Hostinger
1. Accede a tu panel de Hostinger (hPanel)
2. Ve a **File Manager**
3. Navega a `public_html/`
4. Sube todos los archivos del proyecto

### Paso 3: Configurar el Dominio
1. Si usas un subdominio: `tu-proyecto.tu-dominio.com`
2. Si usas el dominio principal: los archivos van directamente en `public_html/`

### Paso 4: Verificar
1. Visita tu sitio web
2. Verifica que todas las funcionalidades trabajen correctamente

## 🎯 Funcionalidades Principales

### 📊 Dashboard de Inicio
- Estadísticas en tiempo real
- Métricas de toneladas recicladas
- Contador de ciudadanos activos
- Reportes y puntos de acopio

### 🗺️ Mapa Interactivo
- **Ver Mapa**: Visualización de reportes y puntos de acopio
- **Reportar Problema**: Formulario para reportar puntos críticos
- **Registrar Acopio**: Formulario para nuevos puntos de recolección

### 📝 Blog y Comunidad
- **Contenido Educativo**: Artículos sobre reciclaje y sostenibilidad
- **Reportes**: Visualización y gestión de reportes ciudadanos
- **Puntos de Acopio**: Directorio de centros de recolección

### 👥 Nosotros
- Información del equipo de desarrollo
- Misión y visión del proyecto
- Objetivos estratégicos
- Información institucional

### 📞 Contacto
- Formulario de contacto funcional
- Información de contacto
- Redes sociales
- FAQ interactivo

## 💾 Base de Datos Local

El proyecto utiliza `localStorage` para simular una base de datos:

### Estructura de Datos

\`\`\`javascript
// Reportes
{
  id: number,
  titulo: string,
  descripcion: string,
  prioridad: 'baja' | 'media' | 'alta' | 'critica',
  ubicacion: string,
  fecha: string,
  estado: 'pendiente' | 'en-proceso' | 'resuelto',
  imagen?: string
}

// Puntos de Acopio
{
  id: number,
  titulo: string,
  descripcion: string,
  tipoResiduos: string,
  ubicacion: string,
  telefono: string,
  horario: string,
  fecha: string
}

// Contactos
{
  id: number,
  nombre: string,
  email: string,
  telefono: string,
  asunto: string,
  mensaje: string,
  terminos: boolean,
  newsletter: boolean,
  fecha: string
}
\`\`\`

## 🎨 Personalización

### Colores
Modifica las variables CSS en `styles.css`:
\`\`\`css
:root {
  --primary-color: #10b981;
  --secondary-color: #06b6d4;
  --accent-color: #8b5cf6;
  /* ... más colores */
}
\`\`\`

### Contenido
- Edita el HTML para cambiar textos
- Modifica `script.js` para cambiar la lógica
- Actualiza las imágenes en la carpeta `images/`

## 📱 Responsive Design

El sitio está optimizado para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🔧 Funcionalidades Técnicas

### Formularios
- Validación en tiempo real
- Limpieza automática después del envío
- Manejo de archivos de imagen
- Notificaciones de éxito/error

### Navegación
- SPA (Single Page Application)
- Navegación suave entre secciones
- Menú móvil responsive
- Breadcrumbs automáticos

### Modales
- Visualización detallada de reportes
- Edición de estados
- Confirmaciones de eliminación
- Cierre con ESC o clic fuera

### Búsqueda y Filtros
- Búsqueda en tiempo real
- Filtros por estado/tipo
- Resultados dinámicos
- Sin recarga de página

## 🚀 Optimizaciones

### Performance
- CSS y JS minificados en producción
- Imágenes optimizadas
- Lazy loading para contenido dinámico
- Cache del navegador aprovechado

### SEO
- Meta tags apropiados
- Estructura semántica HTML5
- URLs amigables simuladas
- Contenido accesible

### Accesibilidad
- Navegación por teclado
- Lectores de pantalla compatibles
- Contraste de colores adecuado
- Textos alternativos en imágenes

## 🐛 Solución de Problemas

### Problemas Comunes

1. **Las imágenes no cargan**
   - Verifica que estén en la carpeta `images/`
   - Revisa los nombres de archivo
   - Confirma los permisos de archivo

2. **Los datos no se guardan**
   - Verifica que localStorage esté habilitado
   - Revisa la consola del navegador
   - Confirma que no hay errores de JavaScript

3. **El sitio no es responsive**
   - Verifica la etiqueta viewport en HTML
   - Revisa las media queries en CSS
   - Confirma que no hay CSS conflictivo

## 📞 Soporte

Para soporte técnico:
- Email: contacto@limpiaica.pe
- Teléfono: +51 956 123 456

## 👨‍💻 Desarrolladores

**Integrantes:**
- Perez Injante, Jhamir Antonio
- Alviar Carhuayo, Manuel Jesus
- Curioso Hernandez, Jeremy Fabian
- Navarrete Osis, Aldhair Alexis
- Ore Huillca, Johan Sebastian

**Docente:**
- Ing. Erwin Peña Casas

**Institución:**
Universidad Nacional San Luis Gonzaga de Ica

## 📄 Licencia

© 2024 LimpIA Ica. Todos los derechos reservados.
Desarrollado con ❤️ por estudiantes de Ingeniería de Sistemas - UNICA.
