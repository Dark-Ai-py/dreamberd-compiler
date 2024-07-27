const {
	BinaryExpression,
	ParenthesisedExpression,
	VariableAssignment,
	VariableAccess,
	VariableModification,
} = require("./expressionTypes");

class Evaluator {
	#operations;
	constructor(ast) {
		this.#operations = {
			"+": (a, b) => a + b,
			"-": (a, b) => a - b,
			"*": (a, b) => a * b,
			"/": (a, b) => a / b,
		};
		this.variables = [];
	}

	evaluate(ast) {
		if (ast instanceof ParenthesisedExpression) {
			ast = ast.expression;
		}

		if (ast instanceof VariableAssignment) {
			this.variables = [
				...this.variables,
				{
					type: ast.variableType,
					name: ast.variableName,
					value: this.evaluate(ast.variableValue),
				},
			];
		}

		if (ast instanceof BinaryExpression) {
			const a = this.evaluate(ast.a);
			const b = this.evaluate(ast.b);
			const operator = ast.operatorToken.tokenValue;
			if (this.#operations[operator]) {
				return this.#operations[operator](a, b).toPrecision(4); //cap the decimal place to thousandths
			} else {
				console.log(`Evaluator Error: Unsupported operator: ${operator}`);
			}
		} else if (ast.tokenType == "number") {
			return parseFloat(ast.tokenValue);
		} else {
			console.log(`Evaluator Error: Unsupported Syntax Node: ${ast}`);
		}
	}
}
exports.Evaluator = Evaluator;
