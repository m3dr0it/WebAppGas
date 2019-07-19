var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var hbs = require('hbs');
var fileStore = require('session-file-store')(session);
var uuid = require('uuid/v4');
var favicon = require('express-favicon')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
//route pelanggan
var indexPelanggan = require('./routes/pelanggan/indexPelanggan');
var logoutRouter = require('./routes/logout');
//route pangkalan
var dashboardPangkalanRouter = require('./routes/pangkalan/dashboard-pangkalan');
var daftarPelangganRouter = require('./routes/pangkalan/daftar-pelanggan');
var alatMonitoringRouter = require('./routes/pangkalan/alat-monitoring');
var calonPelangganRouter = require('./routes/pangkalan/calon-pelanggan')
var cekId = require('./routes/pangkalan/cek-id');
var hapusPelanggan = require('./routes/pangkalan/hapus-pelanggan');
var konfirmasiPelanggan = require('./routes/pangkalan/konfirmasi-pelanggan');
var pendaftaran = require('./routes/pendaftaran');
var tambahPelanggan = require('./routes/pangkalan/tambah-pelanggan');
var ubahData = require('./routes/pangkalan/ubah-data');
var alatMonitoringRouter = require('./routes/pangkalan/alat-monitoring');
var authMobile = require('./routes/mobile/authMobile');
var checkMobile = require('./routes/mobile/checkMobile').checkMobile;
var checkToken = require('./routes/mobile/checkToken');
var getData = require('./routes/mobile/data');
var getProfile = require('./routes/mobile/profile');
var getDataNode = require('./routes/alat/data-node');

var app = express();
var socketApi = require('./socketApi');
var io = socketApi.io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(function(req,res,next) {
  req.io = io;
  next()
})
app.use(function(req, res, next) {
  if (req.url != '/favicon.ico') {
    return next();
  } else {
    res.status(200);
    res.header('Content-Type', 'image/x-icon');
    res.header('Cache-Control', 'max-age=4294880896');
    res.end();
  }
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session(
  {
    genid : function(req){
      console.log("Inside the session middleware")
      console.log(req.sessionID)
      return uuid();
    },
    store : new fileStore(),
    secret : 'keyboard cat',
    resave : true,
    cookie : {
      originalMaxAge : null
    },
    saveUninitialized : true
  }
));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/pelanggan',function(req,res,next) {
    console.log(req.user);
    if (req.user) {
      console.log("ada user");
      console.log(req.user);
      if (req.user.idPelanggan) {
        next();
      }else if (req.user.idAgen) {
        res.render('error')
      }
    }else if(req.user == undefined){
      console.log("tidak ada user");
      res.redirect('/login');
    }
})

app.use('/pangkalan',function (req,res,next) {
  console.log(req.user)
  if (req.user) {
    console.log("ada user");
    if (req.user.idAgen) {
      next();
    }else if (req.user.idPelanggan) {
      res.render('error');
    }
  }else if(req.user == undefined){
    console.log("tidak ada user");
    res.redirect('/login');
  }
});

app.use('/',indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/pelanggan',indexPelanggan);
app.use('/pangkalan/dashboard-pangkalan',dashboardPangkalanRouter);
app.use('/pangkalan/daftar-pelanggan',daftarPelangganRouter);
app.use('/pangkalan/alat-monitoring',alatMonitoringRouter);
app.use('/pangkalan/calon-pelanggan',calonPelangganRouter);
app.use('/pangkalan/logout',logoutRouter);
app.use('/pendaftaran',pendaftaran);
app.use('/pangkalan/hapus-pelanggan',hapusPelanggan);
app.use('/pangkalan/konfirmasi-pelanggan',konfirmasiPelanggan);
app.use('/pangkalan/ubah-data',ubahData);
app.use('/pangkalan/alat-monitoring',alatMonitoringRouter);
app.use('/login-mobile',checkMobile,authMobile);
app.use('/mobile/data',getData);
app.use('/data',getDataNode);
app.use('/mobile/profile',getProfile);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
