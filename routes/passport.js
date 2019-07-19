var express = require('express');
var connection = require('./connection');
var uuid = require('uuid/v4');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use('local-pelanggan', new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) { // callback with email and password from our form
  console.log("Inside passport strategy of pelanggan")
  console.log(req.body)
  connection.query("SELECT * FROM `pelanggan` WHERE `email` = '" + email + "'",function(err,rows){
    if (err){
      req.session.destroy()
      return done(err);
      }
    if (!rows.length) {
      console.log("email tidak ditemukan")
      return done(null, false)// req.flash is the way to set flashdata using connect-flash
      }

        // if the user is found but the password is wrong
    if (!( rows[0].password == password)){
      console.log("Pass salah")
      return done(null, false); // create the loginMessage and save it to session as flashdata
      }
      // all is well, return successful user
      console.log(rows[0])
      return done(null, rows[0])
      });
    })
  );

  //konfigurasi authentication passport s
  passport.use('local-agen', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) { // callback with email and password from our form
    console.log("Inside passport strategy of agen")
    connection.query("SELECT * FROM `agen` WHERE `email` = '" + email + "'",function(err,rows){
      if (err){
        req.session.destroy()
        return done(err);

      }
      if (!rows.length) {
        console.log("email tidak ditemukan")
        return done(null, false)// req.flash is the way to set flashdata using connect-flash
        }
      // if the user is found but the password is wrong
      if (!( rows[0].password == password)){
        console.log("Pass salah")
        return done(null, false); // create the loginMessage and save it to session as flashdata
        }
      // all is well, return successful user
      console.log(rows[0])
        return done(null, rows[0]);
      });
  })
);

passport.serializeUser(function(req,user, done) {
  console.log("Inside Serialize user")
  console.log(req.body)
  console.log(user)
  if(req.body.masukSebagai === 'Agen'){
    done(null, user.idAgen);
  }else if(req.body.masukSebagai === 'Pelanggan'){
    done(null,user.idPelanggan)
  }
  });
  // used to deserialize the user
  passport.deserializeUser(function(req, id, done) {
    console.log("inside deserialize")
    console.log(id)
    connection.query("SELECT * FROM `agen` where `idAgen`='"+id+"'",function(err,rows){
      if(err){
        console.log(err);
      }
      if(rows[0] == undefined){
        connection.query("SELECT `nama`,`idPelanggan`,`alamat`,`noHp`,`email`,`idAlat`,`token` FROM `pelanggan` join `alat` USING(idAlat) WHERE `idPelanggan`='"+id+"' ",function(err,rows1){
          if(err){
            console.log("lol")
          }
          console.log(rows1[0])
          done(err,rows1[0])
      })
      } else {
    done(err,rows[0])
      }
  })
})

module.exports = passport;
