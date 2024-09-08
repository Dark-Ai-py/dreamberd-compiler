const { Variable } = require("./jsBuildHelpers.js");
let x = new Variable('constConstToken','x',14)
let y = new Variable('varVarToken','y',2)
y.variableValue
console.log(x.variableValue * y.variableValue)
