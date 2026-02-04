# Decisiones de Diseño - MercadoLibre Challenge

Este documento explica las decisiones arquitecturales y técnicas tomadas durante el desarrollo del challenge, tanto en el backend como en el frontend.

## Backend

### Arquitectura en Capas

Se implementó una arquitectura en 3 capas (Controller → Service → Repository) para garantizar:

- **Separación de responsabilidades**: Cada capa tiene un propósito específico y bien definido
- **Testabilidad**: Permite testear cada capa de forma aislada con mocks
- **Mantenibilidad**: Los cambios en una capa no afectan a las demás
- **Escalabilidad**: Facilita agregar nuevas funcionalidades sin modificar código existente

### Stack Tecnológico

**Express**
Se eligió Express por:

- Simplicidad y velocidad de desarrollo para un proyecto de esta escala
- Menor overhead y mejor performance para una API RESTful simple
- Mayor flexibilidad para implementar la arquitectura deseada

**TypeScript + Zod**

- TypeScript para type safety en tiempo de desarrollo
- Zod para validación en runtime (complementa a TypeScript)
- Esta combinación previene errores tanto en desarrollo como en producción

**JSON File Storage**
El challenge requería explícitamente NO usar base de datos. Se implementó:

- Repository pattern que permite cambiar fácilmente a DB en el futuro
- File system como storage permanente
- Abstracción que simula operaciones de DB (findById, findAll)

### Testing Strategy

Se alcanzó **100% de cobertura** porque:

- Es un proyecto pequeño donde es factible
- Jest y testing patterns
- Garantiza confiabilidad para un proceso de selección
- Incluye tests unitarios (services, utils) e integración (controllers, routes)

### API Design

- **RESTful**: Uso correcto de HTTP methods y status codes
- **Documentación con Swagger**: Auto-generada y accesible en `/api-docs`
- **Error Handling**: Middleware centralizado que maneja todos los errores de forma consistente
- **CORS**: Configurado para permitir requests del frontend
- **Logging**: Morgan para trackear todas las requests

### Desafíos Enfrentados

1. **Validación con Zod**: Integrar Zod con Express de forma limpia requirió crear middleware custom
2. **Testing del Repository**: Mockear file system para los tests sin afectar los archivos reales
3. **Error Handling**: Diseñar una estrategia que capture todos los tipos de errores (validación, not found, server)

## Frontend

### Arquitectura

**Next.js 16 App Router**
Se eligió App Router en lugar de Pages Router por:

- Server Components por defecto (mejor performance)
- Layouts anidados y loading states nativos
- Mejor experiencia de desarrollo con las últimas features de React
- Soporte para Streaming y Suspense (disponible pero no utilizado extensivamente debido al uso de TanStack Query en el cliente)

**React 19**

- Uso de las últimas features (use hook, optimistic updates)
- Better concurrent rendering
- Improved TypeScript support

### Stack Tecnológico

**TanStack Query**
Manejo de server state con:

- Cache automático de productos
- Invalidación inteligente de queries
- Loading y error states manejados de forma declarativa
- Retry logic y stale-while-revalidate

**shadcn/ui + Tailwind CSS**

- Componentes accesibles y customizables (no una librería pesada)
- Tailwind para rapid prototyping y diseño responsive
- Mantiene el bundle size bajo

**Motion (Framer Motion)**

- Animaciones sutiles para mejor UX
- Transiciones suaves entre estados
- Mejora la percepción de performance

### Features Destacables

**Sistema de Variantes Dinámico**

- Custom hooks (`useProductVariants`, `useProductSKU`) para manejar variantes complejas
- Estado sincronizado con URL via `nuqs`
- Permite seleccionar color, talla, etc. y actualiza precio/stock en tiempo real

**Optimizaciones de Performance**

- `useMemo` y `useCallback` para evitar re-renders innecesarios
- Image optimization con Next.js Image component
- Lazy loading de componentes pesados
- Prefetching de routes

**Responsive Design**

- Mobile-first approach
- Breakpoints optimizados para tablet y desktop
- Sheet component para navegación mobile
- Adaptación de layouts según viewport

### Desafíos Enfrentados

1. **Variantes Dinámicas**: Diseñar un sistema flexible que soporte productos con diferentes tipos de variantes
2. **State Management**: Decidir qué va en server state (TanStack Query) vs client state (React state)
3. **Performance**: Balancear animaciones y transiciones sin afectar el performance
4. **TypeScript Strict**: Tipar correctamente todas las variantes y opciones del producto

## Extras Implementados

Más allá de los requisitos del challenge:

- Sistema completo de variantes (color, talla, memoria, etc.)
- SEO optimizado (metadata, Open Graph)

## Trade-offs y Decisiones

### Complejidad vs Simplicidad

El proyecto podría ser más simple (un JSON estático sin variantes), pero se eligió implementar un sistema más robusto para demostrar:

- Capacidad de diseñar arquitecturas escalables
- Manejo de estado complejo
- Thinking beyond the requirements

### Testing Coverage

- Backend: 100% coverage (factible en proyecto pequeño)
- Frontend: 0% coverage (el challenge lo pedía solo para el BE)

### Performance vs Features

Se priorizó entregar todas las features del challenge con buen UX sobre micro-optimizaciones prematuras. Las optimizaciones implementadas son las que dan mayor impacto.
