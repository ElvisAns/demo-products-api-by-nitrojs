import { PrismaClient } from "@prisma/client";
import { productInterface } from "../productInterface";

export class prismaProductRepository extends productInterface {
    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    async getAllProducts() {
        return this.prisma.product.findMany();
    }

    async getProductById(productId) {
        return this.prisma.product.findUnique({
            where: {
                id: productId,
            },
        });
    }

    async createProduct(productData) {
        return this.prisma.product.create({
            data: productData,
        });
    }

    async updateProduct(productId, updatedProductData) {
        return this.prisma.product.update({
            where: {
                id: productId,
            },
            data: updatedProductData,
        });
    }

    async deleteProduct(productId) {
        return this.prisma.product.delete({
            where: {
                id: productId,
            },
        });
    }

    async disconnect() {
        await this.prisma.$disconnect();
    }
}