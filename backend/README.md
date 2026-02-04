# Backend - MercadoLibre Challenge

API RESTful para el challenge de MercadoLibre, construida con Express, TypeScript y arquitectura en capas.

## Stack Tecnológico

- **Express** - Framework web minimalista y rápido
- **TypeScript** - Type safety y mejor developer experience
- **Zod** - Validación de schemas en runtime
- **Jest** - Testing framework (100% coverage)
- **Swagger** - Documentación automática de la API
- **Morgan** - HTTP request logger
- **CORS** - Habilitado para requests del frontend

## Características

- ✅ Arquitectura en 3 capas (Controller → Service → Repository)
- ✅ Validación con Zod en todos los endpoints
- ✅ Error handling centralizado con middleware
- ✅ Documentación con Swagger en `/api-docs`
- ✅ 100% test coverage (unitarios + integración)
- ✅ TypeScript strict mode
- ✅ Storage en JSON files (sin base de datos)
- ✅ Logging de todas las requests

## Instalación

```bash
# Instalar dependencias
pnpm install

# Copiar variables de entorno (optional)
cp .env.example .env

# Modo desarrollo
pnpm dev

# Build para producción
pnpm build

# Correr en producción
pnpm start
```

## Scripts Disponibles

```bash
pnpm dev              # Modo desarrollo con hot reload
pnpm build            # Compilar TypeScript a JavaScript
pnpm start            # Correr en producción
pnpm test             # Correr todos los tests
pnpm test:watch       # Tests en modo watch
pnpm test:coverage    # Tests con reporte de coverage
pnpm lint             # Correr ESLint
pnpm format           # Formatear código con Prettier
```

## Estructura del Proyecto

```
src/
├── app.ts              # Configuración de Express app
├── server.ts           # Entry point, inicia el servidor
├── controllers/        # Maneja HTTP requests/responses
├── services/           # Lógica de negocio
├── repositories/       # Acceso a datos (JSON files)
├── models/             # Tipos e interfaces TypeScript
├── schemas/            # Schemas de validación Zod
├── routes/             # Definición de rutas
├── middlewares/        # Middleware custom (error handler, etc.)
├── config/             # Configuración (Swagger, constantes)
├── data/               # JSON files con los datos
└── utils/              # Funciones utilitarias
```

## API Endpoints

### Productos

#### GET `/api/products`

Obtiene la lista de todos los productos.

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "MLB123",
      "title": "iPhone 15 Pro Max",
      "price": 1299.99,
      "currency": "USD",
      "condition": "new",
      "thumbnail": "url",
      "category_id": "smartphones"
    }
  ]
}
```

#### GET `/api/products/:id`

Obtiene los detalles completos de un producto.

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "MLB123",
    "title": "iPhone 15 Pro Max",
    "price": 1299.99,
    "currency": "USD",
    "condition": "new",
    "sold_quantity": 150,
    "available_quantity": 25,
    "description": "Descripción completa...",
    "pictures": [...],
    "attributes": [...],
    "shipping": {...},
    "seller": {...}
  }
}
```

**Error Response (404):**

```json
{
  "success": false,
  "error": {
    "message": "Product not found",
    "statusCode": 404
  }
}
```

## Testing

El proyecto tiene **100% de cobertura** en tests.

```bash
# Correr todos los tests
pnpm test

# Tests con reporte de coverage
pnpm test:coverage

# Tests en modo watch
pnpm test:watch
```

### Tipos de Tests

- **Tests Unitarios**: Services, utils, schemas
- **Tests de Integración**: Controllers, routes, middleware
- **Mocks**: File system, dependencies externas

## Arquitectura

### Controller Layer

Maneja las HTTP requests y responses:

- Parsea y valida input
- Llama al service correspondiente
- Formatea la response
- Maneja errores

### Service Layer

Contiene la lógica de negocio:

- Validaciones de negocio
- Transformaciones de datos
- Orquestación entre repositories

### Repository Layer

Acceso a datos:

- Abstracción del storage (JSON files)
- Operaciones CRUD
- Fácilmente reemplazable por DB

## Error Handling

Todos los errores son manejados por un middleware centralizado:

```typescript
// Tipos de errores manejados:
-ValidationError(400) - // Zod validation errors
  NotFoundError(404) - // Recurso no encontrado
  ServerError(500); // Errores internos del servidor
```

## Validación con Zod

Todos los endpoints validan input con Zod:

```typescript
// Ejemplo de schema
const ProductIdSchema = z.object({
  id: z.string().min(1),
});

// Usado en middleware
validateRequest(ProductIdSchema);
```

## Documentación API (Swagger)

La documentación completa está disponible en:

```
http://localhost:4000/api-docs
```

Incluye:

- Todos los endpoints
- Request/response schemas
- Ejemplos
- Códigos de error

## Variables de Entorno

```bash
PORT=4000                    # Puerto del servidor
NODE_ENV=development         # Entorno (development/production)
CORS_ORIGIN=http://localhost:3000  # Frontend URL para CORS
```

## Notas Técnicas

### ¿Por qué JSON en lugar de DB?

El challenge requería explícitamente NO usar base de datos. El repository pattern implementado facilita cambiar a DB en el futuro sin modificar services ni controllers.

### ¿Por qué 100% coverage?

Para un proyecto de este tamaño es factible y demuestra dominio de testing. En producción real se optimizaría según ROI.

### Performance

- El servidor puede manejar miles de requests concurrentes
- JSON file read es síncrono pero cacheado en memoria
- Para producción con alta carga, se usaría DB + Redis cache

## Mejoras Futuras

Si esto fuera producción real:

- [ ] Base de datos (PostgreSQL/MongoDB)
- [ ] Redis para caching
- [ ] Rate limiting
- [ ] Authentication/Authorization
- [ ] Paginación en `/products`
- [ ] Búsqueda y filtros
- [ ] Logging estructurado (Winston/Pino)
- [ ] Monitoring (Prometheus/Grafana)
- [ ] Docker para deployment

## Licencia

MIT
