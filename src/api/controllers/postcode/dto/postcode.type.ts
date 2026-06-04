export interface PostcodeLookupParams {
  country: string;
  postcode: string;
  house_number?: string;
}

export interface PostcodeResponse {
  street: string;
  house_number: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
}
