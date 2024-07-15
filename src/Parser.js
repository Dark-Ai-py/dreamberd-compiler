const {
	BinaryExpression,
	VariableAssignment,
	VariableAccess,
	ParenthesisedExpression,
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
	//lets us look ahead or the current token
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
			`Parser error: bad token type: ${
				this.#currentToken.tokenType
			}, expected ${type}`
		);
	}
	//returns current token and moves position by 1
	#nextToken() {
		let current = this.#currentToken();
		this.#position++;
		return current;
	}

	#parseBinaryExpression() {
		let a = this.#nextToken();
		while (true) {
			switch (this.#nextToken().tokenType) {
				case "plusToken":
					console.log("plustoken");
					a = new BinaryExpression(a, "+", this.#nextToken().tokenValue);
					break;
				case "minusToken":
					a = new BinaryExpression(a, "-", this.#nextToken().tokenValue);
					break;
				case "multiplyToken":
					a = new BinaryExpression(a, "*", this.#nextToken().tokenValue);
					break;
				case "divideToken":
					a = new BinaryExpression(a, "/", this.#nextToken().tokenValue);
					break;
				case "endOfFileToken":
					return a;
				default:
					return a;
			}
		}
	}

	parse() {
		let ast;
		if (this.#currentToken().tokenType == "number") {
			console.log("binary parse");
			ast = this.#parseBinaryExpression();
		}
		return ast;
	}
}

exports.Parser = Parser;
