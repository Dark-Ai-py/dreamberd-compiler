const {
	BinaryExpression,
	ParenthesisedExpression,
	VariableAssignment,
	VariableAccess,
	VariableModification,
	Function,
	Float,
} = require("./expressionTypes");

class Evaluator {
	constructor() {}

	evaluate(ast, extra) {
		if (ast instanceof Float) {
			return ast.floatValue;
		}
		if (ast instanceof VariableAssignment) {
			if (extra == "debug") {
				return `let ${ast.variableName} = new Variable('${ast.variableType}','${
					ast.variableName
				}',${this.evaluate(ast.variableValue)})\n console.log(${ast.variableName})`;
			} else {
				return `let ${ast.variableName} = new Variable('${ast.variableType}','${
					ast.variableName
				}',${this.evaluate(ast.variableValue)})`;
			}
		}
		if (ast instanceof VariableAccess) {
			return `${ast.variableName}.variableValue`;
		}
		if (ast instanceof VariableModification) {
			return `${ast.variableName}.reAssign(${ast.newValue})`;
		}
		if (ast instanceof BinaryExpression) {
			const a = this.evaluate(ast.a);
			const b = this.evaluate(ast.b);
			const operator = ast.operatorToken.tokenValue;
			return `${a} ${operator} ${b}`;
		} else {
			console.log(`Evaluator Error: Unsupported Syntax Node(u broke something) ${ast}`);
		}
	}
}
exports.Evaluator = Evaluator;
