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
		this.functionList = [
			{ functionType: "print", functionScript: "console.log(%i);" },
		];
	}

	evaluate(ast, linetype = "normal") {
		switch (ast.constructor) {
			case Float:
				return ast.floatValue;
			case String:
				return ast.stringValue;
			case VariableAssignment:
				if (linetype === "debug") {
					return `let ${ast.variableName} = new Variable('${
						ast.variableType
					}','${ast.variableName}',${this.evaluate(
						ast.variableValue
					)})\nconsole.log("${ast.variableName}.debug());`;
				} else {
					return `let ${ast.variableName} = new Variable('${
						ast.variableType
					}','${ast.variableName}',${this.evaluate(ast.variableValue)});`;
				}
			case VariableAccess:
				if (linetype === "debug") {
					return `console.log(${ast.variableName}.debug());`;
				} else {
					return `${ast.variableName}.variableValue`;
				}
			case VariableModification:
				return `${ast.variableName}.reAssign(${ast.newValue})`;
			case BinaryExpression:
				const a = this.evaluate(ast.a);
				const b = this.evaluate(ast.b);
				const operator = ast.operatorToken.tokenValue;
				return `${a} ${operator} ${b}`;
			case Function:
				const functionScript = this.functionList.find(
					(element) => element.functionType === ast.functionType
				).functionScript;
				return functionScript.replace("%i", this.evaluate(ast.functionInput));
			default:
				console.error(`Evaluator Error: Unsupported Syntax Node ${ast}`);
				break;
		}
	}
}
exports.Evaluator = Evaluator;
