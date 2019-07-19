
var express = require('express');
var router = express.Router();
var connection = require('./connection');
var request = require('request');
var checkToken = require('./checkToken').checkToken
var checkMobile = require('./checkMobile').checkMobile
var jwt = require('jsonwebtoken');

router.get('/',checkMobile,checkToken,function(req,res,next){
   res.send("profile");
})
router.get('/:idPelanggan',checkMobile,checkToken,function(req,res,next) {
    console.log(req.body)
    connection.query("select * from `pelanggan` where `idPelanggan`='"+req.params.idPelanggan+"'",function(err,rows) {
      if (err) {
	res.send({
          'error' : true,
          'pesanError' : err
	});
      }else {
          res.send({
            'error' : false,
            'pesanError': "none",
            'nama' : rows[0].nama,
	    'email' : rows[0].email,
            'alamat' : rows[0].alamat,
            'noHp'  : rows[0].noHp
          });
    	}
   })
});

module.exports = router;
