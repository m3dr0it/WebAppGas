var express = require('express');
var router = express.Router();
var connection = require('./connection');
/* GET users listing. */
router.get('/', function(req, res, next) {
  getDataCalonPelanggan(function(data){
    res.render('pangkalan/calon-pelanggan',{datacalonpelanggan:data});
  });
  });
function getDataCalonPelanggan(callback){
  connection.query("Select * from calonpelanggan",function (err,rows, fields) {
    if (!!err) {
    console.log(err);
    }else {
    console.log('succes');
    }
  var result = JSON.parse(JSON.stringify(rows));
  callback(result);
  });
}
module.exports = router;
