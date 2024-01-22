import { prismaProductRepository } from '../../utils/repositories/prismaProductRepository';
import productServiceDB from '../../utils/productService';

const productService = new productServiceDB(new prismaProductRepository());

export default eventHandler(async(event) => {
    setHeader(event, 'X-made-by', 'Ansima');
    const productId = Number(getRouterParam(event, 'productId'));
    try {
        if (isNaN(productId))
            throw new Error('Provided product ID should be a number');
        const product = await productService.getProductById(productId);
        if (!product) throw new Error("Product don't exist");
        return product;
    } catch (error) {
        setResponseStatus(event, 400);
        return {
            error: error.message,
        };
    } finally {
        productService.disconnect();
    }
});