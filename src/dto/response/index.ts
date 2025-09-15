
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