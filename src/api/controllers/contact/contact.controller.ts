import { ApiParsedResponse } from '@src/types/common/api-manager.type';
import { UpdateResponse } from '@src/types/common/api-response.type';
import {
  ContactReplyResponse,
  ContactRequest,
  ContactResponse,
  ContactResponseAuthenticated,
  ContactStatusRequest,
  PaginatedContactResponse,
} from './dto/contact.type';
import { BaseController } from '../base.controller';

export class ContactController extends BaseController {
  private readonly BASE = '/messages';

  async getAll(page?: number): Promise<ApiParsedResponse<PaginatedContactResponse>> {
    return this.apiManager.get(this.BASE, page !== undefined ? { params: { page } } : undefined);
  }

  async send(data: ContactRequest): Promise<ApiParsedResponse<{ success: boolean }>> {
    return this.apiManager.post(this.BASE, { data });
  }

  async attachFile(
    messageId: string,
    file: Buffer,
    filename = 'attachment',
  ): Promise<ApiParsedResponse<{ success: boolean }>> {
    return this.apiManager.post(`${this.BASE}/${messageId}/attach-file`, {
      multipart: { file: { name: filename, mimeType: 'application/octet-stream', buffer: file } },
    });
  }

  async getById(messageId: string): Promise<ApiParsedResponse<ContactResponse | ContactResponseAuthenticated>> {
    return this.apiManager.get(`${this.BASE}/${messageId}`);
  }

  async reply(messageId: string, data: ContactRequest): Promise<ApiParsedResponse<ContactReplyResponse>> {
    return this.apiManager.post(`${this.BASE}/${messageId}/reply`, { data });
  }

  async updateStatus(messageId: string, data: ContactStatusRequest): Promise<ApiParsedResponse<UpdateResponse>> {
    return this.apiManager.put(`${this.BASE}/${messageId}/status`, { data });
  }
}
