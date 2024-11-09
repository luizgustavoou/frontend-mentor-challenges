import { Image } from './image';

export interface Product {
  id: string;
  image: Image;
  name: string;
  category: string;
  price: number;
};


export interface ProductAmount extends Product {
  amount: number;
}
