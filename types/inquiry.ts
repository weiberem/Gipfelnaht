import type { ServiceOption } from './partner';

export interface Inquiry {
  partnerSlug: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  item: {
    category: string;
    description: string;
  };
  preferredService: ServiceOption;
  preferredDate?: string;
  hasPhotos: boolean;
  acceptPrivacy: boolean;
  createdAt: string;
}

export interface PartnerApplication {
  name: string;
  email: string;
  phone?: string;
  location: string;
  experience: string;
  motivation: string;
  portfolioUrl?: string;
  acceptPrivacy: boolean;
  createdAt: string;
}
