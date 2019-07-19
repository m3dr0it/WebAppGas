var express = require('express');
var router = express.Router();
var connection = require('./connection');
var request = require('request');

/* GET users listing. */

router.get('/',function(req,res){
  //   connection.query("select `idPelanggan`,`idAlat`,`token` from `pelanggan` join `alat` using(idAlat)",function(err,rows){
  //   timerPenyedia = setInterval(function(){
  //     for(var i=0 ;i<rows.length;i++){
  //       var options = {
  //         method: 'GET',
  //         agent: false, pool: {maxSockets: 100},
  //         url: 'https://api.thinger.io/v2/users/m3dr0it/devices/'+rows[i].idAlat+'/data',
  //         headers:{
  //           'cache-control': 'no-cache',
  //           Authorization: 'Bearer '+rows[i].token+''
  //             }
  //           }
  //       getDataFromThingerPenyedia(options,rows[i].idAlat,req.io)
  //     }
  //   },2000)
  // })
  connection.query("select `idPelanggan`,`idAlat`,`token` from `pelanggan` join `alat` using(idAlat)",function(err,rows){
    res.render('pangkalan/dashboard-pangkalan',{dataGas:rows})
  })
})

function getDataFromThingerPenyedia(options,idAlat,socket){
    connection.query("SELECT * FROM `"+idAlat+"` order by waktu DESC limit 1",function(err,rows){
      console.log(idAlat)
      var body = {
        out : {
          'kapasitas' : rows[0].kapasitas,
          'kebocoran' : rows[0].kebocoran
        }
      }
      console.log(body)
      if(body == undefined){
        socket.emit(idAlat,"Kesalahan Pada Server")
      }else{
        var informasiGas = body
          socket.emit(idAlat,informasiGas)
      }
      })
  }

module.exports = router;
