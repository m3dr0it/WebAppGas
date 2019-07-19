var socket_io = require('socket.io');
var connection = require('./routes/connection');
var request = require('request');
var io = socket_io();
var socketApi = {};
socketApi.io = io;


io.on('connection',function(socket){
  console.log('an user connected');
  console.log(socket.id);


  socket.on('id',function(msg){
    console.log(socket.id);
    console.log(msg);
    connection.query("select `token` from `alat` where `idAlat`='"+msg.idAlat+"'",function(err,rows,response){
      console.log(rows[0]);
      var options = {
      method: 'GET',
      agent: false, pool: {maxSockets: 100},
      url: 'https://api.thinger.io/v2/users/m3dr0it/devices/'+msg.idAlat+'/data',
      headers:{
        'cache-control': 'no-cache',
        Authorization: 'Bearer '+rows[0].token+''
        }
      }
      connection.query("SELECT * FROM `"+msg.idAlat+"` order by waktu DESC limit 1",function(err,rows,fields){
        var pesanErr;
        pesanErr = "Kesalahan di Server, Tunggu Beberapa Menit";
        if (err) {
          console.log(err);
          socket.volatile.emit(msg.idAlat,true,pesanErr,false,false);
        }else{
        if (rows[0] == undefined) {
          socket.volatile.emit(msg.idAlat,true,pesanErr,false,false);
        }else {
          console.log(rows[0]);
          let body = {
            out : {
              'kapasitas' : rows[0].kapasitas,
              'kebocoran' : rows[0].kebocoran
            }
          }
          let data = body;
          if (data.error) {
            pesanErr = "Perangkat Tidak Ditemukan";
            socket.volatile.emit(msg.idAlat,true,pesanErr,false,false);
          }else {
            let idKapasitas = ''+msg.idAlat+''+"kapasitas"+''
            let idKebocoran = ''+msg.idAlat+''+"kebocoran"+''
            console.log(idKapasitas+" "+data.out.kapasitas);
            console.log(idKebocoran+" "+data.out.kebocoran);
            socket.volatile.emit(msg.idAlat,false,"ok",data.out.kapasitas,data.out.kebocoran);
          }
        }
      }
      });
    })
  })
    socket.on('pangkalan',function(msg){
      console.log(msg);
      connection.query("select `idPelanggan`,`idAlat`,`token` from `pelanggan` join `alat` using(idAlat)",function(err,rows){
        for(var i=0 ;i<rows.length;i++){
          var options = {
            method: 'GET',
            agent: false, pool: {maxSockets: 100},
            url: 'https://api.thinger.io/v2/users/m3dr0it/devices/'+rows[i].idAlat+'/data',
            headers:{
              'cache-control': 'no-cache',
            Authorization: 'Bearer '+rows[i].token+''
                    }
              }
              getDataFromThingerPenyedia(options,rows[i].idAlat)
          }
      })
    });
    socket.on('mobile',function(msg){
        console.log(msg);
        socket.emit(idAlat,false,"LOL");
      })
  socket.on('disconnect',function(){
    console.log("socket disconnected");
  })
  function getDataFromThingerPenyedia(options,idAlat){
      connection.query("SELECT * FROM `"+idAlat+"` order by waktu DESC limit 1",function(err,rows){
        if (err) {
          console.log(err);
        }else {
        console.log(idAlat);
        if (rows[0] == undefined) {
          console.log(rows[0]);
          socket.volatile.emit(idAlat,rows[0]);
        }else {
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
          socket.emit(idAlat,body)
            }
          }
        }
      })
    }
})



function getRandomValue(){
    var max = 8000;
    var min = 5000;
    var value = Math.random()*(+max - +min) + +min;
    return {"out" : value};
  }

module.exports = socketApi;
