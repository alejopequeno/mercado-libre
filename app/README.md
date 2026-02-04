# Frontend - MercadoLibre Challenge

Aplicación web moderna construida con Next.js 16, React 19 y TanStack Query para el challenge de MercadoLibre.

## Stack Tecnológico

- **Next.js 16** - Framework React con App Router
- **React 19** - Última versión con concurrent features
- **TypeScript** - Type safety
- **TanStack Query** - Server state management
- **shadcn/ui** - Componentes UI accesibles y customizables
- **Tailwind CSS 4** - Utility-first CSS framework
- **Motion** - Animaciones fluidas
- **Axios** - HTTP client
- **nuqs** - Type-safe URL search params
- **Embla Carousel** - Carousel de imágenes
- **date-fns** - Manejo de fechas

## Características

- ✅ Next.js 16 App Router con React Server Components
- ✅ Sistema dinámico de variantes (color, talla, memoria)
- ✅ TanStack Query para cache y server state
- ✅ Responsive design (mobile-first)
- ✅ Animaciones con Motion (Framer Motion)
- ✅ SEO optimizado (metadata, Open Graph)
- ✅ Image optimization con Next.js Image
- ✅ Loading states y error boundaries
- ✅ TypeScript strict mode
- ✅ Componentes reutilizables con shadcn/ui

## Instalación

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local

# Modo desarrollo
pnpm dev

# Build para producción
pnpm build

# Correr en producción
pnpm start
```

## Scripts Disponibles

```bash
pnpm dev      # Modo desarrollo en http://localhost:3000
pnpm build    # Build optimizado para producción
pnpm start    # Correr build de producción
pnpm lint     # Correr ESLint
```

## Estructura del Proyecto

```
app/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── items/
│       └── [id]/
│           └── page.tsx   # Product detail page
├── components/
│   ├── layout/            # Layout components (Navbar, Footer)
│   ├── product/           # Product-related components
│   ├── ui/                # shadcn/ui base components
│   └── ...
├── hooks/                 # Custom React hooks
│   ├── useProductVariants.ts
│   ├── useProductSKU.ts
│   └── useProductImages.ts
├── services/              # API services
│   └── productService.ts
├── lib/                   # Utilities
│   └── utils.ts
├── types/                 # TypeScript types
│   └── product.ts
└── public/                # Assets estáticos
```

## Features Principales

### 1. Sistema de Variantes Dinámico

Custom hooks para manejar productos con múltiples variantes:

```typescript
// Selección de variantes (color, talla, etc.)
const { selectedVariant, selectVariant } = useProductVariants(product);

// SKU dinámico según selección
const { currentSKU } = useProductSKU(product, selectedOptions);

// Imágenes dinámicas por variante
const { currentImages } = useProductImages(product, selectedVariant);
```

**Features:**
- Estado sincronizado con URL (compartir link mantiene selección)
- Actualización de precio/stock en tiempo real
- Validación de combinaciones disponibles
- UX clara para selección de opciones

### 2. Data Fetching con TanStack Query

```typescript
// Cache automático de productos
const { data, isLoading, error } = useQuery({
  queryKey: ['product', id],
  queryFn: () => productService.getProductById(id),
  staleTime: 5 * 60 * 1000, // 5 minutos
});
```

**Beneficios:**
- Cache inteligente (menos requests al backend)
- Retry automático en caso de error
- Loading y error states manejados
- Invalidación de cache cuando es necesario

### 3. Responsive Design

Mobile-first approach con breakpoints optimizados:

```
sm:  640px   # Tablet pequeña
md:  768px   # Tablet
lg:  1024px  # Desktop
xl:  1280px  # Desktop grande
2xl: 1536px  # Ultra wide
```

**Adaptaciones:**
- Navbar: Sheet drawer en mobile, menu horizontal en desktop
- Product detail: 1 columna en mobile, 2 columnas en desktop
- Imágenes: Carousel en mobile, grid en desktop
- Typography: Escalado responsive

### 4. Optimizaciones de Performance

- **React.memo**: Componentes que no cambian frecuentemente
- **useMemo**: Cálculos costosos (filtrado de variantes)
- **useCallback**: Evitar recrear funciones en cada render
- **Next.js Image**: Lazy loading + optimización automática
- **Code splitting**: Route-based con Next.js
- **Prefetching**: Links con prefetch automático

### 5. Componentes UI (shadcn/ui)

Componentes accesibles y customizables:
- **Button**: Variantes (default, outline, ghost, link)
- **Sheet**: Drawer para mobile navigation
- **Tabs**: Descripción, Q&A, Reviews
- **Avatar**: Seller info
- **Tooltip**: Info adicional
- **Badge**: Condition, stock status

### 6. SEO Optimization

```typescript
// Metadata dinámica por producto
export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: [product.thumbnail],
    },
  };
}
```

## Páginas

### Home (`/`)
- Lista de productos destacados
- Grid responsive
- Lazy loading de imágenes
- Links con prefetch

### Product Detail (`/items/[id]`)
- Galería de imágenes con carousel
- Información completa del producto
- Sistema de variantes
- Precio y stock dinámicos
- Sección de descripción
- Q&A y Reviews
- Información del vendedor
- Breadcrumb navigation

## Manejo de Estados

### Server State (TanStack Query)
- Datos de productos
- Cache de API responses

### Client State (React useState)
- Variantes seleccionadas
- UI state (modals, drawers)
- Form inputs

### URL State (nuqs)
- Filtros y selecciones
- Compartir estado via URL

## Error Handling

```typescript
// Error boundary a nivel de page
if (error) {
  return <ErrorState message="No pudimos cargar el producto" />;
}

// Loading states
if (isLoading) {
  return <ProductSkeleton />;
}

// Not found
if (!product) {
  return <NotFound />;
}
```

## Variables de Entorno

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## Deployment

### Vercel (Recomendado)
```bash
# Conectar repositorio a Vercel
vercel

# Deploy automático en cada push a main
```

### Self-hosted
```bash
# Build
pnpm build

# Start (requiere Node.js)
pnpm start
```

## Mejoras Futuras

Si esto fuera producción real:
- [ ] Tests (React Testing Library + Playwright)
- [ ] Internacionalización (i18n)
- [ ] Dark mode
- [ ] Wishlist/Favorites
- [ ] Shopping cart
- [ ] Checkout flow
- [ ] User authentication
- [ ] Product reviews con upload de fotos
- [ ] Real-time stock updates (WebSockets)
- [ ] A/B testing
- [ ] Analytics (GA4, Mixpanel)
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (Vercel Analytics)

## Notas Técnicas

### ¿Por qué App Router?
El App Router de Next.js 16 ofrece:
- React Server Components por defecto (mejor performance)
- Streaming y Suspense nativos
- Layouts anidados
- Loading UI patterns mejorados
- Mejor DX con TypeScript

### ¿Por qué TanStack Query?
Es el estándar de la industria para server state:
- Menos boilerplate que Redux
- Cache inteligente out of the box
- Retry logic y error handling
- DevTools para debugging
- Type-safe con TypeScript

### ¿Por qué shadcn/ui?
No es una librería pesada, son componentes que copies:
- 100% customizable (es tu código)
- Basado en Radix UI (accesible)
- Integración perfecta con Tailwind
- No afecta bundle size (tree-shakeable)

## Browser Support

- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)

## Licencia

MIT
