var express = require('express');
var router = express.Router();
var request = require("request");
var options = { method: 'GET',
  url: 'https://api.thinger.io/v2/users/m3dr0it/devices/esp8266/millis',
  headers:
   { 'Postman-Token': '267b02f6-46f5-4ecd-8468-b7f4f8a69147',
     'cache-control': 'no-cache',
     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJlc3A4MjY2IiwiaWF0IjoxNTUwMDc1NDc3LCJqdGkiOiI1YzY0NDY1NWMzYTM5MGNlN2JkZGEwZGMiLCJ1c3IiOiJtM2RyMGl0In0.PKKOGCNlIKhGWRYSAsJrt7QS4nIW_OGimeeCUdRTdZc' } };

/* GET home page. */
router.get('/', function(req, res, next) {
request(options, function (error, response, data) {
  if (error)
   throw new Error(error);
   const res_data = JSON.parse(data);
   if (res_data.out === undefined) {
      res.render('data', {content : "data tidak ditemukan"});
   }else{
     res.render('data', {content : res_data.out });
    console.log(res_data.out);
   }
});

});

module.exports = router;
