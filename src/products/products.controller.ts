import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    return await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
  }

  @Get()
  async getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(Number(prodId));
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    await this.productsService.updateProduct(
      Number(prodId),
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(Number(prodId));
    return null;
  }
}
