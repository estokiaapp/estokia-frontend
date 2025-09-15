export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CreateProductData {
  name: string;
  sku: string;
  categoryId?: string;
  supplierId?: string;
  costPrice?: number;
  sellingPrice?: number;
  currentStock?: number;
  minimumStock?: number;
  maximumStock?: number;
  unitOfMeasure?: string;
  description?: string;
}

export interface UpdateProductData {
  name?: string;
  sku?: string;
  categoryId?: string;
  supplierId?: string;
  costPrice?: number;
  sellingPrice?: number;
  currentStock?: number;
  minimumStock?: number;
  maximumStock?: number;
  unitOfMeasure?: string;
  description?: string;
}
