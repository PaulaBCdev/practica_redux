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
  sale?: boolean;
  price?: [number, number];
  tags?: string[];
}
