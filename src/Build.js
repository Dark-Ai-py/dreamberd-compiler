const { Variable } = require("./jsBuildHelpers.js");

let name = new Variable("constConstToken", "name", 11);
console.log(name.variableValue + 11);
