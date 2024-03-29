import ProductsRepository  from '@modules/products/typeorm/repositories/products.repository';
import AppError from '@shared/errors/AppError';
import Product from '@modules/products/typeorm/entities/product';
import { StatusCodes } from 'http-status-codes';
import { ShowProductType } from '@modules/products/@types/show-product/show-product.type';
import { getCustomRepository } from 'typeorm';

export class ShowProductService {
  async execute({ id }: ShowProductType): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found.', StatusCodes.NOT_FOUND);
    }
    return product;
  }
}
