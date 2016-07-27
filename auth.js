/**
 * Created by AQ on 7/26/2016.
 */


(function ()
{
'use strict'

    var app = angular.module('myApp',[]);

    app.controller('mainCtrl',function($http)
    {
        console.log("Controller Initialize");

        var OAUTH2_CLIENT_ID = '897496247694-rvpegqimij33l260q5qvokao302mbh2e.apps.googleusercontent.com';
        var OAUTH2_SCOPES =  [
            'https://www.googleapis.com/auth/youtube',
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.me',
            'https://www.googleapis.com/auth/youtube.force-ssl'
        ];

        var _self = this;

        _self.loadYoutube = function()
        {
            console.log("youtube api loaded function call");

            gapi.client.load('youtube', 'v3', function (args) {
                console.log('Youtube API loaded',args);
            });
        };

       /* var snippet = {
            title : "Create live Streaming using API",
            scheduledStartTime : '2016-08-16T19:20:30.45+01:00',
        };

        var userData = {
            part: "snippet,status",
            snippet: snippet,
            status: "public"
        };*/



        _self.getEventsList = function()
        {

            $http.get('https://www.googleapis.com/youtube/v3/liveBroadcasts',
            {
                params:
                {
                    'part':"snippet, contentDetails",
                    'broadcastStatus':"all"

                },
                headers:{'Authorization':'Bearer ya29.CjAtAwD8qTUiCr3Lu9ji96T9NjlmC5RNMZEZ7nofva0UY2Hle24CbdEJESEvyu85Z-o'}

            }).then(function (data) {
                console.log("Data after Request : ",data);
            },function (error) {
                console.log("Error after Request : ",error);
            });

        };



        _self.createStream = function()
        {


            $http({
                method: 'POST',
                url: 'https://www.googleapis.com/youtube/v3/liveBroadcasts',
                data: userData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization':'Bearer ya29.CjAtA5lgBsHT1qHN7AmOPZRrVan4P0tsJDEvAbK6G92xUemS0gcK9pQilo7r7ux36NA'
                }
            }).then(function (data) {
                console.log("Data after Request : ",data);
            },function (error) {
                console.log("Error after Request : ",error);
            });


        };


        _self.googleAuthorize = function()
        {
            console.log("Function call");

                gapi.auth.authorize({
                    client_id: OAUTH2_CLIENT_ID,
                    scope: OAUTH2_SCOPES,
                    immediate: false
                }, function(res)
                {
                    if(res)
                    {
                       console.log("Response : ",res);
                    }
                    else
                    {
                        console.log("Error");
                    }
                });
        };


    });

})();