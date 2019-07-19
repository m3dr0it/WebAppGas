var express = require('express');
var router = express.Router();
var connection = require('./connection');
var chekToken = require('./checkToken').checkToken
/* GET users listing. */
router.get('/:idAlat/:kapasitas/:kebocoran',chekToken,function(req, res, next) {
    console.log(req.params.idAlat);
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    connection.query("INSERT INTO `"+req.params.idAlat+"` (`waktu`, `kapasitas`, `kebocoran`) VALUES ('"+dateTime+"', '"+req.params.kapasitas+"', '"+req.params.kebocoran+"');",function(err,result){
        if(err){
            console.log(err)
            res.send("error"+err)
        }else{        
            res.send("Data Diterima Server");
        }
    });
});

module.exports = router;
