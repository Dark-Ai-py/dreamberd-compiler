const { Variable } = require("./jsBuildHelpers.js");
let y = new Variable('varVarToken','y',12)
console.log(y.variableValue)
let x = new Variable('constConstToken','x',14)
console.log(x.variableValue)
