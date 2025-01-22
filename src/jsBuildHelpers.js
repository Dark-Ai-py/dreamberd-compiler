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

class DateObject extends ClassNode {
	constructor() {
		super();
	}
	now(Dst = false) {
		const date = new Date();
		if (Dst) {
			const offset = date.getTimezoneOffset();
			date.setMinutes(date.getMinutes() + offset + 60);
		}
		const miliseconds = date.getMilliseconds();
		const seconds = date.getSeconds();
		const minutes = date.getMinutes();
		const hours = date.getHours();
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return [miliseconds, seconds, minutes, hours, day, month, year];
	}
	second() {
		return this.now()[1];
	}
	minute() {
		return this.now()[2];
	}
	hour() {
		return this.now()[3];
	}
	day(text = false) {
		if (text) {
			return [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
			][new Date().getDay()];
		}
		return this.now()[4];
	}
	month(text = false) {
		if (text) {
			return [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			][this.now()[5] - 1];
		}
		return this.now()[5];
	}
	year() {
		return this.now()[6];
	}
}
exports.Variable = Variable;
exports.DateObject = DateObject;
