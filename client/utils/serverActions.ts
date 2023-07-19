'use server';

import productService from '@/services/productService';
import { ProductType } from '@/types/product';

export async function searchingSuggest(params?: any): Promise<ProductType[]> {
  'use server';
  return await productService.getAll(params);
}
