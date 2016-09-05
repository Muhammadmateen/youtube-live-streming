/**
 * Created by AQ on 7/26/2016.
 */


(function ()
{
'use strict'

    var app = angular.module('myApp',[]);

    app.controller('mainCtrl',function($http,$scope,$q)
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
        };*/

        var userData = {
        part: 'snippet,status',
        snippet: {
            title:"Ali in innovatoras live streaming",
            scheduledStartTime:"2016-07-29T20:14:38.448Z"
        },
        status: {
            privacyStatus:"public"
        }
    };


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


        /*var snippet= {
            title:"Ali in innovatoras live streaming",
                scheduledStartTime:"2016-07-29T20:14:38.448Z"
        };

        var status={
            privacyStatus:"public"
        }
       var part = "snippet,status";

       var userData = [part,snippet,status]*/


        $scope.createStream = function()
        {

            /*console.log("Function call");
            $http({
                method: "POST",
                url: "https://www.googleapis.com/youtube/v3/liveBroadcasts",
                data: userData,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer ya29.CjAvA26IoX4gCooij2R3D4XuIF00yQcef5KDctwDO-h06-ddQzwJb-AHeOthsXNX_bI'
                }
            }).then(function (data) {
                console.log("Data after Request : ",data);
            },function (error) {
                console.log("Error after Request : ",error);
            });*/


            $http.post('https://www.googleapis.com/youtube/v3/liveBroadcasts',userData,{
             headers:
             {
             'Content-Type': 'application/json',
                 'Authorization':'Bearer ya29.CjAvA26IoX4gCooij2R3D4XuIF00yQcef5KDctwDO-h06-ddQzwJb-AHeOthsXNX_bI'
             }
             }).then(function (data) {
             console.log("Data after Request : ",data.data);
             },function (error) {
             console.log("Error after Request : ",error);
             });



            /*$http({
                url: "https://www.googleapis.com/youtube/v3/liveBroadcasts",
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization':'Bearer ya29.CjAvA2UFwvurLMkc5uNv1lEGVQdaaJIKnutQ7Fh2-9WnXUJw7x3b7c162t1cIOPyxXs'},
                data: $.param({
                    'part':'snippet,status',
                    'snippet':snippet,
                    'status': status
                })
            }).then(function(data) {
                console.log(data);
            }, function (er) {
                console.log(er);
            })*/

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
                },function(error)
                {
                    console.log("Error :asdas ",error);
                });
        };


    });

})();