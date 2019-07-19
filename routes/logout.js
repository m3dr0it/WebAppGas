var express = require('express');
var router = express.Router();
var timerPangkalan;

router.get('/',function(req,res,next){
  clearInterval(timerPangkalan);
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
