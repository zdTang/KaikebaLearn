"use strict";

var a = 12;
var b = 1,
    c = 2,
    d = 1;

var show = function show() {
  var p = new Promise(function (resolve, reject) {});
  p.then(function (json) {}, function (err) {});
};
show();