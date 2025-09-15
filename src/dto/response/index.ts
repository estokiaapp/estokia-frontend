
export interface SignupResponse {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface LoginResponse {
	token: string,
	user: UserResponseData
}

export interface UserResponseData {
	id: string;
	email: string;
	name: string;
}

export interface User {
	id: number
	email: string
	name: string
	createdAt: string
	updatedAt: string
}

export interface UsersResponse {
	users: User[]
}

export interface Product {
	id: string
	name: string
	sku: string
	categoryId?: string
	supplierId?: string
	costPrice?: number
	sellingPrice?: number
	currentStock?: number
	minimumStock?: number
	maximumStock?: number
	unitOfMeasure?: string
	description?: string
	createdAt: string
	updatedAt: string
}

export interface ProductsResponse {
	products: Product[]
}

export interface Category {
	id: string
	name: string
	description?: string
	createdAt: string
	updatedAt: string
	_count?: {
		products: number
	}
}

export interface CategoriesResponse {
	categories: Category[]
}