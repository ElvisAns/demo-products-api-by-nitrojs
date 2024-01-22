import { prismaProductRepository } from '../../utils/repositories/prismaProductRepository';
import productServiceDB from '../../utils/productService';

const productService = new productServiceDB(new prismaProductRepository());

export default eventHandler(async(event) => {
    setHeader(event, 'X-made-by', 'Ansima');
    const reqBody = await readBody(event);
    try {
        const product = await productService.createProduct(reqBody); //we will rely on prisma to valid our request
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