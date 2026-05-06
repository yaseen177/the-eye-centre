import type {
  Product,
  Order,
  OrderItem,
  Prescription,
  GalleryImage,
  Category,
  Gender,
  FrameShape,
  LensType,
  LensPackage,
  LensTint,
  OrderStatus,
} from '@prisma/client';

export type {
  Product,
  Order,
  OrderItem,
  Prescription,
  GalleryImage,
  Category,
  Gender,
  FrameShape,
  LensType,
  LensPackage,
  LensTint,
  OrderStatus,
};

// ─── Cart ────────────────────────────────────────────────────────────────────

export interface PrescriptionData {
  lensType: LensType;
  rightSph?: number;
  rightCyl?: number;
  rightAxis?: number;
  rightAdd?: number;
  leftSph?: number;
  leftCyl?: number;
  leftAxis?: number;
  leftAdd?: number;
  pdSingle?: number;
  pdRight?: number;
  pdLeft?: number;
  lensPackage: LensPackage;
  lensTint: LensTint;
  sendLater: boolean;
}

export interface CartItem {
  id: string;           // unique cart line id (not product id)
  productId: string;
  name: string;
  brand: string;
  image: string;
  unitPrice: number;
  lensPrice: number;   // additional lens cost
  quantity: number;
  prescription?: PrescriptionData;
}

// ─── Admin ───────────────────────────────────────────────────────────────────

export type OrderWithItems = Order & {
  items: (OrderItem & {
    product: Pick<Product, 'id' | 'name' | 'brand' | 'images'>;
    prescription: Prescription | null;
  })[];
  user: { name: string | null; email: string } | null;
};

export type ProductFilters = {
  category?: Category;
  gender?: Gender;
  shape?: FrameShape;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  inStock?: boolean;
};

// ─── Lens pricing ────────────────────────────────────────────────────────────

export const LENS_PACKAGE_PRICES: Record<LensPackage, number> = {
  BRONZE: 0,
  SILVER: 29,
  GOLD: 59,
  PLATINUM: 99,
};

export const LENS_TINT_PRICES: Record<LensTint, number> = {
  CLEAR: 0,
  SUNGLASS_TINT: 25,
  BLUE_LIGHT: 35,
  TRANSITIONS: 75,
};
