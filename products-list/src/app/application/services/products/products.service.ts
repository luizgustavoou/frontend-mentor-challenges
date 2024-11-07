import { HttpClient } from '@angular/common/http';
import { Product } from '../../../domain/entities/products';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';

export abstract class ProductsService {
  abstract getProducts(): Promise<Product[]>;
}

@Injectable()
export class ProductsServiceImpl implements ProductsService {
  constructor(private httpClient: HttpClient) {}

  public async getProducts(): Promise<Product[]> {
    const products$ = this.httpClient.get<Product[]>('/assets/data.json');

    return firstValueFrom(products$);
  }
}
