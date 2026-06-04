export interface TotpSetupResponse {
  secret: string;
  qrCodeUrl: string;
}

export interface TotpVerifyRequest {
  access_token: string;
  totp: string;
}

export interface TotpVerifyResponse {
  message: string;
}

export interface TotpErrorResponse {
  error: string;
}
