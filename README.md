# Cotizador de Software

Este repositorio contiene un proyecto para un **Cotizador de Software**, desarrollado con el propósito de estimar los costos de desarrollo de software en función de diversos factores como sueldos de empleados, fases del proyecto, y porcentajes asociados a la empresa.

## Características

- Configuración de trabajadores y sueldos.
- Cálculo automático de costos totales y distribución de anticipos.
- Definición de fases del proyecto con duración personalizada.
- Inclusión de costos adicionales como IVA, retención en la fuente y porcentaje de la empresa.

## Tecnologías Utilizadas

- **React**: Para la construcción de la interfaz de usuario.
- **TypeScript**: Para el tipado estático y un desarrollo más robusto.
- **Tailwind CSS**: Para el diseño y estilos personalizados.
- **Lucide Icons**: Para el uso de iconos en la interfaz.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente antes de comenzar:

- **Node.js** (v16 o superior)
- **npm** o **yarn**

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/BeGaDG/cotizador-software.git
   ```

2. Accede al directorio del proyecto:

   ```bash
   cd cotizador-software
   ```

3. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn install
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. Abre tu navegador en [http://localhost:3000](http://localhost:3000).

## Uso

1. **Configurar trabajadores:** Ingresa los nombres, roles, sueldos mensuales y duración del trabajo para cada trabajador.
2. **Definir porcentajes:** Configura los porcentajes de la empresa, IVA, retención en la fuente y anticipos.
3. **Estimar costos:** Observa el cálculo automático de los costos totales, incluidos los anticipos y los pagos mensuales.
4. **Definir fases del proyecto:** Divide el proyecto en fases con tiempos estimados.

## Scripts Disponibles

- `npm run dev`: Inicia el entorno de desarrollo.
- `npm run build`: Genera la versión de producción del proyecto.
- `npm run lint`: Revisa el código en busca de errores y problemas de formato.

## Estructura del Proyecto

```
.
├── public/          # Archivos estáticos
├── src/             # Código fuente principal
│   ├── components/  # Componentes reutilizables
│   ├── pages/       # Páginas principales del proyecto
│   ├── styles/      # Estilos globales
│   └── utils/       # Utilidades y funciones auxiliares
└── package.json     # Dependencias y scripts del proyecto
```

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas colaborar:

1. Haz un fork del repositorio.

2. Crea una nueva rama:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

3. Realiza tus cambios y haz un commit:

   ```bash
   git commit -m "Agrega nueva funcionalidad"
   ```

4. Sube tus cambios:

   ```bash
   git push origin feature/nueva-funcionalidad
   ```

5. Abre un Pull Request para revisión.

## Licencia

Este proyecto está bajo la licencia [MIT](./LICENSE). Puedes utilizarlo y modificarlo libremente.

## Contacto

Para preguntas o sugerencias, puedes contactar al desarrollador:

- **Nombre**: Bernardo Galván
- **GitHub**: [@BeGaDG](https://github.com/BeGaDG)
- **Correo**: begadg\@gmail.com (sustituir con el correo real)

