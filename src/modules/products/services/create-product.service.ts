import Product from '@modules/products/typeorm/entities/product';
import { CreateProductType } from '@modules/products/@types/create-product/create-product.type';
import ProductsRepository from '@modules/products/typeorm/repositories/products.repository';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';

export class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
  }: CreateProductType): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const productExists = await productsRepository.findByName(name);
    if (productExists) {
      throw new AppError(
        'There is already one product with this name',
        StatusCodes.CONFLICT,
      );
    }
    const product = productsRepository.create({ name, price, quantity });
    await productsRepository.save(product);
    return product;
  }
}
