$(document).ready(function() {

$('#gifsView').empty();


var apiKey = "CXsUC0ypMObjvqbhVQ2bM8EVHbkh5fmF";
var batchSize = 20;
var offset = 0

var animals = ["dog", "cat", "funny", "bye", "hello", "laugh", "crazy", "nice", "weirdo", "too much", "help", "scary", "funny"]

function createAnimalButtons() {
  $("#animalButtons").empty();

for (var i = 0; i < animals.length; i++) {
  var gifButton = $('<button>');
  gifButton.addClass("animals");
  gifButton.addClass("btn btn-info");
  gifButton.attr("data-name", animals[i]);
  gifButton.text(animals[i]);
  $("#animalButtons").append(gifButton);

  }
}
createAnimalButtons();

function addNewButton(){
    $("#addAnimal").on("click", function(){
    var add = $("#animal-input").val().trim();
    if (add == ""){
      return false;
    }
    animals.push(add);

    createAnimalButtons();
    return false;
    });
}
addNewButton();


function displayGifs() {
var action = $(this).attr("data-name");
var queryURL = `http://api.giphy.com/v1/gifs/search?q=${action}&limit=${batchSize}&api_key=${apiKey}`;

 $.ajax({
     url: queryURL,
     method: 'GET'
 })
 .done(function(response){
   console.log(response);
  $('#gifsView').empty();
  var results = response.data;

  for (var i = 0; i < results.length; i++) {

    var gifDiv = $("<div>");
    gifDiv.addClass("gifDiv");
    var gifURL = $(`<a href="${results[i].url}" target="_blank"><p>Click GIF to view or go to link!</a>`);

    var gifImage = $("<img>");
    gifDownload = $(`<p>Download: <span><img style="max-width:300px" src="${results[i].images.downsized.url}" target="_blank"></span></p>`);
    gifImage.attr("src", results[i].images.fixed_height_small_still.url);
    gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
    gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
    gifImage.attr("data-state", "still");
    gifImage.addClass("image");
    // gifDiv.append(gifImage);
    // gifDiv.append(gifURL);
    gifDiv.append(gifDownload);
    $("#gifsView").prepend(gifDiv);
  }
  });
  }



$(document).on("click", ".animals", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});





});

