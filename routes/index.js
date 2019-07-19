var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  homeMiddleware(req,res,next);
});

function homeMiddleware(req,res,next){
  if(req.user == undefined){
    res.redirect('/login')
  }else{
    if (req.user.idPelanggan) {
      res.redirect('/pelanggan/dashboard');
    }else if (req.user.idAgen) {
      res.redirect('/pangkalan/dashboard-pangkalan');
    }
  }
};
module.exports = router;
