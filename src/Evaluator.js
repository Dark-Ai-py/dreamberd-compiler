const {
	BinaryExpression,
	ParenthesisedExpression,
	VariableAssignment,
	VariableAccess,
	VariableModification,
} = require("./expressionTypes");

class Evaluator {
	constructor() {}

	evaluate(ast) {
		if (ast instanceof ParenthesisedExpression) {
			return `(${this.evaluate(ast.expression)}));`;
		}
		if (ast instanceof VariableAssignment) {
			return `let ${ast.variableName} = new Variable('${ast.variableType}','${
				ast.variableName
			}',${this.evaluate(ast.variableValue)})`;
		}
		if (ast instanceof VariableAccess) {
			return `${ast.variableName}.variableValue`;
		}

		if (ast instanceof BinaryExpression) {
			const a = this.evaluate(ast.a);
			const b = this.evaluate(ast.b);
			const operator = ast.operatorToken.tokenValue;
			return `${a} ${operator} ${b}`;
		}
		if (ast.tokenType == "number") {
			return ast.tokenValue;
		} else {
			console.log(`Evaluator Error: Unsupported Syntax Node(u broke something) ${ast}`);
		}
	}
}
exports.Evaluator = Evaluator;
