class ClassNode {
	constructor() {}
}
class Variable extends ClassNode {
	#variableValue;
	constructor(variableType, variableName, variableValue) {
		this.variableType = variableType;
		this.variableName = variableName;
		this.#variableValue = variableValue;
	}
	reAssign(newValue) {
		switch (this.variableType) {
			case "constConstToken":
				console.log("Error: cannot reassign variable");

				break;
			case "constVarToken":
				console.log("Error: cannot reassign variable");
				break;
			case "varConstToken":
				this.#variableValue = newValue;
				break;
			case "varVarToken":
				this.#variableValue = newValue;
				break;
		}
	}
	mutate() {
		switch (this.variableType) {
			case "constConstToken":
				console.log("Error: cannot mutate variable");
				break;
			case "constVarToken":
				return this.#variableValue;
			case "varConstToken":
				console.log("Error: cannot mutate variable");
				break;
			case "varVarToken":
				return this.#variableValue;
		}
	}
}
