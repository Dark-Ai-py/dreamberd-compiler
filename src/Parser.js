const { parse } = require("vue/compiler-sfc");
const {
	BinaryExpression,
	VariableAssignment,
	VariableAccess,
	ParenthesisedExpression,
	VariableModification,
	Function,
	Float,
} = require("./expressionTypes");

class Parser {
	#tokens;
	#position;
	constructor(tokens) {
		this.#tokens = tokens;
		this.#position = 0;
	}
	//returns the current token
	#currentToken() {
		return this.#peek(0);
	}
	//lets us look ahead of the current token Ex peek(1) will return the next token but not switch the position
	#peek(offset) {
		let index = this.#position + offset;
		if (index >= this.#tokens.length) {
			return this.#tokens[this.#tokens.length - 1];
		}
		return this.#tokens[index];
	}
	//matches a specific token with the current token
	#match(type) {
		if (this.#currentToken().tokenType === type) {
			return this.#nextToken();
		}
		console.log(
			`Parser error: bad token type: ${this.#currentToken().tokenType}, expected ${type}`,
		);
	}
	//returns current token then increases position by 1
	#nextToken(change = 1) {
		let current = this.#currentToken();
		this.#position += change;
		return current;
	}

	#parseVariableAssignment() {
		if (this.#currentToken().tokenType === "assignToken") {
			throw new Error("How did this happen?");
		} else {
			return new VariableAssignment(
				this.#nextToken().tokenType,
				this.#nextToken(2).tokenValue,
				this.#parseBinaryExpression(),
			);
		}
	}
	#parseBinaryExpression() {
		if (this.#peek(1).tokenClass == "lineEndClass") {
			return new Float(this.#nextToken().tokenValue);
		} else {
		}
		let left = this.#nextToken();
		let operator = this.#nextToken();
		let right = this.#parseBinaryExpression();
		return new BinaryExpression(left, operator, right);
	}

	#parseLineEnd() {
		if (this.#currentToken().tokenType === "questionMarkToken") {
			return "debug";
		} else {
			return "normal";
		}
	}

	parse() {
		var ast;
		try {
			if (this.#currentToken().tokenClass === "assignVariableClass") {
				ast = this.#parseVariableAssignment();
			} else if (this.#currentToken().tokenClass === "binaryClass") {
				ast = this.#parseBinaryExpression();
			}
		} catch (error) {
			console.error(`Parser error: ${error}`);
		}
		return [ast, this.#parseLineEnd()];
	}
}

exports.Parser = Parser;
