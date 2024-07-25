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

	#getBinaryOperatorPriority(tokenType) {
		switch (tokenType) {
			case "multiplyToken":
			case "divideToken":
				return 2;
			case "plusToken":
			case "minusToken":
				return 1;
			default:
				return 0;
		}
	}

	#parseBinaryExpression(parentPriority = 0) {
		let a = this.#parsePrimaryExpression;

		while (true) {
			let priority = this.#getBinaryOperatorPriority(
				this.#currentToken().tokenType
			);
			if (priority === 0 || priority <= parentPriority) {
				break;
			}
			let operator = this.#nextToken();
			let b = this.#parseBinaryExpression(priority);
			a = new BinaryExpression(a, operator, b);
		}
		return a;
	}

	#parsePrimaryExpression() {
		return this.#match("number");
	}

	parse() {
		let ast;
		if (this.#currentToken().tokenType == "number") {
			console.log("binary parse");
			ast = this.#parseBinaryExpression();
		} else {
			ast = "unknown";
		}
		return ast;
	}
}

exports.Parser = Parser;
