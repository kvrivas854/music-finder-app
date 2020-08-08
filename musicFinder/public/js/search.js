

  $("#submit").on("click", function() {

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q="+$("#artist").val(),
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "778af56556msh60df0212f929a25p1bd6fajsn95b39208364f"
      }
    }
    
    $.ajax(settings).done(function (response) {

 //   $.get("/api/artist/:"+$("#artist").val()).done(function (response) {
      console.log(name);
      console.log(response)
      for (i=0; i<response.data.length; i++) {
        let newDiv = $("<div>")
        let newArtistDiv = $("<div>")
        let newArtistLink = $("<a>")
        let addArtistButton = $("<button>")
        let newTrackDiv = $("<div>")
        let addTrackButton = $("<button>")
        let newPreview = $("<a>")
        let newAlbumDiv = $("<div>")
        let addAlbumButton = $("<button>")
  
        newArtistDiv.text("Artist Name: "+response.data[i].artist.name)

        newArtistLink.text("Artist Deezer Link")
        newArtistLink.attr("href", response.data[i].artist.link)
        addArtistButton.text("Add this artist!")
        addArtistButton.addClass("add-artist")
        addArtistButton.attr("data-name", response.data[i].artist.name)
        newArtistDiv.append(addArtistButton)

        newTrackDiv.text("Track Name: "+response.data[i].title)
        addTrackButton.text("Add this track!")
        addTrackButton.addClass("add-track")
        addTrackButton.attr("data-name", response.data[i].title)
        newTrackDiv.append(addTrackButton)
        newPreview.text("Preview Link")
        newPreview.attr("href", response.data[i].preview)

        newAlbumDiv.text("Album Name: "+response.data[i].album.title)
        addAlbumButton.text("Add this album!")
        addAlbumButton.addClass("add-album")
        addAlbumButton.attr("data-name", response.data[i].album.title)
        newAlbumDiv.append(addAlbumButton)

        newDiv.addClass("container border border-dark")

        $(newDiv).append(newArtistDiv)
        $(newDiv).append(newArtistLink)
        $(newDiv).append(newTrackDiv)
        $(newDiv).append(newPreview)
        $(newDiv).append(newAlbumDiv)

        $('body').append(newDiv)
        $('body').append("<br>")
      }
    });
  })



$(document).on("click", ".add-artist", function () {
console.log($(this).data("name"))
})


$(document).on("click", ".add-track", function () {
  console.log($(this).data("name"))
  })


  $(document).on("click", ".add-album", function () {
    //   var query = "INSERT INTO artists (artist) ?";
    //   connection.query(query, { artist: response.data[i].artist.name }, function(err, res) {
    //     if (err) throw err;
    // })
    console.log($(this).data("name"))
    })

