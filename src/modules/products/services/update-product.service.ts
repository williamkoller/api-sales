import ProductsRepository from '@modules/products/typeorm/repositories/products.repository';
import AppError from '@shared/errors/AppError';
import Product from '@modules/products/typeorm/entities/product';
import { StatusCodes } from 'http-status-codes';
import { UpdateProductType } from '@modules/products/@types/update-product/update-product.type';
import { getCustomRepository } from 'typeorm';

export class UpdateProductService {
  async execute({
    id,
    name,
    price,
    quantity,
  }: UpdateProductType): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found.', StatusCodes.NOT_FOUND);
    }
    const productExists = await productsRepository.findByName(name);
    if (productExists) {
      throw new AppError(
        'There is already one product with this name',
        StatusCodes.CONFLICT,
      );
    }
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);
    return product;
  }
}
