import { Image } from './image';

export type Product = {
  id: string;
  image: Image;
  name: string;
  category: string;
  price: number;
};
