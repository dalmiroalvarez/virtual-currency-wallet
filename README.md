# Cartera Virtual de Divisas

Aplicación web desarrollada con React.js y Vite que permite a los usuarios gestionar un saldo en euros (EUR) y visualizar su equivalente en otras divisas utilizando la API de Coinbase.

## Características principales

- **Interfaz intuitiva**: Diseño minimalista y funcional con Tailwind CSS
- **Gestión de saldo**: Introducción de saldo inicial con validación
- **Selección de divisas**: Hasta 3 divisas de una lista dinámica obtenida de Coinbase
- **Conversión en tiempo real**: Tasas de cambio actualizadas al momento de la consulta
- **Manejo de errores**: Feedback claro al usuario en caso de problemas

## Tecnologías utilizadas

- **React.js**: Biblioteca principal para la construcción de la interfaz
- **Vite**: Entorno de desarrollo rápido y optimizado
- **Tailwind CSS**: Framework CSS para estilizado rápido y consistente
- **API de Coinbase**: Obtención de divisas disponibles y tasas de cambio
- **React Router**: Navegación entre páginas
- **LocalStorage**: Persistencia opcional de datos entre sesiones

## Decisiones de diseño

Opté por una arquitectura modular que separa claramente:
- **Componentes UI**: Reutilizables y con responsabilidad única
- **Páginas**: Contenedores principales de la aplicación
- **Servicios**: Lógica de comunicación con APIs externas
- **Utils**: Funcionalidades transversales como el manejo de almacenamiento local

El diseño responsive y accesible fue una prioridad, asegurando que la aplicación sea usable en cualquier dispositivo.

## Cómo ejecutar el proyecto

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Ejecutar en desarrollo: `npm run dev`
4. Abrir en el navegador: `http://localhost:5173`

## Posibles mejoras

1. **Testing**: Implementar pruebas unitarias y de integración con Jest y Testing Library
2. **Animaciones**: Transiciones suaves entre páginas y al cargar datos
3. **Gráficos**: Visualización histórica de tasas de cambio
4. **Autenticación**: Permitir a usuarios guardar sus preferencias
5. **Notificaciones**: Alertas cuando las tasas de cambio varíen significativamente
6. **Optimización**: Implementar caché para las llamadas a la API
7. **Internacionalización**: Soporte para múltiples idiomas

## Conclusión

Este proyecto demuestra habilidades fundamentales en el desarrollo frontend con React, consumo de APIs REST, manejo de estado y creación de interfaces de usuario efectivas. El código está estructurado para facilitar el mantenimiento y la escalabilidad, siguiendo buenas prácticas de desarrollo.