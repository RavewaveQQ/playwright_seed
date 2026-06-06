import { ApiParsedResponse } from '@src/types/common/api-manager.type';
import { PostcodeLookupParams, PostcodeResponse } from './dto/postcode.type';
import { BaseController } from '../base.controller';

export class PostcodeController extends BaseController {
  async lookup({
    country,
    postcode,
    house_number,
  }: PostcodeLookupParams): Promise<ApiParsedResponse<PostcodeResponse>> {
    const params: Record<string, string> = { country, postcode };
    if (house_number !== undefined) params['house_number'] = house_number;
    return this.apiManager.get('/postcode-lookup', { params });
  }
}
