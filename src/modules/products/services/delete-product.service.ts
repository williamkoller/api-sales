import { ProductRepository } from '@modules/products/typeorm/repositories/products.repository';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { DeleteProductType } from '@modules/products/@types/delete-product/delete-product.type';
import { MessageType } from '@modules/products/@types/message/message.type';
import { getCustomRepository } from 'typeorm';

export class DeleteProductService {
  async execute({ id }: DeleteProductType): Promise<MessageType> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found.', StatusCodes.NOT_FOUND);
    }

    await productRepository.remove(product);
    return {
      message: 'This product was deleted with successfully.',
    };
  }
}
