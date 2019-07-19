var express = require('express');
var router = express.Router();
var connection = require('./connection');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('cek-id');
});

router.get('/cek-id',function(req,res,next){
  res.render('cek-id')
})

router.post('/cek-id',function(req,res,next){
    connection.query("select `idPelanggan` from `pelanggan` where `idPelanggan`='"+req.body.id+"'",function(err,rows){
      if(err)
      console.log(err)

      if(!rows[0]){
        connection.query("select `idPelanggan` from `calonpelanggan` where `idPelanggan`='"+req.body.id+"'",function(err,rows1){
            if(err)
            console.log(err)

            if(!rows1[0])
            next()

            if(rows1[0])
            res.render('cek-id',{resCekId : 'ID Tidak Bisa Digunakan'})
        })
      }
      if(rows[0])
      res.render('cek-id',{resCekId : 'ID Tidak Bisa Digunakan'})
    })
},function(req,res,next){
  res.render('pendaftaran',{resCekId : 'Bisa Digunakan','id' : req.body.id});
})

router.post('/',function(req,res,next){
  var data = req.body;
    connection.query("INSERT INTO `calonpelanggan` (`no`,`idPelanggan`, `nama`, `alamat`,`noHp`,`email`, `password`) VALUES (NULL, '"+data.id+"','"+data.namaDepan+" "+data.namaBelakang+"', '"+data.alamat+"', '"+data.nohp+"', '"+data.email+"', '"+data.password+"');",function (err,rows, fields) {
      if (!!err) {
      console.log(err);
      }else {
      console.log('Calon pelanggan ditambahkan');

      res.render('pendaftaran-berhasil');
      }
    })
})

module.exports = router;
