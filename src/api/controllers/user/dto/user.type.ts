export interface UserAddress {
  street: string;
  house_number: string | null;
  city: string;
  state: string | null;
  country: string;
  postal_code: string | null;
}

export interface UserAddressRequest {
  street?: string;
  house_number?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
}

export interface UserRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  address?: UserAddressRequest;
  phone?: string;
  dob?: string;
}

export interface UserResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  dob: string;
  address: UserAddress;
  provider: string | null;
  totp_enabled: boolean;
  enabled: boolean;
  failed_login_attempts: number | null;
  created_at: string;
}

export interface PaginatedUserResponse {
  current_page: number;
  data: UserResponse[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface LogoutResponse {
  message: string;
}

export interface UpdateResponse {
  success: boolean;
}
