import { ApiParsedResponse } from '@src/types/common/api-manager.type';
import {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  LogoutResponse,
  PaginatedUserResponse,
  TokenResponse,
  UpdateResponse,
  UserRequest,
  UserResponse,
} from '@src/api/controllers/user/dto/user.type';
import { BaseController } from '../base.controller';

export class UserController extends BaseController {
  private readonly BASE = '/users';

  async getAll(page?: number): Promise<ApiParsedResponse<PaginatedUserResponse>> {
    return this.apiManager.get(this.BASE, { params: page !== undefined ? { page } : undefined });
  }

  async register(data: UserRequest): Promise<ApiParsedResponse<UserResponse>> {
    return this.apiManager.post(`${this.BASE}/register`, { data });
  }

  async login(data: LoginRequest): Promise<ApiParsedResponse<TokenResponse>> {
    return this.apiManager.post(`${this.BASE}/login`, { data });
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiParsedResponse<UpdateResponse>> {
    return this.apiManager.post(`${this.BASE}/forgot-password`, { data });
  }

  async changePassword(data: ChangePasswordRequest): Promise<ApiParsedResponse<UpdateResponse>> {
    return this.apiManager.post(`${this.BASE}/change-password`, { data });
  }

  async getMe(): Promise<ApiParsedResponse<UserResponse>> {
    return this.apiManager.get(`${this.BASE}/me`);
  }

  async logout(): Promise<ApiParsedResponse<LogoutResponse>> {
    return this.apiManager.get(`${this.BASE}/logout`);
  }

  async refreshToken(): Promise<ApiParsedResponse<TokenResponse>> {
    return this.apiManager.get(`${this.BASE}/refresh`);
  }

  async getById(userId: string): Promise<ApiParsedResponse<UserResponse>> {
    return this.apiManager.get(`${this.BASE}/${userId}`);
  }

  async update(userId: string, data: UserRequest): Promise<ApiParsedResponse<UpdateResponse>> {
    return this.apiManager.put(`${this.BASE}/${userId}`, { data });
  }

  async patch(userId: string, data: Partial<UserRequest>): Promise<ApiParsedResponse<UpdateResponse>> {
    return this.apiManager.patch(`${this.BASE}/${userId}`, { data });
  }

  async remove(userId: string): Promise<ApiParsedResponse<void>> {
    return this.apiManager.delete(`${this.BASE}/${userId}`);
  }

  async search(query: string, page?: number): Promise<ApiParsedResponse<UserResponse[]>> {
    return this.apiManager.get(`${this.BASE}/search`, {
      params: { query, ...(page !== undefined && { page }) },
    });
  }
}
