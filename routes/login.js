var express = require('express');
var router = express.Router();
var passport = require('./passport');

router.get('/',function(req,res,next){
  homeMiddleware(req,res,next);
});

function homeMiddleware(req,res,next){
  if(req.user == undefined){
    res.render('login');
  }else{
    if (req.user.idPelanggan) {
      res.redirect('/pelanggan/dashboard');
    }else if (req.user.idAgen) {
      res.redirect('/pangkalan/dashboard-pangkalan');
    }
  }
};
router.post('/',function(req,res,next) {
  console.log(req.body)
  if(req.body.masukSebagai === 'Agen'){
    authenticateAgen(req,res,next)
  }else if(req.body.masukSebagai === 'Pelanggan'){
    authenticatePelanggan(req,res,next)
  }
})

function authenticateAgen(req,res,next){
  passport.authenticate('local-agen', (err, user, info) => {
    console.log('Inside passport.authenticate() callback');
    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
    console.log(`req.user: ${JSON.stringify(req.user)}`)
    req.login(user, (err) => {
      console.log('Inside req.login() callback')
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      console.log(`req.user: ${JSON.stringify(req.user)}`)
      if(err){
        console.log(err)
        res.redirect('/login')
      }else{
      return res.redirect('/pangkalan/dashboard-pangkalan')}
    })
  })(req, res, next);
}
function authenticatePelanggan(req,res,next){
  console.log(req.body.masukSebagai)
  passport.authenticate('local-pelanggan', (err, user, info) => {
    console.log('Inside passport.authenticate() callback')
    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
    console.log(`req.user: ${JSON.stringify(req.user)}`)
    req.login(user, (err) => {
      console.log('Inside req.login() callback')
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      console.log(`req.user: ${JSON.stringify(req.user)}`)
      if(err){
        console.log(err)
        res.redirect('/login')
      }else{
      return res.redirect('/pelanggan/dashboard')}
    })
  })(req, res, next);
}

module.exports = router;
