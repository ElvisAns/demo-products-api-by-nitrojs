class productService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async getAllProducts() {
        return this.productRepository.getAllProducts();
    }

    async getProductById(productId) {
        return this.productRepository.getProductById(productId)
    }

    async createProduct(productData) {
        return this.productRepository.createProduct(productData);
    }

    async updateProduct(productId, updatedProductData) {
        return this.productRepository.updateProduct(productId, updatedProductData);
    }

    async deleteProduct(productId) {
        return this.productRepository.deleteProduct(productId);
    }

    async disconnect() {
        this.productRepository.disconnect();
    }
}
export default productService;