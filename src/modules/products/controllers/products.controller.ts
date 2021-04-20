import { Request, Response } from 'express';
import { ListProductService } from '@modules/products/services/list-product.service';
import Product from '@modules/products/typeorm/entities/product';
import { ShowProductService } from '@modules/products/services/show-product.service';
import { CreateProductService } from '../services/create-product.service';
import { StatusCodes } from 'http-status-codes';
import { UpdateProductService } from '../services/update-product.service';
import { MessageType } from '../@types/message/message.type';
import { DeleteProductService } from '../services/delete-product.service';

export default class ProductsController {
  public async index(
    request: Request,
    response: Response,
  ): Promise<Response<Product[]>> {
    const listProducts = new ListProductService();
    const products = await listProducts.execute();
    return response.status(StatusCodes.OK).json(products);
  }

  public async show(
    request: Request,
    response: Response,
  ): Promise<Response<Product>> {
    const { id } = request.params;
    const showProduct = new ShowProductService();
    const product = await showProduct.execute({ id });
    return response.status(StatusCodes.OK).json(product);
  }

  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<Product>> {
    const { name, price, quantity } = request.body;
    const createProduct = new CreateProductService();
    const product = await createProduct.execute({ name, price, quantity });
    return response.status(StatusCodes.CREATED).json(product);
  }

  public async update(
    request: Request,
    response: Response,
  ): Promise<Response<Product>> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;
    const updateProduct = new UpdateProductService();
    const product = await updateProduct.execute({ id, name, price, quantity });
    return response.status(StatusCodes.OK).json(product);
  }

  public async delete(
    request: Request,
    response: Response,
  ): Promise<Response<MessageType>> {
    const { id } = request.params;
    const deleteProduct = new DeleteProductService();
    const product = await deleteProduct.execute({ id });
    return response.status(StatusCodes.OK).json(product);
  }
}
