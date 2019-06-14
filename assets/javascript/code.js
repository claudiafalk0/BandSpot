


// Deedzer api key 6f4d1eb22866cf66982fcd2dcbcdce2b



console.log("in js");

var band = "The Beatles";
var api_key = "6f4d1eb22866cf66982fcd2dcbcdce2b"
var back_end_proxy = "https://cors-anywhere.herokuapp.com/";
var queryURL = back_end_proxy + "https://api.deezer.com/search/?q=" + band + "&api_key=" + api_key;


  $.get({
    url: queryURL,
  }).then(function(response) {
      console.log(response);
      var mydata  = response.data;

      console.log(mydata[0].title); 

      for(i = 0; i < mydata.length; i++) {
          console.log(mydata[i].title + "/n");
          $("#songs").append(mydata[i].title, "<br>");
}
    //   mydata.forEach(function(item, i) {
    //       console.log(item[i]);
    //       $("#songs").append(item[i] + "/n");
    //   });
});
    // Methods run on jQuery selectors return the selector they we run on
    // This is why we can create and save a reference to a td in the same statement we update its text
    // var titleTd = $("<td>").text(response.Title);
    // var yearTd = $("<td>").text(response.Year);
    // var actorsTd = $("<td>").text(response.Actors);
      
    // // Append the newly created table data to the table row
    // tRow.append(titleTd, yearTd, actorsTd);
    // Append the table row to the table body
    // $("tbody").append(tRow);

  // https://api.deezer.com/search/?q=beatles&api_key=6f4d1eb22866cf66982fcd2dcbcdce2b
