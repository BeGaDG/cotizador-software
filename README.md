# Cotizador de Software

Este proyecto es un **cotizador de software** diseñado para ayudar a calcular de manera precisa los costos asociados a proyectos de desarrollo de software. Permite estimar los precios tomando en cuenta factores como tiempo, recursos, y complejidad de los proyectos.

## 🚀 Características

- **Interfaz Responsiva**: Se adapta correctamente a dispositivos móviles, tabletas y computadoras de escritorio.
- **Manejo de Grandes Números**: Los valores ingresados se muestran de manera legible, sin que los números grandes se monten unos encima de otros.
- **Personalización**: Puedes ajustar los parámetros de cotización según las necesidades de tu negocio.
- **Fácil de Usar**: Diseño sencillo para facilitar el uso incluso para usuarios sin experiencia técnica.

## 🛠️ Tecnologías Usadas

- **React**: Biblioteca JavaScript utilizada para construir la interfaz de usuario.
- **Next.js**: Framework que permite la renderización del lado del servidor (SSR) y la generación de páginas estáticas.
- **Tailwind CSS**: Framework para crear interfaces de usuario altamente personalizables con clases utilitarias.
- **JavaScript/TypeScript**: Lenguajes utilizados para la lógica de la aplicación.

## 📂 Estructura del Proyecto

```plaintext
cotizador-software/
├── public/          # Archivos estáticos (imágenes, iconos, etc.)
├── src/
│   ├── components/  # Componentes reutilizables
│   ├── pages/       # Páginas de la aplicación
│   ├── styles/      # Estilos globales y específicos
│   └── utils/       # Funciones y utilidades auxiliares
├── .gitignore       # Archivos y carpetas a ignorar en Git
├── package.json     # Dependencias y scripts del proyecto
├── README.md        # Documentación del proyecto
└── tailwind.config.js # Configuración de Tailwind CSS
⚙️ Instalación
Para instalar y ejecutar el proyecto en tu máquina local, sigue estos pasos:

Clona el repositorio:

bash
Copiar código
git clone https://github.com/BeGaDG/cotizador-software.git
Navega al directorio del proyecto:

bash
Copiar código
cd cotizador-software
Instala las dependencias:

bash
Copiar código
npm install
Ejecuta el servidor de desarrollo:

bash
Copiar código
npm run dev
Abre tu navegador en http://localhost:3000 para ver la aplicación en acción.

🌐 Despliegue
Este proyecto está preparado para ser desplegado en plataformas como Netlify. Si deseas desplegar el proyecto, sigue estos pasos:

Conecta tu repositorio de GitHub a Netlify.
Configura los parámetros de compilación:
Build Command: next build
Publish Directory: .next
Despliega el proyecto.
📝 Contribuciones
¡Las contribuciones son bienvenidas! Si deseas colaborar con el proyecto, por favor sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama para tu funcionalidad: git checkout -b nueva-funcionalidad.
Realiza tus cambios y haz un commit: git commit -m "Añadido nueva funcionalidad".
Sube tus cambios: git push origin nueva-funcionalidad.
Crea un Pull Request en este repositorio.
📄 Licencia
Este proyecto está bajo la licencia MIT.

👥 Autor
BeGaDG
