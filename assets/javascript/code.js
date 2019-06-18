

// Deedzer api key 6f4d1eb22866cf66982fcd2dcbcdce2b


var api_key = "6f4d1eb22866cf66982fcd2dcbcdce2b"
var back_end_proxy = "https://cors-anywhere.herokuapp.com/";
var album_id = "";


$("#album_search_text").on("keyup", function () {
  event.preventDefault();
  $("#album_search_dropdown").empty();
});

$(".input-group-append").on("click", ".dropdown-item", function () {
  event.preventDefault();
  console.log($(this).attr("data-album-id"));
  album_id = $(this).attr("data-album-id");

  show_album();
});

$("#album_search_button").on("click", function () {
  event.preventDefault();
  var album_search_str = $("#album_search_text").val().trim();

  if (album_search_str != "") {

    var queryURL_Album_Search = back_end_proxy + "https://api.deezer.com/search?q=album:" + album_search_str + "&api_key=" + api_key;

    $("#album_search_text").val("");
    $.get({ url: queryURL_Album_Search, }).then(function (response) {

      album_ids = [];
      album_titles = [];
      console.log(response);
      var mydata = response.data;
      mydata.forEach(function (item, i) {
        // need to pass on mulitple listings of same album
        if ((album_ids.indexOf(item.album.id) == -1) && (album_titles.indexOf(item.album.title) == -1)) {
          album_ids.push(item.album.id);
          album_titles.push(item.album.title);
          var new_list_item = $("<div>");
          new_list_item.addClass("dropdown-item");
          new_list_item.attr("data-album-id", item.album.id);
          new_list_item.text(item.artist.name + " : " + item.album.title);
          $("#album_search_dropdown").append(new_list_item);
        }
      });
    });
  }
});


function show_album() {

  var queryURL_Album = back_end_proxy + "https://api.deezer.com/album/" + album_id + "&api_key=" + api_key;

  $("#band-info").empty();

  $.get({ url: queryURL_Album, }).then(function (response) {

    $("#band-info").append("<br>" + response.artist.name + " - ");
    $("#band-info").append(response.title + "<br><br>");

    var album_cover = $("<img>");
    album_cover.attr("src", response.cover_medium);
    $("#band-info").append(album_cover);
    $("#band-info").append("<br><br>");
    $("#album_search_dropdown").empty();


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

//var band = "Chet Baker";
//var queryURL_Artist = back_end_proxy + "https://api.deezer.com/search/?q=" + band + "&api_key=" + api_key;

// $.get({ url: queryURL_Artist, }).then(function (response) {
//   console.log(response);
//   var mydata = response.data;
//   mydata.forEach(function (item) {
//     console.log(item.title);
//     $("#band-info").append(item.title + "<br>");
//   });
// });

// var album_tracks = response.tracks.data;
    // album_tracks.forEach(function (item) {
    //   console.log(item.title);
    //   $("#band-info").append(item.title + "<br>");
    // });

