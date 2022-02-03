/* eslint-env node */
/* eslint-disable no-console */

"use strict";
/**
 * Parse the tokens and forms Abstract Syntax Tree (AST)
 */
const tokenize = require('./tokenizer');
const _ = require('lodash');

class ASTNode {
    constructor(token, leftChildNode, rightChildNode) {
        this.token = token.type === "logOp" ? token.value : token;
        this.leftChildNode = leftChildNode;
        this.rightChildNode = rightChildNode;
    }
}

class Clause {
    constructor(key, value, compOp) {
        this.key = key;
        this.value = value;
        this.compOp = compOp;
    }
}

/**
 * return the first element of stack
 * @param
 *
 * @return first element of Array
 */
Array.prototype.peek = function () {
    return this.slice(-1)[0];
};

/**
 * Return the ast class object
 * @param {String} inp
 *
 * @return Abstratc syntax tree class
 */
function parse(inp) {
    /**
     * Additional function to add a node in AST
     * @param {String} operatorToken
     *
     * @return
     */
    Array.prototype.addNode = function (operatorToken) {
        let rightChildNode = this.pop();
        let leftChildNode = this.pop();
        if (!rightChildNode || !leftChildNode) errors.push({
            'value': inp,
            'message': "Missing Clause"
        });
        this.push(
            new ASTNode(operatorToken, leftChildNode, rightChildNode)
        );
    }

    var outStack = []; // Stack for clauses
    var opStack = []; // stack for operators and parentheses
    var clauseStack = []; // stack for clause
    var errors = []; // error stack

    var tokens = tokenize(inp);
    tokens.forEach(function (token) {
        switch (token.type) {
            // If the token is a key/compOp, then push it to the output stack
            case "key":
            case "compOp":
                clauseStack.push(token);
                break;
            // If the token is a value, then push it to the output stack and 
            // pop the key, value, compOp andform a clause and push it to outStack
            case "value":
                let value = token;
                let compOp = clauseStack.pop();
                let key = clauseStack.pop();
                if (!key || !compOp || !value) errors.push({
                    'value': inp,
                    'message': "Invalid clause"
                });
                let clause = new Clause(key, value, compOp);
                outStack.push(new ASTNode(clause, null, null));
                break;
            // If the token is an logical operator(o1), then:
            case "logOp":
                // while there is an logical operator(o2), at the top of the operator stack and either
                while (opStack.peek() && (opStack.peek().type === "logOp") &&
                    // o1 is left-associative and its precedence is less than or equal to that of o2, or
                    ((token.associativity() === "left" && token.precedence() <= opStack.peek().precedence()) ||
                        // o1 is right associative, and has precedence less than that of o2,
                        (token.associativity() === "right" && token.precedence() < opStack.peek().precedence()))) {
                    outStack.addNode(opStack.pop());
                }
                // at the end of iteration push o1 onto the operator stack
                opStack.push(token);
                break;
            // If the token is a left parenthesis (i.e. "("), then push it onto the opStack.
            case "Left Parenthesis":
                opStack.push(token);
                break;
            // If the token is a right parenthesis (i.e. ")"):
            case "Right Parenthesis":
                // Until the token at the top of the stack is a left parenthesis, pop operators off the stack onto the output queue.
                while (opStack.peek() && opStack.peek().type !== "Left Parenthesis") {
                    outStack.addNode(opStack.pop());
                }
                if (!opStack.length) errors.push({
                    'value': inp,
                    'message': "Unbalanced parentheses"
                });
                // Pop the left parenthesis from the stack, but not onto the output queue.
                opStack.pop();
                break;
        }
    });

    if (opStack.peek() &&
        (opStack.peek().type === "Left Parenthesis" ||
            opStack.peek().type === "Right Parenthesis")) {
        errors.push({
            'value': inp,
            'message': "Unbalanced parentheses"
        });
    } else {
        while (opStack.peek()) {
            outStack.addNode(opStack.pop());
        }
    }
    if (clauseStack.length) {
        let query = "";
        while (clauseStack.length) {
            query = query + clauseStack.shift().value + " ";
        }
        errors.push({
            'value': query,
            'message': "Invalid clause"
        });
    }
    if (!outStack.length && !errors.length) {
        errors.push({
            'value': inp,
            'message': "Empty query"
        });
    }
    if (errors.length) {
        errors = _.uniqBy(errors, 'value');
        return {
            "error": {
                "message": "Invalid query",
                "details": errors
            }
        };
    }

    return {
        'data': outStack.pop()
    };
}

module.exports = parse;