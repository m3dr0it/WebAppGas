
var express = require('express');
var router = express.Router();
var connection = require('./connection');
var request = require('request');
var checkToken = require('./checkToken').checkToken
var checkMobile = require('./checkMobile').checkMobile
var jwt = require('jsonwebtoken');

router.get('/',function(req,res,next) {
    console.log(req.body);
  res.send("data");
})

router.get('/:idAlat',checkMobile,checkToken,function(req,res,next) {
  console.log("Get Data dan Kirim");
  connection.query("select `token` from `alat` where `idAlat`='"+req.params.idAlat+"'",function(err,rows,response){
    console.log(rows[0]);
    connection.query("SELECT * FROM `"+req.params.idAlat+"` order by waktu DESC limit 1",function(err,rows1,fields){
      var pesanErr;
      if (err) {
        console.log(err);
      }
      console.log(rows1[0]);
      if (rows1[0] == undefined) {
        pesanErr = "Kesalahan di Server, Tunggu Beberapa Menit";
        res.send({
	         'err' : true,
          'pesanErr' : pesanErr
        })
      }else {
        let data = rows1[0];
        if (data.error) {
          res.send({
	           'err' : true,
            'pesanErr' : "Perangkat Offline"
          })
        }else {
          res.send({
	    'err' : false,
            'kapasitas' : data.kapasitas,
            'kebocoran' : data.kebocoran
          })
        }
      }
    })
  })
})
module.exports = router;
