var express = require('express');
var router = express.Router();
var connection = require('./connection')

/* GET users listing. */
router.post('/', cekId, function(req, res, next) {
  res.render('pendaftaran',{resCekId : 'Bisa Digunakan','id' : req.body.id})
});

router.get('/cek-id')

function cekId(req,res,next){
    connection.query("select `idPelanggan` from `pelanggan` where `idPelanggan`='"+req.body.id+"'",function(err,rows){
      if(err)
      console.log(err)

      if(!rows[0]){
        connection.query("select `idPelanggan` from `calonpelanggan` where `idPelanggan`='"+req.body.id+"'",function(err,rows){
            if(err)
            console.log(err)

            if(!rows[0])
            next()

            if(rows[0])
            res.render('pendaftaran',{resCekId : 'ID Tidak Bisa Digunakan'})
        })
      }
      if(rows[0])
      res.render('pendaftaran',{resCekId : 'ID Tidak Bisa Digunakan'})
    })
}

module.exports = router;
