export function dbconnect () {
    var express = require('express')
        , routes = require('./routes')
        , user = require('./routes/user')
        , http = require('http')
        , path = require('path');
    //var methodOverride = require('method-override');
    var app = express();
    var mysql      = require('mysql');
    var bodyParser=require("body-parser");
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'covoit',
        password : 'covoit',
        database : 'covoitaws'
    });

    connection.connect();

    return connection
}

export function hello() {
    return "Hello World";
}