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
        differ = 80204;
        queryURL += "&postalCode=" + differ;
        console.log("queryURL" + queryURL);
        getEvents(queryURL);
     });
    };   
        //     $.ajax({
        //         url: URL,
        //         method: "GET"
        //     }).then(function(response){
        //         var postal = response.postal;
        //         console.log(response.postal);
        //     })
        // };
 geoLocate()
        console.log("Outside geoLocate =" + differ);
    function getEvents(queryURL){
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            // $(".ticketMaster").append(response._embedded.events[0].dates.start.localDate);
            // var URL = "https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=" + getID + "&apikey=zGbsNtFCffL494M49bvVQPFa988Pp0V3"
        })
    }