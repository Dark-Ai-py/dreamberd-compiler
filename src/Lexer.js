class Lexer {
	constructor(inputText) {
		this.inputText = inputText;
		this.tokens = [];
		this.tokenTypes = [
			{ tokenType: "number", regex: /^-?[0-9]\d*(\.\d+)?/ },
			{ tokenType: "plusToken", regex: /^\+/ },
			{ tokenType: "minusToken", regex: /^\-/ },
			{ tokenType: "multiplyToken", regex: /^\*/ },
			{ tokenType: "divideToken", regex: /^\// },
			{ tokenType: "whitespace", regex: /^\s/ },
			{ tokenType: "assignToken", regex: /^\+=|^\-=|^=/ },
			{ tokenType: "notToken", regex: /^;/ },
			{ tokenType: "unquotedStringToken", regex: /^[A-Za-z]+/ },
			{ tokenType: "stringToken", regex: /'([^']*?)'|"([^"]*?)"/ },
			{ tokenType: "openParenthesisToken", regex: /^\(/ },
			{ tokenType: "closeParenthesisToken", regex: /^\)/ },
			{ tokenType: "questionMarkToken", regex: /^\?/ },
			{ tokenType: "exclamationMarkToken", regex: /^\!/ },
		];
		this.keywords = [
			{ tokenType: "constConstToken", regex: /^const const/ },
			{ tokenType: "constVarToken", regex: /^const var/ },
			{ tokenType: "varConstToken", regex: /^var const/ },
			{ tokenType: "varVarToken", regex: /^var var/ },
			{ tokenType: "previousToken", regex: /^previous/ },
		];
	}

	tokenize() {
		let currentIndex = 0;
		while (currentIndex < this.inputText.length) {
			let matchedToken = null;

			for (const tokenType of [...this.keywords, ...this.tokenTypes]) {
				const regexResult = this.inputText.slice(currentIndex).match(tokenType.regex);
				if (regexResult && regexResult.index === 0) {
					let value = regexResult[0];
					const type = tokenType.tokenType;
					currentIndex += value.length;
					matchedToken = type;
					if (type == "stringToken") {
						value = regexResult[1];
					}
					if (type == "number" && value.match(/^\-/)) {
						this.tokens.push({ tokenType: "plusToken", tokenValue: "+" });
					}
					this.tokens.push({ tokenType: type, tokenValue: value });
					break;
				}
			}
			if (!matchedToken) {
				console.log(`Lexer error: unrecognized token ${this.inputText.slice(currentIndex)}`);
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
