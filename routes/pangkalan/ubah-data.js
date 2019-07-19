var express = require('express');
var router = express.Router();
var connection = require('./connection')

/* GET users listing. */
router.post('/', function(req, res, next) {
  var data = req.body;
  console.log(data);
  updateData(data);
  res.redirect('/pangkalan/daftar-pelanggan');
});

function updateData(data){
  var query = "UPDATE `pelanggan` SET  `nama`='"+data.nama+"',`alamat`='"+data.alamat+"',`nohp`='"+data.nohp+"' WHERE `idPelanggan`='"+data.id+"'";
  connection.query(query,function(err, rows, field){
    if (!!err) {
      console.log(err);
      }else {
      console.log('update succes');
      }
  });
}


module.exports = router;
