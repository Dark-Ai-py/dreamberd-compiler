const {
	BinaryExpression,
	ParenthesisedExpression,
	VariableAssignment,
	VariableAccess,
	VariableModification,
} = require("./expressionTypes");

class Evaluator {
	#operations;
	constructor(variables) {
		this.#operations = {
			"+": (a, b) => a + b,
			"-": (a, b) => a - b,
			"*": (a, b) => a * b,
			"/": (a, b) => a / b,
		};
		this.variables = variables;
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
			return "Variable Assignment";
		}
		if (ast instanceof VariableAccess) {
			const getIndex = (arr, name) => {
				const mappedArr = arr.map((obj) => obj["variableName"]);
				const index = mappedArr.indexOf(name);
				if (index < 0) {
					console.log(`Evaluator Error: No such Variable Exists, ${mappedArr}`);
				} else {
					return arr[index].variableValue;
				}
			};

			return getIndex(this.variables, ast.variableName);
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
