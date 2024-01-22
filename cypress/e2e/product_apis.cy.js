describe('Product API Tests', () => {
    let createdProductId;

    it('POST /api/products/create - Create a new product', () => {
        const productData = {
            name: 'Test Product',
            price: 29.99,
            quantity: 10,
        };

        cy.request('POST', '/api/products/create', productData)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property('id');
                createdProductId = response.body.id;
            });
    });

    it('GET /api/products - Get all products and verify the created one is included', () => {
        cy.request('GET', '/api/products')
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array');
                expect(response.body.some(product => product.id === createdProductId)).to.be.true;
            });
    });

    it('PUT /api/products/:id - Update the previously created product', () => {
        const updatedProductData = {
            name: 'Updated Product',
            price: 39.99,
            quantity: 15,
        };

        cy.request('PUT', `/api/products/${createdProductId}`, updatedProductData)
            .then((response) => {
                expect(response.status).to.equal(200);
            });
    });

    it('GET /api/products/:id - Get details of the updated product', () => {
        cy.request('GET', `/api/products/${createdProductId}`)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.name).to.equal('Updated Product');
                expect(response.body.price).to.equal("39.99");
                expect(response.body.quantity).to.equal(15);
            });
    });

    it('DELETE /api/products/:id - Delete the updated product', () => {
        cy.request('DELETE', `/api/products/${createdProductId}`)
            .then((response) => {
                expect(response.status).to.equal(200);
            });
    });

    it('GET /api/products - Verify the deleted product is not included', () => {
        cy.request('GET', '/api/products')
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.some(product => product.id === createdProductId)).to.be.false;
            });
    });
});