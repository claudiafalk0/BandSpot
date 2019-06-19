// Deedzer api key 6f4d1eb22866cf66982fcd2dcbcdce2b
var aName = "";
var api_key = "6f4d1eb22866cf66982fcd2dcbcdce2b"
var back_end_proxy = "https://cors-anywhere.herokuapp.com/";
var album_id = "";
var summary_api_key = "4449581c4e4db7c380fae2d8fd50142d"
var summary_method = "artist.getinfo"
var summaryURL = "http://ws.audioscrobbler.com/2.0/?method=" + summary_method + "&artist=" + artist + "&api_key=" + summary_api_key + "&format=json&autocorrect=1";
var URL = "https://api.ipdata.co?api-key=3ab511acf8369181d1c468336c2a91788e4f23d06e8cfc42529766e0"
var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + aName + "&apikey=zGbsNtFCffL494M49bvVQPFa988Pp0V3";
var differ = ""


$("#album_search_text").on("keyup", function () {
    $("#album_search_dropdown").empty();
});

$(".input-group-append").on("click", ".dropdown-item", function (event) {
    event.preventDefault();

    console.log($(this).attr("data-album-id"));
    album_id = $(this).attr("data-album-id");

    $("#album_search_dropdown").empty();

    $(".ticketMaster").show().css("display", "block")
    show_album();
});

function artist(summaryURL) {
    $.ajax({
            url: summaryURL,
            method: "GET",
        })
        .then(function (response) {
            var results = (response.artist.bio.summary);
            console.log(results)
            var values = results.split(" <").shift();

            $("#bio").text(values);
        });
}

$("#album_search_button").on("click", function (event) {

    event.preventDefault();

    var album_search_str = $("#album_search_text").val().trim();
    var queryURL_Album_Search = back_end_proxy + "https://api.deezer.com/search?q=album:" + album_search_str + "&api_key=" + api_key;

    $.get({
        url: queryURL_Album_Search,
        async: false,
    }).then(function (response) {
        console.log(response)
        var mydata = response.data;
        mydata.forEach(function (item) {
            var new_list_item = $("<div>");
            new_list_item.addClass("dropdown-item");
            new_list_item.attr("data-album-id", item.album.id);
            new_list_item.text(item.title);
            $("#album_search_dropdown").append(new_list_item);
        });
    });
    $("#album_search_dropdown").empty();
    $("#album_search_text").val("");
});


function show_album(queryURL_Album) {

    var queryURL_Album = back_end_proxy + "https://api.deezer.com/album/" + album_id + "&api_key=" + api_key;

    $.get({
        url: queryURL_Album,
    }).then(function (response) {
        console.log(response)
        var artistName = response.artist.name
        $("#artistName").text(artistName)

        var album_cover = $("<img>");
        album_cover.attr("src", response.cover_medium);
        $("#artistImage").html(album_cover);

        aName = artistName;
        // console.log(artist)
        // console.log(summaryURL)
        artist(summaryURL);
    });

    var widget_album = "https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=ff0000&layout=dark&size=medium&type=album&id=" + album_id + "&app_id=353884";
    $(".deezer-widget-player").attr("data-src", widget_album);

    (function () {
        var w = document[typeof document.getElementsByClassName === 'function' ? 'getElementsByClassName' : 'querySelectorAll']('deezer-widget-player');
        for (var i = 0, l = w.length; i < l; i++) {
            w[i].innerHTML = '';
            var el = document.createElement('iframe');
            el.src = w[i].getAttribute('data-src');
            el.scrolling = w[i].getAttribute('data-scrolling');
            el.frameBorder = w[i].getAttribute('data-frameborder');
            el.setAttribute('frameBorder', w[i].getAttribute('data-frameborder'));
            el.allowTransparency = w[i].getAttribute('data-allowTransparency');
            el.width = w[i].getAttribute('data-width');
            el.height = w[i].getAttribute('data-height');
            w[i].appendChild(el);
        }
    }());
}

function geoLocate() {
    $.ajax({
        method: 'GET',
        url: URL,
        async: false
    }).then(function (response) {
        console.log(response);
        differ = response.region_code;
        queryURL += "&stateCode=" + differ;
        console.log("queryURL" + queryURL);
        getEvents(queryURL);
    });
};

geoLocate()
console.log("Outside geoLocate =" + differ);

function getEvents(queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response._embedded.events.length; i++) {
            var results = response._embedded.events[i];
            var name = results.name;
            var time = results.dates.start.localTime;
            var timePretty = moment(time, "HH:mm").format("h:mm A");
            var date = results.dates.start.localDate;
            var venueName = results._embedded.venues[0].name;
            var address = results._embedded.venues[0].address.line1;
            var city = results._embedded.venues[0].city.name;
            var state = results._embedded.venues[0].state.stateCode;
            var tickets = results.url;

            console.log(tickets);

            var newRow = $("<tr>").append(
                $("<td>").text(name),
                $("<td>").text(date),
                $("<td>").text(timePretty),
                $("<td>").text(venueName),
                $("<td>").text(address),
                $("<td>").text(city),
                $("<td>").text(state),
                $("<td>").html("<a id='ticket-button' target = _blank input href =" + tickets + ">Get tickets</a>")
            );
            console.log(tickets)
            // Append the new row to the table
            $("tbody").append(newRow);
        }
    })
}