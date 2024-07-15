class Lexer {
	constructor(inputText) {
		this.inputText = inputText;
		this.tokens = [];
		this.tokenTypes = [
			{ tokenType: "number", regex: /^\d+/ },
			{ tokenType: "plusToken", regex: /^\+/ },
			{ tokenType: "minusToken", regex: /^\-/ },
			{ tokenType: "multiplyToken", regex: /^\*/ },
			{ tokenType: "divideToken", regex: /^\// },
			{ tokenType: "whitespace", regex: /^\s/ },
			{ tokenType: "assignToken", regex: /^=/ },
			{ tokenType: "notToken", regex: /^;/ },
			{ tokenType: "unquotedStringToken", regex: /^[A-Za-z]+/ },
			{ tokenType: "stringToken", regex: /'([^']*?)'|"([^"]*?)"/ },
			{ tokenType: "endOfLineNormalToken", regex: /^!+$/ },
			{ tokenType: "endOfLineDebugToken", regex: /^\?+$/ },
		];
		this.keywords = [
			{ tokenType: "constConstToken", regex: /^const\sconst/ },
			{ tokenType: "constVarToken", regex: /^const\svar/ },
			{ tokenType: "varConstToken", regex: /^var\sconst/ },
			{ tokenType: "varVarToken", regex: /^var\svar/ },
		];
	}

	tokenize() {
		// console.log(this.inputText);
		let currentIndex = 0;
		while (currentIndex < this.inputText.length) {
			let matchedToken = null;

			for (const tokenType of [...this.keywords, ...this.tokenTypes]) {
				// console.log(
				// 	`${this.inputText.slice(currentIndex)}  ${
				// 		tokenType.tokenType
				// 	} ${currentIndex}`
				// );
				const regexResult = this.inputText
					.slice(currentIndex)
					.match(tokenType.regex);
				if (regexResult && regexResult.index === 0) {
					let value = regexResult[0];
					const type = tokenType.tokenType;
					currentIndex += value.length;
					matchedToken = type;
					if (type == "stringToken") {
						// value = value.slice(1, -1);
						value = regexResult[1];
					}
					this.tokens.push({ tokenType: type, tokenValue: value });
					break;
				}
			}
			if (!matchedToken) {
				console.log(
					`Lexer error: unrecognized token ${this.inputText.slice(
						currentIndex
					)}`
				);
				// console.log(matchedToken);
				return;
			}
		}
		this.tokens.push({ tokenType: "endOfFileToken", tokenValue: "\0" });
		for (let tokenIndex = 0; tokenIndex < this.tokens.length; tokenIndex++) {
			if (this.tokens[tokenIndex].tokenType == "whitespace") {
				this.tokens.splice(tokenIndex, 1);
			}
		}
		return this.tokens;
	}
}

exports.Lexer = Lexer;
