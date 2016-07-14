/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

$(document).on('pageinit', '#home', function(){      
    var url = 'http://api.themoviedb.org/3/',
        mode = 'search/movie?query=',
        movieName = '&amp;query='+encodeURI('Batman'),        
        key = '&amp;api_key=470fd2ec8853e25d2f8d86f685d2270e';        
     
    $.ajax({
        url: url + mode + key + movieName ,
        dataType: 'jsonp',
        async: true,
        success: function (result) {
            ajax.parseJSONP(result);
        },
        error: function (request,error) {
            alert('Network error has occurred please try again!');
        }
    });         
});
 
$(document).on('pagebeforeshow', '#headline', function(){      
    $('#movie-data').empty();
    $.each(movieInfo.result, function(i, row) {
        if(row.id == movieInfo.id) {
            $('#movie-data').append('<li><img src='http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w185'+row.poster_path+''></li>');
            $('#movie-data').append('<li>Title: '+row.original_title+'</li>');
            $('#movie-data').append('<li>Release date'+row.release_date+'</li>');
            $('#movie-data').append('<li>Popularity : '+row.popularity+'</li>');   
            $('#movie-data').append('<li>Popularity : '+row.vote_average+'</li>');             
            $('#movie-data').listview('refresh');            
        }
    });    
});
 
$(document).on('vclick', '#movie-list li a', function(){  
    movieInfo.id = $(this).attr('data-id');
    $.mobile.changePage( '#headline', { transition: 'slide', changeHash: false });
});
 
var movieInfo = {
    id : null,
    result : null
}
 
var ajax = {  
    parseJSONP:function(result){  
        movieInfo.result = result.results;
        $.each(result.results, function(i, row) {
            console.log(JSON.stringify(row));
            $('#movie-list').append('<li><a href='' data-id='' + row.id + ''><img src='http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w185'+row.poster_path+''/><h3>' + row.title + '</h3><p>' + row.vote_average + '/10</p></a></li>');
        });
        $('#movie-list').listview('refresh');
    }
}   
