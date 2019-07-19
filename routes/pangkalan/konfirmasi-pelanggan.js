var express = require('express');
var router = express.Router();
var connection = require('./connection')

/* GET users listing. */
router.post('/', function(req, res, next) {
  var data = req.body;
  addDataPelanggan(data);
  deleteDataCalonPelanggan(data);
  res.redirect('daftar-pelanggan');
});

function addDataPelanggan(data){
    connection.query("INSERT INTO `pelanggan` (`no`, `idPelanggan`, `nama`, `noHp`, `alamat`, `idAlat`, `email`, `password`) VALUES (NULL, '"+data.id+"', '"+data.nama+"', '"+data.nohp+"', '"+data.alamat+"', '"+data.idAlat+"', '"+data.email+"', '"+data.password+"')",function (err,rows, fields) {
      if (!!err) {
      console.log(err);
      }else {
      console.log('insert succes');
      }
  })
}
function deleteDataCalonPelanggan(data){
  var query = "DELETE FROM `calonpelanggan` WHERE `idPelanggan`='"+data.id+"'";
  connection.query(query,function(err,rows,field){
    if (!!err) {
      console.log(err);
      }else {
      console.log('delete succes');
      }
  })
}

module.exports = router;
