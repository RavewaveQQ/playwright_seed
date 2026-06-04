import { ApiParsedResponse } from '@src/types/common/api-manager.type';
import { ImageResponse } from './dto/image.type';
import { BaseController } from '../base.controller';

export class ImageController extends BaseController {
  async getAll(): Promise<ApiParsedResponse<ImageResponse[]>> {
    return this.apiManager.get('/images');
  }
}
