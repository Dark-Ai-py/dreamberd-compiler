const { parse } = require("vue/compiler-sfc");
const {
	BinaryExpression,
	VariableAssignment,
	VariableAccess,
	ParenthesisedExpression,
	VariableModification,
	Function,
	Float,
	String,
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
		throw new Error(`Unexpected token ${this.#currentToken().tokenType}`);
	}
	//returns current token then increases position by 1
	#nextToken(change = 1) {
		let current = this.#currentToken();
		this.#position += change;
		return current;
	}

	#parseVariableAssignment() {
		return new VariableAssignment(
			this.#nextToken().tokenType,
			this.#nextToken(2).tokenValue,
			this.#parseBinaryExpression(),
		);
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

	#parseString() {
		if (this.#currentToken().tokenType === "unquotedStringToken") {
			if (this.#peek(1).tokenType === "assignToken") {
				return new VariableModification(
					this.#nextToken(2).tokenValue,
					this.#parseBinaryExpression(),
				);
			} else if (this.#currentToken().tokenValue === "if") {
				return #parseConditionalStatement()
			} else if (this.#peek(1).tokenType === "openParenthesisToken") {
				return new Function(this.#nextToken(2).tokenValue, this.parse()[0]);
			} else {
				return new VariableAccess(this.#nextToken().tokenValue);
			}
		} else {
			return new String(this.#nextToken().tokenValue);
		}
	}

	#parseConditionalStatement() {
		
	 }

	parse() {
		var ast;
		try {
			if (this.#currentToken().tokenClass === "assignVariableClass") {
				ast = this.#parseVariableAssignment();
			} else if (this.#currentToken().tokenClass === "binaryClass") {
				ast = this.#parseBinaryExpression();
			} else if (this.#currentToken().tokenClass === "stringClass") {
				ast = this.#parseString();
			}
		} catch (error) {
			console.error(`Parser error: ${error}`);
		}
		return [ast, this.#parseLineEnd()];
	}
}

exports.Parser = Parser;
