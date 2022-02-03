/* eslint-env node */
/* eslint-disable no-console */

"use strict";
/**
 * Tokenize the given string
 *
 */
const config = require("./config");

class Token {
	constructor(type, value) {
		this.type = type;
		this.value = value;
	}
	precedence() {
		return config.prec[this.value];
	}
	associativity() {
		return config.assoc[this.value];
	}
}

/**
 * Check for Logical Operators
 * @param {String} input
 * 
 * @return {Boolean}
 */
function isLogicalOperator(input) {
	return config.logicalOperators.test(input);
}

/**
 * check for Comparision Operators
 * @param {String} input
 * 
 * @return {Boolean}
 */
function isComparisionOperator(input) {
	return config.comparisionOperators.test(input);
}

/**
 * Return the array of tokens
 * @param {String} str
 * 
 * @return {Array} array of tokens
 */
function tokenize(str) {
	str = str.split("");

	let tokenList = [];
	let letterBuffer = [];

	str.forEach(function (char) {
		switch (char) {
			// if ( or space occurs and letterBuffer is not empty, then empty it as an appropriate token
			case " ":
				if (letterBuffer.length) {
					emptyLetterBuffer();
				}
				break;
			case "(":
				if (letterBuffer.length) {
					emptyLetterBuffer();
				}
				tokenList.push(new Token("Left Parenthesis", char));
				break;
				// empty letterBuffer as value and push ) as a token
			case ")":
				emptyLetterBufferAsValue();
				tokenList.push(new Token("Right Parenthesis", char));
				break;
				// ignore empty strings
			case "":
				break;
				// fill letterBuffer till space character
			default:
				letterBuffer.push(char);
		}
	});

	// after looping over all of the chars, letterBuffer is not empty
	// empty it as value
	if (letterBuffer.length) {
		emptyLetterBufferAsValue();
	}
	return serialize(tokenList);

	/**
	 * If letterBuffer is not empty, create a valid token and empty it
	 * @param {} None
	 * 
	 * @return {} None
	 */
	function emptyLetterBuffer() {
		let word = letterBuffer.join("");
		letterBuffer = [];

		if (isLogicalOperator(word)) {
			tokenList.push(new Token("logOp", word));
		} else if (isComparisionOperator(word)) {
			tokenList.push(new Token("compOp", word));
		} else {
			if (!tokenList.length) {
				tokenList.push(new Token("key", word));
				return;
			}
			let lastElement = tokenList[tokenList.length - 1].type;
			// if word is after logOp or left paranthesis, then it is a key else is a value
			if (lastElement === "logOp" || lastElement === "Left Parenthesis") {
				tokenList.push(new Token("key", word));
			} else {
				tokenList.push(new Token("value", word));
			}
		}
	}

	/**
	 * If letterBuffer is not empty, create a value token and empty it
	 * @param {} None
	 * 
	 * @return {} None
	 */
	function emptyLetterBufferAsValue() {
		if (!letterBuffer.length) return;

		tokenList.push(new Token("value", letterBuffer.join("")));
		letterBuffer = [];
	}
}

/**
 * If values are separated by space then it combines them and forms a single value for the key
 * @param {Array} tokens
 * 
 * @return {Array} Modified tokens
 */
function serialize(tokens) {
	let i = 0;
	let newTokens = [];

	while (i < tokens.length) {
		if (tokens[i].type !== "value") {
			newTokens.push(tokens[i]);
			i++;
			continue;
		}
		let allValues = [tokens[i].value];
		let j = i + 1;
		while (j < tokens.length && tokens[j].type === "value") {
			allValues.push(tokens[j].value);
			j++;
		}
		newTokens.push(new Token("value", allValues.join(" ")));
		i = j;
	}
	return newTokens;
}

/**
 * Exports tokenizer function
 */
module.exports = tokenize;