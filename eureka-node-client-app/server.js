'use strict';

const express       = require('express');
const eurekaClient  = require('./client');
const fileSystem    = require('fs');
const appName       = 'Hello_World';

var configParams = JSON.parse(fileSystem.readFileSync('./config/application.json'));
const PORT = 9999;
const app = express();

app.get('/', function(req, res){
    configParams.awsMetaData.instance.app = appName;
    configParams.awsMetaData.instance.port.$ = PORT;
    configParams.customMetaData.instance.app = appName;
    configParams.customMetaData.instance.port.$ = PORT;
	eurekaClient.register(configParams, function (response) {
	    if(response == 'success'){
            res.send('Service Registered with eureka server');
        }
    });
});

app.listen(PORT);
