        //   var searchBar = MichaelBuble
        var artist = "Pink"
        var URL = "https://api.ipdata.co?api-key=3ab511acf8369181d1c468336c2a91788e4f23d06e8cfc42529766e0"
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword="+artist+"&apikey=zGbsNtFCffL494M49bvVQPFa988Pp0V3";
        var differ = ""

function geoLocate(){
    $.ajax({
        method: 'GET',
        url: URL, 
        async: false
     }).then(function(response){
         console.log(response);
        differ = response.region_code;
        queryURL += "&stateCode=" + differ;
        console.log("queryURL" + queryURL);
        getEvents(queryURL);
     });
    };   

 geoLocate()
        console.log("Outside geoLocate =" + differ);
    function getEvents(queryURL){
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            for(var i = 0; i < response._embedded.events.length; i++){
                var results = response._embedded.events[i];
                var venue = i + 1
                var newDiv = $("<div>");
                var h1 = $("<h1>").text("Venue " + venue);
                var time =  results.dates.start.localTime;
                var timePretty = moment(time, "HH:mm").format("h:mm A");
                var date = results.dates.start.localDate;
                var venueName = results._embedded.venues[0].name;
                var address = results._embedded.venues[0].address.line1;
                var city = results._embedded.venues[0].city.name;
                var state = results._embedded.venues[0].state.stateCode;
                var objArr = [{

                    Date: date,
                    Time: timePretty,
                    Venue_Name: venueName,
                    Venue_Address: address,
                    Venue_City: city,
                    Venue_State: state
                }];

                var newRow = $("<tr>").append(
                    $("<td>").text(objArr.Date),
                    $("<td>").text(objArr.Time),
                    $("<td>").text(ObjArr.Venue_Name),
                    $("<td>").text(ObjArr.Venue_Address),
                    $("<td>").text(ObjArr.Venue_City),
                    $("<td>").text(ObjArr.Venue_State)
                    );
                    
                    // Append the new row to the table
                    $("tbody").append(newRow);
                    newDiv.append(h1);
                    $(".ticketMaster").append(newDiv);
                }


            
        })
    }