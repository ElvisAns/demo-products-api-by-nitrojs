import { prismaProductRepository } from '../../utils/repositories/prismaProductRepository';
import productServiceDB from '../../utils/productService';

const productService = new productServiceDB(new prismaProductRepository());

export default eventHandler(async(event) => {
    setHeader(event, 'X-made-by', 'Ansima');
    const allProducts = await productService.getAllProducts();
    await productService.disconnect();
    return allProducts;
});