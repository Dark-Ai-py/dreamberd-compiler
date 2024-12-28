const {
	BinaryExpression,
	ParenthesisedExpression,
	VariableAssignment,
	VariableAccess,
	VariableModification,
	Function,
} = require("./expressionTypes");

class Evaluator {
	constructor() {
		this.functionList = [
			{ functionType: "print", output: `console.log(%i)` },
			{ functionType: "previous", output: "%i.previous()" },
		];
	}
	getFunction(func, input) {
		for (let i = 0; i < this.functionList.length; i++) {
			if (func == this.functionList[i].functionType) {
				return this.functionList[i].output.replace("%i", input);
			}
		}
	}
	evaluate(ast) {
		if (ast instanceof Function) {
			return this.getFunction(ast.functionType, this.evaluate(ast.functionInput));
		}
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
		if (ast instanceof VariableModification) {
			return `${ast.variableName}.reAssign(${ast.newValue})`;
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
