var express = require('express');
var router = express.Router();
var connection = require('./connection')

/* GET users listing. */

router.get('/', function(req, res, next) {
  getDataPelanggan(function(datapelanggan){
    res.render('pangkalan/daftar-pelanggan',{datapelanggan:datapelanggan})
  })
});

router.post('/', function(req, res, next) {
  addDataCalonPelanggan(function(datapelanggan){
    res.render('pangkalan/daftar-pelanggan',{datapelanggan:datapelanggan})
  })
});

function getDataPelanggan(callback){
  connection.query("Select * from pelanggan",function (err,rows, fields) {
    if (!!err) {
    console.log(err);
    }else {
    console.log('succes');
    }
  var result = JSON.parse(JSON.stringify(rows));
  callback(result);
  })
}

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
function addDataCalonPelanggan(data){
  connection.query("INSERT INTO `calonpelanggan` (`no`,`idPelanggan`, `nama`, `alamat`,`noHp`,`email`, `password`) VALUES ('', '"+data.id+"','"+data.namaDepan+" "+data.namaBelakang+"', '"+data.alamat+"', '"+data.nohp+"', '"+data.email+"', '"+data.password+"');",function (err,rows, fields) {
    if (!!err) {
    console.log(err);
    }else {
    console.log('insert succes');
    }
})}
function addDataPelanggan(data){
    connection.query("INSERT INTO `pelanggan` (`no`, `idPelanggan`, `nama`, `noHp`, `alamat`, `idAlat`, `email`, `password`) VALUES (NULL, '"+data.id+"', '"+data.nama+"', '"+data.nohp+"', '"+data.alamat+"', '"+data.idAlat+"', '"+data.email+"', '"+data.password+"')",function (err,rows, fields) {
      if (!!err) {
      console.log(err);
      }else {
      console.log('insert succes');
      }
  })
}
function updateData(data){
  var query = "UPDATE `pelanggan` SET  `nama`='"+data.nama+"',`ttl`='"+data.ttl+"',`alamat`='"+data.alamat+"',`nohp`='"+data.nohp+"' WHERE `id`='"+data.id+"'";
  connection.query(query,function(err, rows, field){
    if (!!err) {
      console.log(err);
      }else {
      console.log('update succes');
      }
  });
}

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
