 //   var searchBar = MichaelBuble
 var artist = "Pink"
 var URL = "https://api.ipdata.co?api-key=3ab511acf8369181d1c468336c2a91788e4f23d06e8cfc42529766e0"
 var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + artist + "&apikey=zGbsNtFCffL494M49bvVQPFa988Pp0V3";
 var differ = ""

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
                 $("<td>").html("<a target = _blank input href =" + tickets + ">Get tickets</a>")
             );
             console.log(tickets)
             // Append the new row to the table
             $("tbody").append(newRow);
         }
     })
 }