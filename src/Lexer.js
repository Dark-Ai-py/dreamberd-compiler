class Lexer {
	constructor(inputText) {
		this.inputText = inputText;
		this.tokens = [];
		this.tokenTypes = [
			{ tokenType: "constConstToken", tokenClass: "assignVariableClass", regex: /^const const/ },
			{ tokenType: "constVarToken", tokenClass: "assignVariableClass", regex: /^const var/ },
			{ tokenType: "varConstToken", tokenClass: "assignVariableClass", regex: /^var const/ },
			{ tokenType: "varVarToken", tokenClass: "assignVariableClass", regex: /^var var/ },
			{ tokenType: "number", tokenClass: "binaryClass", regex: /^-?[0-9]\d*(\.\d+)?/ },
			{ tokenType: "plusToken", tokenClass: "binaryOperatorClass", regex: /^\+/ },
			{ tokenType: "minusToken", tokenClass: "binaryOperatorClass", regex: /^\-/ },
			{ tokenType: "multiplyToken", tokenClass: "binaryOperatorClass", regex: /^\*/ },
			{ tokenType: "divideToken", tokenClass: "binaryOperatorClass", regex: /^\// },
			{ tokenType: "whitespace", regex: /^\s/ },
			{ tokenType: "assignToken", regex: /^\+=|^\-=|^=/ },
			{ tokenType: "notToken", tokenClass: "binaryOperatorClass", regex: /^;/ },
			{ tokenType: "unquotedStringToken", tokenClass: "stringClass", regex: /^[A-Za-z]+/ },
			{ tokenType: "stringToken", tokenClass: "stringCLass", regex: /'([^']*?)'|"([^"]*?)"/ },
			{ tokenType: "openParenthesisToken", regex: /^\(/ },
			{ tokenType: "closeParenthesisToken", regex: /^\)/ },
			{ tokenType: "openCurlyBracketToken", regex: /^\{/ },
			{ tokenType: "closeCurlyBracketToken", regex: /^\}/ },
			{ tokenType: "notToken", tokenClass: "binaryOperatorClass", regex: /^\;/ },
			{ tokenType: "greaterThanToken", tokenClass: "binaryOperatorClass", regex: /^\>/ },
			{ tokenType: "lessThanToken", tokenClass: "binaryOperatorClass", regex: /^\</ },
			{ tokenType: "questionMarkToken", tokenClass: "lineEndClass", regex: /^\?/ },
			{ tokenType: "exclamationMarkToken", tokenClass: "lineEndClass", regex: /^\!/ },
		];
	}

	tokenize() {
		let currentIndex = 0;
		while (currentIndex < this.inputText.length) {
			let matchedToken = null;

			for (const tokenType of [...this.tokenTypes]) {
				const regexResult = this.inputText.slice(currentIndex).match(tokenType.regex);
				if (regexResult && regexResult.index === 0) {
					let value = regexResult[0];
					currentIndex += value.length;
					matchedToken = tokenType.tokenType;
					if (tokenType.tokenType == "stringToken") {
						value = regexResult[1];
					}
					if (tokenType.tokenType == "number" && value.match(/^\-/)) {
						this.tokens.push({ tokenType: "plusToken", tokenValue: "+" });
					}
					this.tokens.push({
						tokenType: tokenType.tokenType,
						tokenClass: tokenType.tokenClass,
						tokenValue: value,
					});
					break;
				}
			}
			if (!matchedToken) {
				console.error(`Lexer error: unrecognized token ${this.inputText.slice(currentIndex)}`);
				return;
			}
		}
		this.tokens.push({ tokenType: "endOfLineToken", tokenValue: "\x00" });
		for (let tokenIndex = 0; tokenIndex < this.tokens.length; tokenIndex++) {
			if (this.tokens[tokenIndex].tokenType == "whitespace") {
				this.tokens.splice(tokenIndex, 1);
			}
		}
		return this.tokens;
	}
}

exports.Lexer = Lexer;
