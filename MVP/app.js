//Platforms array:
var platformsArray = [ 
  "", 'Xbox 360', 'Xbox One', 'Xbox', 'PS2', 'PS3', 'PS4', 'PC', 'Wii', 'Wii U', '3DS', 'New 3DS', 'DS', 'Vita', 'PSP', 'iPhone', 'iPad', 
  'Android', 'Game Boy', 'Game Boy Advance', 'N64', 'Mac', 'GameCube', 'Dreamcast', 'PlayStation',
  'N-Gage'];

//populate select options
$('.review').hide();
   
var selectMenu = document.getElementById('platformSelect');
for(var i = 0; i < platformsArray.length; i++) {
    var opt = document.createElement('option');
    opt.text = platformsArray[i];
    opt.value = platformsArray[i];
    selectMenu.appendChild(opt);
}

//pass select value into findReviews()
//call this function on submit


// $(document).ready(function() {
    var platformValue = document.getElementById('platformSelect').value;
    var gameTitle = document.getElementById('title').value;
    var moonwalk = document.createElement('img');
    $(moonwalk).addClass('loadingGif');
    moonwalk.src = 'assets/tumblr_md4o8jw7zN1r54c4yo1_500_large.gif'

    $('.submit').on('click', function(e) {
      e.preventDefault();
      $('.review').empty();
      $('.review').hide()
      // $('.review').show();
      $('.loading').append(moonwalk);
      var platformValue = document.getElementById('platformSelect').value.toLowerCase();
      var gameTitle = document.getElementById('title').value.toLowerCase();
      $('#title').val = '';
      findReviews(platformValue, gameTitle);
    });
// });




//ajax request 
function findReviews(platform, title){
	
    var platform = platform.replace(/ /g, "+");
    var title = title.replace(/ /g, "+");
    console.log('title:', title, 'Platform:', platform);
    if(!title){
    	var errorMess = document.createElement('h2');
    	errorMess.textContent ="You must enter a title";
    	$('.review').append(errorMess);
    }
    if(platform === ""){
    	var url = 'https://ahmedakhan-game-review-information-v1.p.mashape.com/api/v1/information?game_name=' + title
    }
    else if(platform){
    	var url = 'https://ahmedakhan-game-review-information-v1.p.mashape.com/api/v1/information?console='+ platform +'&game_name=' +title
    }

    // var testUrl = "https://ahmedakhan-game-review-information-v1.p.mashape.com/api/v1/information?console=ps3&game_name=borderlands"
    // console.log('Run test url:', testUrl === url);
    // console.log('URL: ', url)
    // console.log('TestUrl:', testUrl)
	$.ajax({
	    url: url,
	    headers: {'X-Mashape-Key' : apiKey},
	    method: 'GET',
	    contentType: 'application/json',
	    success: addReviews
	  })
	  // .then(function(val){
	  // });

};

function addReviews (response){
	console.log('SUCCESS!', response);
	$('.review').empty();
  $('.loading').empty();

	if(response.message === "result not found"){
		var errorMess = document.createElement('h2');
    errorMess.textContent ="Result not found.";
    $('.review').append(errorMess);
    var suggestion = document.createElement('h4');
    suggestion.textContent = 'Suggestions: ';
    var suggestList = document.createElement('ul')
    if(response.possibleChoices){
      var choices = response.possibleChoices;
      for(var i=0; i<choices.length; i++){
        var option = document.createElement('li');
        option.textContent = choices[i];
        $(suggestList).append(option);
      }
    }
    
    $('.review').append(suggestion);
    $('.review').append(suggestList);
    	
	}
  $('.review').show();

	var title = document.createElement('h1')
	var thumb = document.createElement('img')
	var genre = document.createElement('h5')
	var average = document.createElement('h3')
	var genreContent = 'Genre:' +"  "+ response.result.genre.join(', ');
  var platform = document.createElement('h5')
  var available = document.createElement('h5')
  platform.textContent = 'Platform:' +"  "+ response.result.platform;
	thumb.src = response.result.thumbnail;
	var gameTitle = response.result.name;
	var averageScore = "Average Score: " + response.result.averageScore;
	title.textContent = gameTitle;
	genre.textContent = genreContent;
	average.textContent = averageScore;

  $('.review').append(title);
  $('.review').append(average);
  $('.review').append(thumb);
  $('.review').append(genre);
  $('.review').append(platform);
  if(response.result.availablePlatform.length > 0){
    available.textContent = 'Available:' +"  "+ response.result.availablePlatform.join(', ');
    $('.review').append(available);
  }

  

};




