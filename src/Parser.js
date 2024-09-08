const {
	BinaryExpression,
	VariableAssignment,
	VariableAccess,
	ParenthesisedExpression,
	VariableModification,
	Function,
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
			`Parser error: bad token type: ${this.#currentToken().tokenType}, expected ${type}`,
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
		let a = this.#parsePrimaryExpression();

		while (true) {
			let priority = this.#getBinaryOperatorPriority(this.#currentToken().tokenType);
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
		const firstToken = this.#currentToken();

		switch (firstToken.tokenType) {
			case "openParenthesisToken":
				let a = this.#nextToken();
				let operator = this.#parseBinaryExpression();
				let b = this.#match("closeParenthesisToken");
				return new ParenthesisedExpression(a, operator, b);
			case "unquotedStringToken":
				let identifierToken = this.#nextToken();
				return new VariableAccess(identifierToken.tokenValue);
			case "stringToken":
				return this.#match("stringToken");
			default:
				return this.#match("number");
		}
	}

	#parseVariableAssignment() {
		let type = this.#nextToken().tokenType;
		let name = this.#match("unquotedStringToken").tokenValue;
		let assignment = this.#match("assignToken");
		let value;

		value = this.#parseBinaryExpression();
		return new VariableAssignment(type, name, value);
	}

	#parseVariableReassignment() {
		let name = this.#match("unquotedStringToken");
		let assignmentOperator = this.#nextToken();
		let value;
		value = this.#parseBinaryExpression();
		return new VariableModification(name, assignmentOperator, value);
	}

	parse() {
		let ast;

		switch (this.#currentToken().tokenType) {
			case "constConstToken":
			case "constVarToken":
			case "varConstToken":
			case "varVarToken":
				ast = this.#parseVariableAssignment();
				break;
			case "unquotedStringToken" && this.#peek(1) == "assignToken":
				ast = this.#parseVariableReassignment();
				break;
			default:
				ast = this.#parseBinaryExpression();
				break;
		}
		if (
			this.#tokens[this.#position].tokenType == "endOfLineDebugToken" &&
			ast instanceof (BinaryExpression || VariableAccess || ParenthesisedExpression)
		) {
			ast = new Function("print", ast);
		}

		return ast;
	}
}

exports.Parser = Parser;
