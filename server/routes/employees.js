/**
 * Created by JFCS on 3/17/16.
 */
var express = require('express');
var router = express.Router();
var md5 = require('md5');
var needle = require('needle');
var dotenv = require('dotenv').config();
var timeStamp = Date.now();
var apiKey = process.env.publicKey;
var apiPrivateKey = process.env.privateKey;
var apiTs = timeStamp;
var md5Hash = md5(timeStamp + apiPrivateKey + apiKey);
var apiHash = md5Hash;
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/weekone_redo';

//if(connectionString = process.env.DATABASE_URL) {
//    pg.defaults.ssl = true;
//}



router.get('/:name',function(req,res){
        console.log('u hit it. employees routes',req.params);

    var name = req.params.name;
    var results = {};
    var url = "http://gateway.marvel.com//v1/public/characters?";
    needle.request('get',url,{
        //"limit": 1,
        //"offset": offset,
        "name":name,
        "apikey": apiKey,
        "ts": apiTs,
        "hash": apiHash
    },function(error,response) {
        results = response.body;
        //console.log(response.body.data.results[0].name);
        res.send(results);

    });
    //console.log('they got got!');
});

router.get('/',function (request,response){

        pg.connect(connectionString,function(err,client,done){
            if(err){
                done();
                console.log("error connecting to database",err);
                response.status(500).send(err);
            } else{
                var results = [];
                var query = client.query("SELECT * FROM employees");
            }
            query.on('row',function(row){
                console.log(row);
                results.push(row);
            });
            query.on('end',function(){
                done();
                response.send(results);
            });
            query.on('error',function(error){
                console.log('Error returning query', error);
                done();
                response.status(500).send(error);
            });
        });
});




router.post('/employees',function(request,response){

    console.log('they got posted!',request.body);
});


module.exports = router;