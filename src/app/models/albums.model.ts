import { Purchase } from './purchase.model';
import { User } from './users.model';

export type Album = {
  id: string;
  artist: string;
  album: string;
  stock: number;
  duration: string;
  cover: string;
  price: number;
  genre:
    | 'rock'
    | 'pop'
    | 'hipHop'
    | 'randB'
    | 'electronic'
    | 'metal'
    | 'jazz'
    | 'latin';
  recordCompany: string;
  producer: string;
  moreInfo: string;
  fans: User[];
  sales: Purchase[];
};

export type AlbumCreateDto = {
  id: string;
  artist: string;
  album: string;
  stock: number;
  duration: string;
  cover: string;
  price: number;
  genre:
    | 'rock'
    | 'pop'
    | 'hipHop'
    | 'randB'
    | 'electronic'
    | 'metal'
    | 'jazz'
    | 'latin';
  recordCompany: string;
  producer: string;
  moreInfo: string;
};
