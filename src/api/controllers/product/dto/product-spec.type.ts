export interface ProductSpecRequest {
  spec_name: string;
  spec_value: string;
  spec_unit?: string | null;
}

export interface ProductSpecUpdateRequest {
  spec_name?: string;
  spec_value?: string;
  spec_unit?: string | null;
}

export interface ProductSpecResponse {
  id: string;
  product_id: string;
  spec_name: string;
  spec_value: string;
  spec_unit: string | null;
}
