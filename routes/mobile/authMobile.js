var express = require('express');
var router = express.Router();
var connection = require('./connection');
var checkToken = require('./checkToken');
var jwt = require('jsonwebtoken');

router.post('/',(req,res,next)=>{
  console.log(req.body);
  authMobile(req.body,res);
})

function authMobile(user,res){
  console.log(user.email);
  console.log(user.password);
  connection.query("select * from `pelanggan` join `alat` using(idAlat) where `email`='"+user.email+"'",(err,rows,field)=>{
    if (err) {
      console.log(err);
    }else if (!rows.length) {
      console.log("Email Tidak ditemukan");
      res.send({
        authenticated : false,
	pesan 	: 'Email Tidak Ditemukan'
      })
    }else {
      console.log(user.password === rows[0].password);
      authenticatedUser = user.password === rows[0].password
      console.log(authenticatedUser);
      if (authenticatedUser) {
        let token = jwt.sign({username: user.email},
            "123456",
            { expiresIn: '365d'});
	}
        res.send({
        idPelanggan : rows[0].idPelanggan,
        idAlat : rows[0].idAlat,
        authenticated : authenticatedUser,
	pesan 	: 'Password Salah',
        token :rows[0].token
         })
    }
  })
}
module.exports = router;
