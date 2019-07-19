let jwt = require('jsonwebtoken');
var uaparser = require('useragent');
var express = require('express');
var router = express.Router();

let checkToken = function(req,res,next){
  console.log("checkToken");
  console.log(req.headers);
  let mobile = req.headers['mobile'];
  console.log(mobile);
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  console.log("verify");
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length)
    }
    jwt.verify(token,"123456",(err,decode)=>{
      if (err) {
        console.log(err);
        return res.send({
          succes : false
        })
      }else {
        req.decoded = decode;
        console.log("succes");
        next();
      }
    })
  }else {
    res.send('no authorization')
  }
}

module.exports = {checkToken : checkToken};
