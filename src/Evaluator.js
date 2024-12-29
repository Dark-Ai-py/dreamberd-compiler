const {
	BinaryExpression,
	ParenthesisedExpression,
	VariableAssignment,
	VariableAccess,
	VariableModification,
	Function,
	Float,
	String,
} = require("./expressionTypes");

class Evaluator {
	constructor() {
		this.functionList = [{ functionType: "print", functionScript: "console.log(%i);" }];
	}

	evaluate(ast, linetype = "normal") {
		if (ast instanceof Float) {
			return ast.floatValue;
		}
		if (ast instanceof String) {
			return ast.stringValue;
		}
		if (ast instanceof VariableAssignment) {
			if (linetype == "debug") {
				return `let ${ast.variableName} = new Variable('${ast.variableType}','${
					ast.variableName
				}',${this.evaluate(ast.variableValue)})\nconsole.log("${ast.variableName} = "+ ${
					ast.variableName
				}.variableValue);`;
			} else {
				return `let ${ast.variableName} = new Variable('${ast.variableType}','${
					ast.variableName
				}',${this.evaluate(ast.variableValue)});`;
			}
		}
		if (ast instanceof VariableAccess) {
			if (linetype == "debug") {
				return `console.log(${ast.variableName}.variableValue);`;
			} else {
				return `${ast.variableName}.variableValue`;
			}
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
		if (ast instanceof Function) {
			const functionScript = this.functionList.find(
				(element) => element.functionType === ast.functionType,
			).functionScript;
			return functionScript.replace("%i", this.evaluate(ast.functionInput));
		} else {
			console.log(
				`Evaluator Error: Unsupported Syntax Node(u broke something) ${ast}, ${linetype}`,
			);
		}
	}
}
exports.Evaluator = Evaluator;
