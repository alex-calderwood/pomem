var diff = require("diff.js");

function f() {
var s1 = document.getElementById("p1").innerHTML;
var s2 = document.getElementById("p2").innerHTML;

var diff = diff.diff(s1, s2);
document.getElementById("diff").innerHTML = diff;

console.log("diff");

}
