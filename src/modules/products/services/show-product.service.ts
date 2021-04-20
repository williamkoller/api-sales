import { ProductRepository } from '@modules/products/typeorm/repositories/products.repository';
import AppError from '@shared/errors/AppError';
import Product from '@modules/products/typeorm/entities/product';
import { StatusCodes } from 'http-status-codes';
import { ShowProductType } from '@modules/products/@types/show-product/show-product.type';

export class ShowProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute({ id }: ShowProductType): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found.', StatusCodes.NOT_FOUND);
    }
    return product;
  }
}
