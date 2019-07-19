var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  dataGas = [{
     idPelanggan : req.user.idPelanggan,
     idAlat : req.user.idAlat,
     token : req.user.token
   }]
  res.render('pelanggan/dashboard',{dataGas : dataGas});
});

module.exports = router;
