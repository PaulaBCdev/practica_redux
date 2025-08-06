export interface AdvertType {
  id: string;
  createdAt: string;
  name: string;
  sale: boolean;
  price: number;
  tags: string[];
  photo: string | null;
}

export interface UploadAdvertType {
  name: string;
  sale: boolean;
  price: number;
  tags: string[];
  photo?: string;
}

export interface FiltersType {
  name?: string;
  sale?: boolean | null;
  price?: [number, number] | null;
  tags?: string[];
}

export type UIFiltersType = FiltersType & {
  maxPrice: number | null;
};
