/**
 * Created by JFCS on 3/18/16.
 */
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/weekone_redo';

if(connectionString = process.env.DATABASE_URL) {
    pg.defaults.ssl = true;
}

// incomplete.

//pg.connect(connectionString,function(err,client,done){
//    if(err){
//        done();
//        console.log("error connecting to database",err);
//    } else {
//        var query = client.query('CREATE TABLE IF NOT EXISTS employees (id SERIAL PRIMARY KEY ,name varchar(80),address varchar(120),city varchar(80),state varchar(3),zip_code varchar(5) );');
//
//        query.on('end',function() {
//            done();
//            console.log('successfully created table');
//        });
//        query.on('error',function(error){
//            console.log('Error returning query', error);
//            done();
//        });
//
//
//    }
//
//});

