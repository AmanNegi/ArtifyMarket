//user.js

const chai = require('chai');
const { validate, validateLogin, validateSignUp } = require('../../src/models/user'); 

describe('test user model', () => {
    describe('User Validation', () => {
        it('should throw an error when name is missing', () => {
            const user = {
                email: 'test@example.com',
                phone: '1234567890',
                password: 'password123',
                userType: 'customer',
                location: {
                    type: 'Point',
                    coordinates: [1.234, 5.678]
                }
            };

            const result = validate(user);
            chai.expect(result.error.details[0].message).to.be.equal('"name" is required');
        });

        it('should throw an error when email is missing', () => {
            const user = {
                name: 'Test User',
                phone: '1234567890',
                password: 'password123',
                userType: 'customer',
                location: {
                    type: 'Point',
                    coordinates: [1.234, 5.678]
                }
            };

            const result = validate(user);
            chai.expect(result.error.details[0].message).to.be.equal('"email" is required');
        });

        it('should throw an error when password is missing', () => {
            const user = {
                name: 'Test User',
                email: 'test@example.com',
                phone: '1234567890',
                userType: 'customer',
                location: {
                    type: 'Point',
                    coordinates: [1.234, 5.678]
                }
            };

            const result = validate(user);
            chai.expect(result.error.details[0].message).to.be.equal('"password" is required');
        });

        it('should throw an error when phone is missing', () => {
            const user = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                userType: 'customer',
                location: {
                    type: 'Point',
                    coordinates: [1.234, 5.678]
                }
            };

            const result = validate(user);
            chai.expect(result.error.details[0].message).to.be.equal('"phone" is required');
        });

        it('should throw an error when location is missing', () => {
            const user = {
                name: 'Test User',
                email: 'test@example.com',
                phone: '1234567890',
                password: 'password123',
                userType: 'customer',
            };

            const result = validate(user);
            chai.expect(result.error.details[0].message).to.be.equal('"location" is required');
        });

        it('should throw an error when location coordinates are missing', () => {
            const user = {
                name: 'Test User',
                email: 'test@example.com',
                phone: '1234567890',
                password: 'password123',
                userType: 'customer',
                location: {
                    type: 'Point'
                }
            };

            const result = validate(user);
            chai.expect(result.error.details[0].message).to.be.equal('"location.coordinates" is required');
        });

        it('should pass when all fields are valid', () => {
            const user = {
                name: 'Test User',
                email: 'test@example.com',
                phone: '1234567890',
                password: 'password123',
                userType: 'customer',
                location: {
                    type: 'Point',
                    coordinates: [1.234, 5.678]
                }
            };

            const result = validate(user);
            chai.expect(result.error).to.be.equal(undefined);
        });
    });

    describe('Login Validation', () => {
        it('should throw an error when email is missing', () => {
            const loginData = {
                password: 'password123'
            };

            const result = validateLogin(loginData);
            chai.expect(result.error.details[0].message).to.be.equal('"email" is required');
        });

        it('should throw an error when password is missing', () => {
            const loginData = {
                email: 'test@example.com'
            };

            const result = validateLogin(loginData);
            chai.expect(result.error.details[0].message).to.be.equal('"password" is required');
        });
    });

    describe('Sign Up Validation', () => {
        it('should throw an error when userType is missing', () => {
            const signUpData = {
                name: 'Test User',
                email: 'test@example.com',
                phone: '1234567890',
                password: 'password123',
                location: {
                    type: 'Point',
                    coordinates: [1.234, 5.678]
                }
            };

            const result = validateSignUp(signUpData);
            chai.expect(result.error.details[0].message).to.be.equal('"userType" is required');
        });
    });
});
