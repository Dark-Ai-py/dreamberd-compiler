class SyntaxNode {
	constructor() {
		if (this.constructor === SyntaxNode) {
			throw new Error("Cant instantiate this");
		}
	}
}

class BinaryExpression extends SyntaxNode {
	constructor(a, operatorToken, b) {
		super();
		this.a = a;
		this.operatorToken = operatorToken;
		this.b = b;
	}
}

class VariableAssignment extends SyntaxNode {
	constructor(variableType, variableName, variableValue) {
		super();
		this.variableType = variableType;
		this.variableName = variableName;
		this.variableValue = variableValue;
	}
}

class VariableAccess extends SyntaxNode {
	constructor(variableName) {
		super();
		this.variableName = variableName;
	}
}

class ParenthesisedExpression extends SyntaxNode {
	constructor(leftBracket, expression, rightBracket) {
		super();
		this.leftBracket = leftBracket;
		this.expression = expression;
		this.rightBracket = rightBracket;
	}
}

class VariableModification extends SyntaxNode {
	constructor(variableName, newValue) {
		super();
		this.variableName = variableName;
		//this.assignmentOperator = assignmentOperator;
		this.newValue = newValue;
	}
}
class Function extends SyntaxNode {
	constructor(functionType, functionInput) {
		super();
		this.functionType = functionType;
		this.functionInput = functionInput;
	}
}
class Float extends SyntaxNode {
	constructor(floatValue) {
		super();
		this.floatValue = floatValue;
	}
}

exports.SyntaxNode = SyntaxNode;
exports.BinaryExpression = BinaryExpression;
exports.VariableAssignment = VariableAssignment;
exports.VariableAccess = VariableAccess;
exports.ParenthesisedExpression = ParenthesisedExpression;
exports.VariableModification = VariableModification;
exports.Function = Function;
exports.Float = Float;
