// $(document).ready(function() {
	
// 	$('.card').delay(1800).queue(function(next) {
// 		$(this).removeClass('hover');
// 		$('a.hover').removeClass('hover');
// 		next();
// 	});
// });

async function getInputValue() {
  // Selecting the input element and get its value 
var inputVal = document.getElementById("search9").value;
sessionStorage.setItem("favoriteMovie", inputVal);
window.open("search.html");
alert(sessionStorage);
const URL = `https://newsapi.org/v2/everything?q=${inputVal}&apiKey=f069b2caf2d14283a9fefe8dcd7c7bf4`;
try {
const fetchResult = fetch(URL)
const response = await fetchResult;
const jsonData = await response.json();
console.log(jsonData);

var ttl = "",
url = "",
des = "",
imgurl = "";

var str, i=0;
for (var i in jsonData.articles)
{

url = jsonData.articles[i].url;
ttl = jsonData.articles[i].title;
des = jsonData.articles[i].description;
imgurl = jsonData.articles[i].urlToImage;
str = '<div class="col-lg-3 col-md-6"><div class="choice_item"><img class="img-fluid" src="'+ imgurl + '" alt="" onerror="this.onerror=null;this.src="http://example.com/existent-image.jpg"><div class="choice_text"><div class="date"><a class="gad_btn" href="'+ url + '" target="_blank">Gadgets</a><a href="#"><i class="fa fa-calendar" aria-hidden="true"></i>Feb 24, 2020</a><a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i>05</a></div><a href="'+ url +'"><h4>'+ ttl +'</h4></a><p class="text1">'+ des +'</p></div></div></div>'

document.getElementById("#loi").innerHTML += str;	
}							
} catch(e){
throw Error(e);
}
}

 var into =  document.getElementById("search9").value;
 

  //Limits the number of characters in description 
//   generateSmallDescription(text)
//   { if(text){
// 	if(text.length > 120){
// 	  text= text.slice(0,120) + '...';
// 	  return text;
// 	}
// 	else{
// 	  return text;
// 	}
//   } }
    
  