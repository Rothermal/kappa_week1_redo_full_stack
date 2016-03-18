/**
 * Created by JFCS on 3/4/16.
 */
var express = require('express');
var randomNumber = require('../modules/randomNumber');
var md5 = require('md5');
var needle = require('needle');
var dotenv = require('dotenv').config();
var router = express.Router();
var timeStamp = Date.now();
var apiKey = process.env.publicKey;
var apiPrivateKey = process.env.privateKey;
var apiTs = timeStamp;
var md5Hash = md5(timeStamp + apiPrivateKey + apiKey);
var apiHash = md5Hash;


router.get('/',function(req,res){
    var offset = randomNumber(1,36508);
    var results = {};
    var url ="http://gateway.marvel.com:80/v1/public/comics?";
    needle.request('get',url,{
        "limit":1,
        "offset": offset,
        "apikey": apiKey,
        "ts": apiTs,
        "hash": apiHash
    },function(error,response) {
        results = response.body;
        //console.log(response.body);
        res.send(results);

    });

});



module.exports = router;