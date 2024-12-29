class ClassNode {
	constructor() {}
}
class Variable extends ClassNode {
	constructor(variableType, variableName, variableValue) {
		super();
		this.variableType = variableType;
		this.variableName = variableName;
		this.variableValue = variableValue;
	}
	debug() {
		return `${this.variableName}:\n Value: ${
			this.variableValue
		}\n Type: ${this.variableType.slice(0, -5)}`;
	}
	reAssign(newValue) {
		switch (this.variableType) {
			case "constConstToken":
				console.error("Build Helpers Error: cannot reassign a variable");

				break;
			case "constVarToken":
				console.error("Build Helpers Error: cannot reassign a variable");
				break;
			case "varConstToken":
				this.variableValue = newValue;
				break;
			case "varVarToken":
				this.variableValue = newValue;
				break;
		}
	}
	mutate() {
		switch (this.variableType) {
			case "constConstToken":
				console.error("Build Helpers Error: cannot mutate variable");
				break;
			case "constVarToken":
				return this.variableValue;
			case "varConstToken":
				console.error("Build Helpers Error: cannot mutate variable");
				break;
			case "varVarToken":
				return this.variableValue;
		}
	}
}
exports.Variable = Variable;
