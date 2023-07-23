'use server';

import authService from '@/services/authService';
import productService from '@/services/productService';
import { ProductType } from '@/types/product';

export async function searchingSuggest(params?: any): Promise<ProductType[]> {
  'use server';
  return await productService.getAll(params);
}

export async function getAllProduct(params?: any): Promise<ProductType[]> {
  'use server';
  return await productService.getAll(params);
}
