const { Variable } = require("./jsBuildHelpers.js");
let y = new Variable('varVarToken','y',12);
let x = new Variable('constConstToken','x',14);
console.log(x.variableValue);
console.log(y.variableValue);
