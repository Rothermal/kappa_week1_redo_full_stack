/**
 * Created by JFCS on 3/4/16.
 */
//var express = require('express');
//var router = express.Router();

var randomNumber = function (min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);

};

module.exports = randomNumber;