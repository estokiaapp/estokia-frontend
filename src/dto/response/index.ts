
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