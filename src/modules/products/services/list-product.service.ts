import { ProductRepository } from '@modules/products/typeorm/repositories/products.repository';
import AppError from '@shared/errors/AppError';
import Product from '@modules/products/typeorm/entities/product';
import { StatusCodes } from 'http-status-codes';

export class ListProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute(): Promise<Product[]> {
    const products = await this.productRepository.find();
    if (!products?.length) {
      throw new AppError('No record found.', StatusCodes.NOT_FOUND);
    }
    return products;
  }
}
