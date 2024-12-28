const { Variable } = require("./jsBuildHelpers.js");
let x = new Variable('constConstToken','x',14)
let y = new Variable('varConstToken','y',2)
y.reAssign(3)
x.variableValue
y.variableValue
