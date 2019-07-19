var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('pelanggan/dashboard');
});

router.get('/dashboard', function(req, res, next) {
  dataGas = [{
     idPelanggan : req.user.idPelanggan,
     idAlat : req.user.idAlat,
     token : req.user.token
   }]
  res.render('pelanggan/dashboard',{dataGas : dataGas});
});
router.get('/biodata', function(req, res, next) {
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

router.get('/panduan', function(req, res, next) {
  res.render('pelanggan/panduan');
});

router.get('/logout',function(req,res,next){
  req.session.destroy();
  res.redirect('/login');
})
module.exports = router;
