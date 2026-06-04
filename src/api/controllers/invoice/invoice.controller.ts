import { ApiParsedResponse } from '@src/types/common/api-manager.type';
import { UpdateResponse } from '@src/types/common/api-response.type';
import {
  GuestInvoiceRequest,
  InvoiceRequest,
  InvoiceResponse,
  InvoiceStatusRequest,
  PaginatedInvoiceResponse,
} from './dto/invoice.type';
import { BaseController } from '../base.controller';

export class InvoiceController extends BaseController {
  private readonly BASE = '/invoices';

  async getAll(page?: number): Promise<ApiParsedResponse<PaginatedInvoiceResponse>> {
    return this.apiManager.get(this.BASE, page !== undefined ? { params: { page } } : undefined);
  }

  async create(data: InvoiceRequest): Promise<ApiParsedResponse<InvoiceResponse>> {
    return this.apiManager.post(this.BASE, { data });
  }

  async createGuest(data: GuestInvoiceRequest): Promise<ApiParsedResponse<InvoiceResponse>> {
    return this.apiManager.post(`${this.BASE}/guest`, { data });
  }

  async getById(invoiceId: string): Promise<ApiParsedResponse<InvoiceResponse>> {
    return this.apiManager.get(`${this.BASE}/${invoiceId}`);
  }

  async update(invoiceId: string, data: InvoiceRequest): Promise<ApiParsedResponse<UpdateResponse>> {
    return this.apiManager.put(`${this.BASE}/${invoiceId}`, { data });
  }

  async patch(invoiceId: string, data: Partial<InvoiceRequest>): Promise<ApiParsedResponse<UpdateResponse>> {
    return this.apiManager.patch(`${this.BASE}/${invoiceId}`, { data });
  }

  async downloadPdf(invoiceNumber: string): Promise<ApiParsedResponse<InvoiceResponse>> {
    return this.apiManager.get(`${this.BASE}/${invoiceNumber}/download-pdf`);
  }

  async downloadPdfStatus(invoiceNumber: string): Promise<ApiParsedResponse<InvoiceResponse>> {
    return this.apiManager.get(`${this.BASE}/${invoiceNumber}/download-pdf-status`);
  }

  async updateStatus(invoiceId: string, data: InvoiceStatusRequest): Promise<ApiParsedResponse<UpdateResponse>> {
    return this.apiManager.put(`${this.BASE}/${invoiceId}/status`, { data });
  }

  async search(q: string, page?: number): Promise<ApiParsedResponse<PaginatedInvoiceResponse>> {
    return this.apiManager.get(`${this.BASE}/search`, {
      params: page !== undefined ? { q, page } : { q },
    });
  }
}
