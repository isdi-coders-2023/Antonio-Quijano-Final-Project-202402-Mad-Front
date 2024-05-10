import { type Album } from './albums.model';

export type Purchase = {
  id: string;
  userId: string;
  date: Date;
  isPaid: boolean;
  albums: Album[];
  totalPrice: string;
};

export type PurchaseCreateDto = {
  userId: string;
  date: Date;
  isPaid: boolean;
  totalPrice: string;
};
