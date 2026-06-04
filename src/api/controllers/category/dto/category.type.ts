export interface CategoryRequest {
  name: string;
  slug: string;
  parent_id?: string | null;
}

export interface CategoryResponse {
  id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  sub_categories?: CategoryResponse[];
}

export interface CategoryTreeResponse {
  id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  sub_categories: CategoryResponse[];
}
