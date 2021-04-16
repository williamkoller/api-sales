import Product from '@modules/products/typeorm/entities/product';
import { ICreateProduct } from '@modules/products/@types/create-product/create-product-interface';
import { ProductRepository } from '@modules/products/typeorm/repositories/products.repository';
import AppError from '@shared/errors/AppError';

export class CreateProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const productExists = await this.productRepository.findByName(name);
    if (productExists) {
      throw new AppError('There is already one product with this name');
    }
    const product = this.productRepository.create({ name, price, quantity });
    return await this.productRepository.save(product);
  }
}
