import ProductsRepository from '@modules/products/typeorm/repositories/products.repository';
import AppError from '@shared/errors/AppError';
import Product from '@modules/products/typeorm/entities/product';
import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';

export class ListProductService {
  async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const products = await productsRepository.find();
    if (!products?.length) {
      throw new AppError('No record found.', StatusCodes.NOT_FOUND);
    }
    return products;
  }
}
