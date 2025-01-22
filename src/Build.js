const { Variable, DateObject } = require("./jsBuildHelpers.js");
let x = new Variable('constConstToken','x',14);
let y = new Variable('varVarToken','y',12);
console.log(x.debug());
console.log(Date.variableValue);
