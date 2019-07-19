var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.user.token);
  var data = [{
      'idPelanggan' : req.user.idPelanggan,
      'nama' : req.user.nama,
      'alamat':req.user.alamat,
      'noHp':req.user.noHp,
      'email':req.user.email,
      'idAlat':req.user.idAlat,
      'token':req.user.token
  }]
  res.render('pelanggan/biodata',{dataPelanggan:data})
});

module.exports = router;
