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
import { step } from '@src/common/core/step.decorator';

export class UserController extends BaseController {
  private readonly BASE = '/users';

  @step()
  async getAll(page?: number): Promise<ApiParsedResponse<PaginatedUserResponse>> {
    return this.apiManager.get(this.BASE, { params: page !== undefined ? { page } : undefined });
  }

  @step(undefined, { logArgs: false })
  async register(data: UserRequest): Promise<ApiParsedResponse<UserResponse>> {
    return this.apiManager.post(`${this.BASE}/register`, { data });
  }

  @step(undefined, { logArgs: false })
  async login(data: LoginRequest): Promise<ApiParsedResponse<TokenResponse>> {
    return this.apiManager.post(`${this.BASE}/login`, { data });
  }

  @step()
  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiParsedResponse<UpdateResponse>> {
    return this.apiManager.post(`${this.BASE}/forgot-password`, { data });
  }

  @step(undefined, { logArgs: false })
  async changePassword(data: ChangePasswordRequest): Promise<ApiParsedResponse<UpdateResponse>> {
    return this.apiManager.post(`${this.BASE}/change-password`, { data });
  }

  @step()
  async getMe(): Promise<ApiParsedResponse<UserResponse>> {
    return this.apiManager.get(`${this.BASE}/me`);
  }

  @step()
  async logout(): Promise<ApiParsedResponse<LogoutResponse>> {
    return this.apiManager.get(`${this.BASE}/logout`);
  }

  @step()
  async refreshToken(): Promise<ApiParsedResponse<TokenResponse>> {
    return this.apiManager.get(`${this.BASE}/refresh`);
  }

  @step()
  async getById(userId: string): Promise<ApiParsedResponse<UserResponse>> {
    return this.apiManager.get(`${this.BASE}/${userId}`);
  }

  @step()
  async update(userId: string, data: UserRequest): Promise<ApiParsedResponse<UpdateResponse>> {
    return this.apiManager.put(`${this.BASE}/${userId}`, { data });
  }

  @step()
  async patch(userId: string, data: Partial<UserRequest>): Promise<ApiParsedResponse<UpdateResponse>> {
    return this.apiManager.patch(`${this.BASE}/${userId}`, { data });
  }

  @step()
  async remove(userId: string): Promise<ApiParsedResponse<void>> {
    return this.apiManager.delete(`${this.BASE}/${userId}`);
  }

  @step()
  async search(query: string, page?: number): Promise<ApiParsedResponse<UserResponse[]>> {
    return this.apiManager.get(`${this.BASE}/search`, {
      params: { query, ...(page !== undefined && { page }) },
    });
  }
}
