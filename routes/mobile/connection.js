var express = require('express');
var mysql = require('mysql');
var connectionDb = mysql.createConnection({
  host:'db4free.net',
  user:'ahmadmardiana',
  password:'',
  database:'sistem_info_gas'
});

module.exports = connectionDb;
