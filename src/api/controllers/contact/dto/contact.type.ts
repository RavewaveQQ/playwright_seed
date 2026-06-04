import type { UserResponse } from '@src/api/controllers/user/dto/user.type';
import type { Paginated } from '@src/types/common/api-response.type';

export type ContactStatus = 'NEW' | 'ON_HOLD' | 'IN_PROGRESS' | 'RESOLVED';

export interface ContactRequest {
  subject: string;
  message: string;
  name?: string;
  email?: string;
}

export interface ContactResponse {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  created_at: string;
}

export interface ContactResponseAuthenticated extends ContactResponse {
  user_id: string;
}

export interface ContactReplyResponse {
  id: string;
  message: string;
  created_at: string;
  user: UserResponse;
}

export interface ContactResponseFull extends ContactResponseAuthenticated {
  user: UserResponse;
  replies: ContactReplyResponse[];
}

export type PaginatedContactResponse = Paginated<ContactResponse | ContactResponseAuthenticated>;

export interface ContactStatusRequest {
  status: ContactStatus;
}
