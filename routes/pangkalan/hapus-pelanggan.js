var express = require('express');
var router = express.Router();
var connection = require('./connection')

/* GET users listing. */
router.post('/', function(req, res, next) {
  var data = req.body;
  deleteData(data);
  res.redirect('/pangkalan/daftar-pelanggan');
});

function deleteData(data){
  var query = "DELETE FROM `pelanggan` WHERE `idPelanggan`='"+data.id+"'";
  connection.query(query,function(err,rows,field){
    if (!!err) {
      console.log(err);
      }else {
      console.log('delete succes');
      }
  })
}

module.exports = router;
