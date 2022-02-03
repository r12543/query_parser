/* eslint-env node */
/* eslint-disable no-console */

'use strict';
/**
 * This test validates the tokenizer functions
 */

/**
 * Paths and constants
 */
const TOKENIZER_PATH = '../src/tokenizer';
const FIXTURES_PATH = './fixtures';

/**
 * Module dependencies
 */
const chai = require('chai');
const expect = chai.expect;

const tokenizer = require(TOKENIZER_PATH);
const fixtures = require(FIXTURES_PATH);

const CHECK_POSITIVE_TEST_CASES = true;
const CHECK_NEGATIVE_TEST_CASES = true;

/**
 * tests Tokenizer functions
 */
describe('Tokenizer', () => {
    // Positive test cases
    if (CHECK_POSITIVE_TEST_CASES) {
        for (let query of fixtures.QUERY_STRINGS) {
            it('should tokenize ' + query.query, (done) => {
                // Call the method
                let output = tokenizer(query.query);
                let numParentheses = 0;
                for (let element of output) {
                    if (element.type === "Left Parenthesis" || element.type === "Right Parenthesis") {
                        numParentheses++;
                    }
                }
                // Assert
                expect(output).to.be.an('array');
                expect(output.length).to.equal(query.tokens_length);
                expect(numParentheses).to.equal(query.num_parentheses);
    
                done();
            });
        }
    }
});