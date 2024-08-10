const {
	BinaryExpression,
	ParenthesisedExpression,
	VariableAssignment,
	VariableAccess,
	VariableModification,
} = require("./expressionTypes");

class Evaluator {
	#operations;
	constructor() {
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
			return this.evaluate(ast.expression);
		}
		if (ast instanceof VariableAssignment) {
			this.variables.push({
				variableType: ast.variableType,
				variableName: ast.variableName,
				variableValue: this.evaluate(ast.variableValue),
			});
			return;
		}
		if (ast instanceof BinaryExpression) {
			const a = this.evaluate(ast.a);
			const b = this.evaluate(ast.b);
			const operator = ast.operatorToken.tokenValue;

			if (this.#operations[operator]) {
				return this.#operations[operator](a, b);
			} else {
				console.log(`Evaluator Error: Unsupported Operator ${operator}`);
			}
		}
		if (ast.tokenType == "number") {
			return parseFloat(ast.tokenValue);
		} else {
			console.log(`Evaluator Error: Unsupported Syntax Node(u broke something) ${ast}`);
		}
	}
}
exports.Evaluator = Evaluator;
