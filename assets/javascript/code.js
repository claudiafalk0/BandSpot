

// Deedzer api key 6f4d1eb22866cf66982fcd2dcbcdce2b

var firebaseConfig = {
  apiKey: "AIzaSyB9M40dFY8SrZGENR22Fe5ZEZ9I6quEne4",
  authDomain: "myapp1-78be2.firebaseapp.com",
  databaseURL: "https://myapp1-78be2.firebaseio.com",
  projectId: "myapp1-78be2",
  storageBucket: "myapp1-78be2.appspot.com",
  messagingSenderId: "524356125498",
  appId: "1:524356125498:web:88fbf4ad186eab6d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var api_key = "6f4d1eb22866cf66982fcd2dcbcdce2b"
var back_end_proxy = "https://cors-anywhere.herokuapp.com/";

var current_album = {
  artist: "",
  title: "",
  cover: "",
  id: 0
};

function clear_current_album() {
  current_album = {
    artist: "",
    title: "",
    cover: "",
    id: 0
  };
}


// clear viewed list
$("#clear_list_button").on("click", function () {
  database.ref().remove();
  $("#viewed_list_dropdown").empty();
  $("#band-info").empty();
  $(".deezer-widget-player").empty();
  clear_current_album();
});

// delete current album from viewed list button
$("#delete_item_button").on("click", function () {
  delete_firebase_element(current_album.id);
  $("#band-info").empty();
  $(".deezer-widget-player").empty();
  reset_viewed_list_dropdown();
  clear_current_album();
});

// choose album from album search dropdown
$("#alist").on("click", ".dropdown-item", function () {
  event.preventDefault();
  var album_id = $(this).attr("data-album-id");
  $("#album_search_dropdown").empty();
  show_album(album_id);
});

// choose album from viewed list dropdown
$("#vlist").on("click", ".dropdown-item", function () {
  event.preventDefault();
  var album_id = $(this).attr("data-album-id");
  show_album(album_id);
});

// album search dropdown click - get text from input - get albums info from deezer - repopulate dropdown
$("#album_search_button").on("click", function () {

  event.preventDefault();
  var album_search_str = $("#album_search_text").val().trim();

  if (album_search_str != "") {
    $("#album_search_text").val("");
    var queryURL_Album_Search = back_end_proxy + "https://api.deezer.com/search?q=album:" + album_search_str + "&api_key=" + api_key;

    $.get({ url: queryURL_Album_Search, }).then(function (response) {
      var album_ids = [];
      var album_titles = [];
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


//add to list of viewed albums dropdown upon push to firebase
database.ref().on("child_added", function (snapshot) {

  var album = {
    artist: snapshot.val().artist,
    title: snapshot.val().title,
    cover: snapshot.val().cover,
    id: snapshot.val().id
  }
  var new_list_item = $("<div>");
  new_list_item.addClass("dropdown-item");
  new_list_item.attr("data-album-id", album.id);
  new_list_item.text(album.artist + " : " + album.title);
  $("#viewed_list_dropdown").append(new_list_item);

}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


function reset_viewed_list_dropdown() {

  $("#viewed_list_dropdown").empty();
  var ref = firebase.database().ref();
  ref.once("value", snapshot => {

    const userData = snapshot.val();
    snapshot.forEach(function (childSnapshot) {

      var album = {
        artist: childSnapshot.val().artist,
        title: childSnapshot.val().title,
        cover: childSnapshot.val().cover,
        id: childSnapshot.val().id
      }
      var new_list_item = $("<div>");
      new_list_item.addClass("dropdown-item");
      new_list_item.attr("data-album-id", album.id);
      new_list_item.text(album.artist + " : " + album.title);
      $("#viewed_list_dropdown").append(new_list_item);
    })
  })
}

function check_exists(album) {

  var exists = false;

  var ref = firebase.database().ref();
  ref.orderByChild("title").equalTo(album.title).once("value", snapshot => {
    const userData = snapshot.val();
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      if (userData && childData.title === album.title) {
        exists = true;
      }
    })
  })
  if (exists)
    return (true);
  else
    return (false);
}

function delete_firebase_element(album_id) {

  var ref = firebase.database().ref();
  ref.once("value", snapshot => {
    snapshot.forEach(function (childSnapshot) {
      if (snapshot.val() && childSnapshot.val().id === album_id) {
        ref.child(childSnapshot.key).remove();
      }
    })
  })
}


// take album id - get info from deezer and put up song play widget
function show_album(album_id) {

  var queryURL_Album = back_end_proxy + "https://api.deezer.com/album/" + album_id + "&api_key=" + api_key;

  $("#band-info").empty();
  $.get({ url: queryURL_Album, }).then(function (response) {

    var album = {
      artist: response.artist.name,
      title: response.title,
      cover: response.cover_medium,
      id: album_id
    }

    if (!check_exists(album))
      database.ref().push(album);

    current_album = album;

    $("#band-info").append("<br>" + album.artist + " - ");
    $("#band-info").append(album.title + "<br><br>");

    var $cover_img = $("<img>");
    $cover_img.attr("src", album.cover);
    $("#band-info").append($cover_img);
    $("#band-info").append("<br><br>");
  });


  // show  deezer widget for current album
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

