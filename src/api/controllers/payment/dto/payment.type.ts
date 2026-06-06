export type PaymentMethod = 'bank-transfer' | 'cash-on-delivery' | 'credit-card' | 'buy-now-pay-later' | 'gift-card';

export interface BankTransferDetails {
  bank_name: string;
  account_name: string;
  account_number: string;
}

export interface CreditCardDetails {
  credit_card_number: string;
  expiration_date: string;
  cvv: string;
  card_holder_name: string;
}

export interface GiftCardDetails {
  gift_card_number: string;
  validation_code: string;
}

export interface BuyNowPayLaterDetails {
  monthly_installments: string;
}

export type PaymentDetails =
  | BankTransferDetails
  | CreditCardDetails
  | GiftCardDetails
  | BuyNowPayLaterDetails
  | Record<string, never>;

export interface PaymentRequest {
  payment_method: PaymentMethod;
  payment_details: PaymentDetails;
}

export interface PaymentResponse {
  message: string;
}
