$("#submitBtn").on("click", function () {
    var artist = "DJ khalid"
    var api_key = "4449581c4e4db7c380fae2d8fd50142d"
    var method = "artist.getinfo"

    // Constructing a queryURL using the animal name
    var queryURL = "http://ws.audioscrobbler.com/2.0/?method=" + method + "&artist=" + artist + "&api_key=" + api_key + "&format=json&autocorrect=1";

    // Performing an AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.artist.bio.summary;

            var values = results.split(" <").shift();

            $("#bio").text(values)
        });
});