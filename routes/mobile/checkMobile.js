var express = require('express');
var router = express.Router();
var uaparser = require('useragent');

let checkMobile = function(req,res,next) {
  console.log("Check is Mobile True  ? ");
  var ua = uaparser.parse(req.headers['user-agent']);
  console.log(ua.family);
  if (ua.family === "Android") {
    req.session.destroy();
    console.log("True");
    next()
  }else {
    console.log("False");
    res.redirect('/login');
  }
}
module.exports = {checkMobile : checkMobile};
