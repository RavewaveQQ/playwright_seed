import { ApiParsedResponse } from '@src/types/common/api-manager.type';
import { TotpSetupResponse, TotpVerifyRequest, TotpVerifyResponse } from './dto/totp.type';
import { BaseController } from '../base.controller';

export class TotpController extends BaseController {
  async setup(): Promise<ApiParsedResponse<TotpSetupResponse>> {
    return this.apiManager.post('/totp/setup');
  }

  async verify(data: TotpVerifyRequest): Promise<ApiParsedResponse<TotpVerifyResponse>> {
    return this.apiManager.post('/totp/verify', { data });
  }
}
