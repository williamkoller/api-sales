import Product from '@modules/products/typeorm/entities/product';
import { CreateProductType } from '@modules/products/@types/create-product/create-product.type';
import { ProductRepository } from '@modules/products/typeorm/repositories/products.repository';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';

export class CreateProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  public async execute({
    name,
    price,
    quantity,
  }: CreateProductType): Promise<Product> {
    const productExists = await this.productRepository.findByName(name);
    if (productExists) {
      throw new AppError(
        'There is already one product with this name',
        StatusCodes.CONFLICT,
      );
    }
    const product = this.productRepository.create({ name, price, quantity });
    return await this.productRepository.save(product);
  }
}
