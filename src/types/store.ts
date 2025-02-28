interface Category {
  name: string;
}

interface City {
  name: string;
}

interface State {
  name: string;
}

interface StoreAddress {
  addressLine1: string;
  addressLine2: string;
  pincode: number;
  googleMapLink: string;
  city: City;
  state: State;
}

interface Service {
  name: string;
}

interface StoreService {
  id: number;
  storeId: number;
  serviceId: number;
  index: number;
  service: Service;
}

interface SocialMedia {
  name: string;
  icon: string;
}

interface StoreSocialMedia {
  id: number;
  SocialMediaId: number;
  storeId: number;
  link: string;
  index: number;
  socialMedia: SocialMedia;
}

export interface StorePhoto {
  path: string;
  index: number;
}

export interface IStore {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  logo: string;
  number: string;
  whatsappNumber: string;
  email: string;
  categoryId: number;
  bio: string;
  feedbackLink: string;
  upiId: string;
  storeOwnerUserId: number;
  isActive: boolean;
  isOpen: boolean;
  createdAt: string;
  updatedAt: string;
  category: Category;
  storeAddresses: StoreAddress;
  storeServices: StoreService[];
  storeSocialMedias: StoreSocialMedia[];
  storePhotos: StorePhoto[];
}

export interface IStoreCoordinates {
  id: number;
  latitude: number;
  longitude: number;
}

export interface SaveStorePayload {
  storeId: number;
}
export interface SaveStoreResponse {
  message: string;
}

export type SavedStore = {
  id: number;
  userId: number;
  storeId: number;
  createdAt: string; // ISO date string
  store: {
    id: number;
    name: string;
    tagline: string;
    slug: string;
    logo: string;
    storeAddresses: {
      addressLine1: string;
      addressLine2: string;
      city: {
        name: string;
      };
    };
    category: {
      name: string;
    };
  };
};
