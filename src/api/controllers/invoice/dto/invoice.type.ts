import type { ProductResponse } from '@controllers/product/dto/product.type';
import type { PaymentDetails, PaymentMethod } from '@controllers/payment/dto/payment.type';
import type { Paginated } from '@src/types/common/api-response.type';

export type InvoiceStatus =
  | 'AWAITING_FULFILLMENT'
  | 'ON_HOLD'
  | 'AWAITING_SHIPMENT'
  | 'SHIPPED'
  | 'COMPLETED';

export interface InvoiceRequest {
  billing_street: string;
  billing_city: string;
  billing_state: string;
  billing_country: string;
  billing_postal_code: string;
  payment_method: PaymentMethod;
  payment_details: PaymentDetails;
  cart_id: string;
}

export interface GuestInvoiceRequest extends InvoiceRequest {
  guest_email?: string;
  guest_first_name?: string;
  guest_last_name?: string;
}

export interface InvoiceStatusRequest {
  status: InvoiceStatus;
  status_message?: string | null;
}

export interface InvoiceLineResponse {
  id: string;
  invoice_id: string;
  product_id: string;
  unit_price: number;
  discount_percentage: number;
  discounted_price: number;
  quantity: number;
  product: ProductResponse;
}

export interface InvoiceResponse {
  id: string;
  user_id: string;
  invoice_date: string;
  invoice_number: string;
  billing_street: string;
  billing_city: string;
  billing_country: string;
  billing_state: string;
  billing_postal_code: string;
  additional_discount_percentage: number;
  additional_discount_amount: number;
  subtotal: number;
  total: number;
  status: InvoiceStatus;
  status_message: string;
  invoicelines: InvoiceLineResponse[];
  created_at: string;
}

export type PaginatedInvoiceResponse = Paginated<InvoiceResponse>;
