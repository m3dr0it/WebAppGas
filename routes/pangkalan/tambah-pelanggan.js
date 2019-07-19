var express = require('express');
var router = express.Router();
var connection = require('./connection')

/* GET users listing. */
router.post('/', function(req, res, next) {
  var data = req.body;
  console.log(data);
  addDataCalonPelanggan(data);
  res.redirect('/pangkalan/calon-pelanggan')
  });

function addDataCalonPelanggan(data){
  connection.query("INSERT INTO `calonpelanggan` (`no`,`idPelanggan`, `nama`, `alamat`,`noHp`,`email`, `password`) VALUES (NULL, '"+data.id+"','"+data.namaDepan+" "+data.namaBelakang+"', '"+data.alamat+"', '"+data.nohp+"', '"+data.email+"', '"+data.password+"');",function (err,rows, fields) {
    if (!!err) {
    console.log(err);
    }else {
    console.log('insert succes');
    }
  })
}

module.exports = router;
