/**
 * Product Domain Models
 * All types and interfaces for Product entity
 */

// Opción individual de una variante (ej: "256GB", "Titanio negro")
export interface ProductVariantOption {
  id: string;
  value: string;
  label: string;
  hex?: string; // Para colores
  images?: string[]; // Imágenes específicas de esta opción
}

// Grupo de variantes del mismo tipo (ej: Color, Memoria)
export interface ProductVariantGroup {
  id: string;
  name: string;
  type: 'color' | 'storage' | 'size' | 'other';
  options: ProductVariantOption[];
  required: boolean;
}

// SKU: Combinación específica de variantes con stock y precio propios
export interface ProductSKU {
  id: string;
  combination: Record<string, string>; // { "color": "titanio-azul", "storage": "1tb" }
  availableQuantity: number;
  priceModifier: number; // Modificador sobre el precio base
  images?: string[]; // Imágenes específicas de esta combinación (opcional)
}

// Pregunta de un usuario sobre el producto
export interface Question {
  id: string;
  question: string;
  answer?: string;
  askedBy: string;
  answeredBy?: string;
  askedAt: string;
  answeredAt?: string;
}

// Característica individual de una review
export interface ReviewCharacteristic {
  label: string;
  value: number; // 1-5
}

// Review/Opinión de un producto
export interface Review {
  id: string;
  rating: number;
  title?: string;
  comment: string;
  userName: string;
  userAvatar?: string;
  date: string;
  likes: number;
  images?: string[];
  characteristics?: ReviewCharacteristic[];
}

// Entidad principal del producto con toda la información completa
export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: Price;
  images: string[];
  condition: 'new' | 'used';
  availableQuantity: number;
  soldQuantity: number;
  seller: Seller;
  shipping: Shipping;
  attributes: Attribute[];
  rating: Rating;
  paymentMethods: PaymentMethod[];
  warranty: string;
  category: Category;
  variants?: ProductVariantGroup[];
  skus?: ProductSKU[]; // SKUs disponibles (combinaciones de variantes)
  questions?: Question[];
  reviews?: Review[];
}

// Información de precio del producto (incluye descuentos y precio original)
export interface Price {
  amount: number;
  currency: string;
  originalAmount?: number;
  discount?: number;
}

// Información del vendedor que ofrece el producto
export interface Seller {
  id: string;
  nickname: string;
  avatarUrl?: string;
  reputation: SellerReputation;
  registrationDate: string;
  totalSales: number;
}

// Reputación del vendedor (nivel, power seller, transacciones)
export interface SellerReputation {
  level: 'red' | 'orange' | 'yellow' | 'light_green' | 'green';
  powerSellerStatus: boolean;
  positivePercentage: number;
  transactions: {
    total: number;
    completed: number;
    canceled: number;
  };
  metrics: {
    goodService: boolean; // Buena atención
    onTimeDelivery: boolean; // Entrega a tiempo
  };
}

// Información de envío (gratis, métodos disponibles, tiempos)
export interface Shipping {
  freeShipping: boolean;
  mode: 'me2' | 'custom';
  methods: string[];
  estimatedDelivery?: string;
}

// Atributo individual dentro de una categoría
export interface AttributeValue {
  name: string;
  value: string;
}

// Grupo de atributos por categoría (ej: "Características generales", "Memoria")
export interface AttributeCategory {
  name: string;
  values: AttributeValue[];
}

// Atributos técnicos del producto organizados por categorías
export type Attribute = AttributeCategory;

// Calificaciones y reviews del producto
export interface Rating {
  average: number;
  total: number;
}

// Método de pago disponible (tarjeta, efectivo, etc.)
export interface PaymentMethod {
  id: string;
  name: string;
  type: 'mercadopago' | 'credit_card' | 'debit_card' | 'bank_transfer' | 'cash';
  installments?: Installment[];
}

// Cuotas disponibles para un método de pago
export interface Installment {
  quantity: number;
  amount: number;
  rate: number;
}

// Categoría del producto con su jerarquía
export interface Category {
  id: string;
  name: string;
  path: string[];
}

// Versión simplificada del producto para listados (menos campos)
export interface ProductListItem {
  id: string;
  slug: string;
  title: string;
  price: Price;
  thumbnail: string;
  condition: 'new' | 'used';
  freeShipping: boolean;
}
