import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async insertProduct(
    title: string,
    description: string,
    price: number,
  ): Promise<Product> {
    const newProduct = this.productsRepository.create({
      title,
      description,
      price,
    });
    await this.productsRepository.save(newProduct);
    return newProduct;
  }

  async getProducts(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async getSingleProduct(productId: number): Promise<Product> {
    return this.productsRepository.findOneOrFail({ where: { id: productId } });
  }

  async updateProduct(
    id: number,
    title: string,
    description: string,
    price: number,
  ): Promise<void> {
    await this.productsRepository.update(id, { title, description, price });
  }

  async deleteProduct(productId: number): Promise<void> {
    await this.productsRepository.delete(productId);
  }
}
