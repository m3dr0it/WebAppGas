var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var connection = require('./connection');



/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.query("select * from `alat`",function(err,rows){
    res.render('pangkalan/alat-monitoring',{dataAlat:rows});
  });
});

router.post('/hapus-alat',function(req,res,next){
  console.log("hapus alat");
  console.log(req.body);
  connection.query("DELETE FROM `alat` WHERE `idAlat`='"+req.body.idAlat+"'",function(err,result) {
    if (err) {
      console.log("tidak bisa hapus alat");
    }else {
      connection.query("drop table `"+req.body.idAlat+"` ",function(err,result){
          if(err){
            console.log(err);
            res.send("tidak bisa hapus tabel alat");
          }else if(result){
            console.log("alat terhapus");
            res.redirect('/pangkalan/alat-monitoring');
          }
        });
    }
  })
});

router.post('/tambah-alat',function(req,res,next){
  console.log("daftar alat baru");
  console.log(req.body);
    connection.query("create table `"+req.body.idAlat+"`(waktu DATETIME(6),kapasitas int(8),kebocoran int(4))",function(err,result){
      if(err){
        console.log(err);
        res.send("create tabel error");
      }else if(result){
            console.log(result);
            let token = jwt.sign(
              {idAlat : req.body.alat},"123456",
              {expiresIn :  '365d'});
              console.log(req.body.idAlat);
              console.log(token);
              var today = new Date();
              var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
              var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              var dateTime = date+' '+time;
              connection.query("INSERT INTO `"+req.body.idAlat+"` (`waktu`, `kapasitas`, `kebocoran`) VALUES ('"+dateTime+"', '0', '0') ",function (err,result) {
                if (err) {
                  console.log("insert pertama gagal");
                }
              })
              connection.query("INSERT INTO `alat` (`idAlat`, `token`,`status`) VALUES ('"+req.body.idAlat+"', '"+token+"','0')",function(err,result){
                if(err){
                  console.log("insert error");
                  res.send("gagal mendaftarkan alat");
                }else{
                  console.log(result);
                  res.redirect('/pangkalan/alat-monitoring');
                }
              });
      }
    });
});

module.exports = router;
