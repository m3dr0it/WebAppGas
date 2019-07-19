var express = require('express');
var mysql = require('mysql');
var connectionDb = mysql.createConnection({
  host:'db4free.net',
  user:'ahmadmardiana',
  password:'4lphaMuD3lt4',
  database:'sistem_info_gas'
});

module.exports = connectionDb;
