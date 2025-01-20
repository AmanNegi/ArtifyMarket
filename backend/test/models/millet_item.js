// millet.js

const chai = require('chai');

const { validateMilletItem } = require('../../src/models/millet_item');

describe('test millet-item model', () => {
    it('should throw an error when listedBy is missing', () => {
        const item = {
            name: 'Test Millet',
            description: 'A test description.',
            images: ['image1.jpg', 'image2.jpg'],
            price: 10
        };
        const result = validateMilletItem(item);
        chai.expect(result.error.details[0].message).to.be.equal('"listedBy" is required');
    });

    it('should throw an error when name is missing', () => {
        const item = {
            listedBy: '60c72b2f5f1b2c001f1f1f1f',
            description: 'A test description.',
            images: ['image1.jpg', 'image2.jpg'],
            price: 10
        };

        const result = validateMilletItem(item);
        chai.expect(result.error.details[0].message).to.be.equal('"name" is required');
    });

    it('should throw an error when description is missing', () => {
        const item = {
            listedBy: '60c72b2f5f1b2c001f1f1f1f',
            name: 'Test Millet',
            images: ['image1.jpg', 'image2.jpg'],
            price: 10
        };

        const result = validateMilletItem(item);
        chai.expect(result.error.details[0].message).to.be.equal('"description" is required');
    });

    it('should throw an error when images are missing', () => {
        const item = {
            listedBy: '60c72b2f5f1b2c001f1f1f1f',
            name: 'Test Millet',
            description: 'A test description.',
            price: 10
        };

        const result = validateMilletItem(item);
        chai.expect(result.error.details[0].message).to.be.equal('"images" is required');
    });

    it('should throw an error when price is missing', () => {
        const item = {
            listedBy: '60c72b2f5f1b2c001f1f1f1f',
            name: 'Test Millet',
            description: 'A test description.',
            images: ['image1.jpg', 'image2.jpg']
        };

        const result = validateMilletItem(item);
        chai.expect(result.error.details[0].message).to.be.equal('"price" is required');
    });

    it('should pass when all fields are valid', () => {
        const item = {
            listedBy: '60c72b2f5f1b2c001f1f1f1f',
            name: 'Test Millet',
            description: 'A test description.',
            images: ['image1.jpg', 'image2.jpg'],
            price: 10
        };

        const result = validateMilletItem(item);
        chai.expect(result.error).to.be.equal(undefined);
    });

    it('should throw an error when price is negative', () => {
        const item = {
            listedBy: '60c72b2f5f1b2c001f1f1f1f',
            name: 'Test Millet',
            description: 'A test description.',
            images: ['image1.jpg', 'image2.jpg'],
            price: -10
        };

        const result = validateMilletItem(item);
        chai.expect(result.error.details[0].message).to.be.equal('"price" must be greater than or equal to 0');
    });
});
