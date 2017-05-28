'use strict';

const express       = require ('express');
const fs            = require('fs');
var gzip            = require('gzip');
var http            = require('http');


/**
 * Register application to Eureka Server
 * @param options . An object containing inputs for registration requests.
 * @param callback
 */
exports.register = function(options,callback){
    var payload = {};
    if(options.usingAWSDataCenter == true){
        payload = options.awsMetaData;
    }else{
        payload = options.customMetaData;
    }
    var register_opts = {
        'host':options.eurekaServer.host,
        'port':options.eurekaServer.port,
        'path':'/eureka/v2/apps/'+options.awsMetaData.instance.app,
        'headers':{'Content-Type':'application/json'},
        'method':'POST'
    };

    var postRequest = http.request(register_opts, function(response){
        if(response.statusCode == 204){
            heartbeat(options)
            callback('success');
            console.log('Registration successful');
        }
    });
    postRequest.on('error', function(e){
        console.log('Problem with request: '+e.message);
    });
    postRequest.write(JSON.stringify(payload));
    postRequest.end();
};

/**
 * Send the heartbeat every 30 seconds to indicate the
 * @param options. An object containing inputs for heartbeat request.
 */
function heartbeat (options){
    setInterval(function(){
        var heartbeat_opts = {
            'host': options.eurekaServer.host,
            'port': options.eurekaServer.port,
            'path':'/eureka/v2/apps/'+options.awsMetaData.instance.app+'/'+options.awsMetaData.instance.dataCenterInfo.metadata['instance-id'],
            'method':'PUT'
        };
        var heartbeatReq = http.request(heartbeat_opts, function(response){
            if(response.statusCode == 200){
                console.log('Heartbeat sent successfully');
            }else{
                console.log('Unusual response code from Sever: '+response.statusCode);
            }
        });
        heartbeatReq.on('error', function(error){
            console.log('Problem with Heartbeat Request: '+error.message);
        });
        heartbeatReq.end();
    }, 30000);
}

