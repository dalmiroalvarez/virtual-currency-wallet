# Cartera Virtual de Divisas

Una aplicación web sencilla para convertir euros a diferentes divisas extranjeras. Te permite ingresar un saldo inicial y ver su equivalencia en las monedas que elijas.

## ¿Qué hace esta aplicación?

La idea es bastante simple: introduces cuántos euros tienes, seleccionas las divisas que te interesan, y la app te muestra cuánto dinero tendrías en cada una de esas monedas. Es útil si estás planeando un viaje o simplemente tienes curiosidad sobre el valor de tu dinero en otros países.

## Funcionalidades principales

### Conversión de divisas
- Ingresa tu saldo en euros (acepta decimales)
- Selecciona múltiples divisas de una lista completa
- Ve los resultados con las tasas de cambio actualizadas

### Persistencia de datos
La aplicación recuerda tus datos aunque cierres el navegador. Si habías puesto 500 euros y seleccionado dólares y yenes, al volver a entrar todo estará como lo dejaste. Esto lo logramos usando localStorage del navegador.

### Caché inteligente
Para no sobrecargar la API de tasas de cambio (y hacer la app más rápida), implementamos un sistema de caché:
- Las divisas disponibles se guardan por 5 minutos
- Las tasas de cambio se cachean por 2 minutos
- Si hay problemas de conexión, usa los datos guardados anteriormente

### Validaciones
La aplicación valida que:
- El saldo sea un número positivo
- Se haya seleccionado al menos una divisa
- Los datos ingresados sean correctos antes de procesar

## Tecnologías utilizadas

- **React** con hooks (useState, useEffect)
- **React Router** para la navegación entre páginas
- **Tailwind CSS** para los estilos
- **localStorage** para persistir datos
- **API de exchange rates** para obtener tasas actualizadas

## Estructura del proyecto

Organicé el código en carpetas para mantener todo ordenado:

```
src/
├── components/          # Componentes reutilizables
├── pages/              # Páginas principales
├── services/           # Llamadas a APIs
├── utils/              # Funciones de utilidad y validaciones
```

La carpeta `utils` fue clave para separar la lógica de validación del código de los componentes. Ahí tienes funciones como `validateBalance`, `isValidPositiveNumber`, etc. También las funciones para manejar localStorage están separadas en su propio archivo.

## Diseño responsive

La aplicación funciona bien en móviles, tablets y escritorio. Usé clases de Tailwind como `max-w-md mx-auto` para centrar el contenido y mantener un ancho adecuado en pantallas grandes, mientras que en móviles ocupa todo el ancho disponible.

## Cómo mejorar la aplicación

### Mejoras técnicas que implementaría

**1. Manejo de errores más robusto**
- Componente de error boundary para capturar errores de React
- Retry automático cuando fallan las peticiones
- Mensajes de error más específicos según el tipo de problema

**2. Performance**
- Lazy loading para las páginas
- Memoización de componentes pesados con React.memo
- Debounce en la búsqueda de divisas si agregamos esa funcionalidad

**3. Testing**
- Tests unitarios para las funciones de utils
- Tests de integración para los flujos principales
- Tests de los custom hooks

**4. Accesibilidad**
- Mejor soporte para lectores de pantalla
- Navegación por teclado más fluida
- Contraste de colores mejorado

### Funcionalidades nuevas

**1. Historial de conversiones**
- Guardar las conversiones anteriores
- Gráficos simples de evolución de tasas
- Exportar historial a CSV

**2. Calculadora avanzada**
- Conversión bidireccional (no solo desde EUR)
- Calculadora integrada para operaciones rápidas
- Favoritos para divisas más usadas

**3. Notificaciones**
- Alertas cuando una divisa alcanza cierto valor
- Notificaciones push para cambios importantes
- Newsletter con resúmenes semanales

**4. Configuración personalizada**
- Tema oscuro/claro
- Divisa base configurable (no solo EUR)
- Precisión decimal ajustable

### Siguiente fase de desarrollo

Si tuviera que priorizar las próximas mejoras, empezaría por:

1. **Agregar tests básicos** - Es fundamental para mantener la calidad del código
2. **Implementar historial** - Añade mucho valor sin complejidad excesiva  
3. **Mejorar el manejo de errores** - Hace la experiencia mucho más robusta
4. **Añadir más validaciones** - Como límites máximos, formatos específicos

### Consideraciones técnicas adicionales

**Base de datos**
Para el historial y configuraciones personalizadas, necesitaríamos una base de datos. PostgreSQL sería una buena opción, con un backend en Node.js/Express.

**Autenticación**
Si queremos guardar configuraciones por usuario, implementaría autenticación con JWT y tal vez integración con Google/GitHub para facilitar el registro.

**PWA**
Convertir la app en una Progressive Web App permitiría instalarla en móviles y usar offline con los datos cacheados.

## Instalación y uso

```bash
npm install
npm run dev
```

## API utilizada

Usamos una API gratuita para las tasas de cambio. En producción sería recomendable tener una clave API para evitar límites de rate limiting.

---

Esta aplicación empezó como un proyecto simple pero tiene potencial para crecer bastante. La base está sólida y la estructura permite agregar funcionalidades sin reescribir todo.