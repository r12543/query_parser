/* eslint-env node */
/* eslint-disable no-console */

'use strict';
/**
 * This test validates the serializer functions
 */

/**
 * Paths and constants
 */
const PARSER_PATH = '../src/parser';
const FIXTURES_PATH = './fixtures';

/**
 * Module dependencies
 */
const chai = require('chai');
const expect = chai.expect;

const parser = require(PARSER_PATH);
const fixtures = require(FIXTURES_PATH);

const CHECK_POSITIVE_TEST_CASES = true;
const CHECK_NEGATIVE_TEST_CASES = true;

/**
 * tests Parser functions
 */
describe('Parser', () => {
    // Positive test cases
    if (CHECK_POSITIVE_TEST_CASES) {
        describe('Positive test cases', () => {
            for (let query of fixtures.QUERY_STRINGS) {
                it('should parse ' + query.query, (done) => {
                    // Call the method
                    let output = parser(query.query);
                    // console.log(JSON.stringify(output));

                    // Assert
                    expect(output).to.be.an('object');
                    expect(output).to.have.property('data');
                    expect(output.data).to.not.equal(undefined);
                    expect(output.data).to.have.property('token');

                    done();
                });
            }
        });
    }

    // Negative test cases
    if (CHECK_NEGATIVE_TEST_CASES) {
        describe('Negative test cases', () => {
            for (let query of fixtures.INVALID_QUERIES) {
                it('should throw Invalid query error for ' + query, (done) => {
                    // Call the method
                    let output = parser(query);

                    // Assert
                    expect(output).to.be.an('object');
                    expect(output).to.have.property('error');
                    expect(output.error).to.have.property('message').to.equal('Invalid query');

                    done();
                });
            }
        });
    }
});