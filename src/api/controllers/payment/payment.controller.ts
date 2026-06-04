import { ApiParsedResponse } from '@src/types/common/api-manager.type';
import { PaymentRequest, PaymentResponse } from './dto/payment.type';
import { BaseController } from '../base.controller';

export class PaymentController extends BaseController {
  async check(data: PaymentRequest): Promise<ApiParsedResponse<PaymentResponse>> {
    return this.apiManager.post('/payment/check', { data });
  }
}
