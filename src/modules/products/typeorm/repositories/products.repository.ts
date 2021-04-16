import { EntityRepository, Repository } from 'typeorm';
import Product from '@modules/products/typeorm/entities/product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    return await this.findOne({ where: { name } });
  }
}
