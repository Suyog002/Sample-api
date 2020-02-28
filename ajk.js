class News{
	constructor(){
	  this.apiKey='1e16c4a3b19b43128e4b212ab30c427f';
	}
	
	//Fetch news
	async fetchNews(type,param1){
	  if(type=='topheadlines'){
		let url=`https://newsapi.org/v2/top-headlines?apiKey=${this.apiKey}&category=${param1}`;
		const response = await fetch(url);
		const responseData = await response.json();
		return responseData;
	  }
	  if(type == 'everything'){
		let url=`https://newsapi.org/v2/everything?apiKey=${this.apiKey}&q=${param1}`;
		const response = await fetch(url);
		const responseData = await response.json();
		return responseData;
	  }
	}
  }

  class UI{
	//UI for TopHeadlines
	showTopHeadlines(){
	  document.getElementById('everything-row').innerHTML=``;
	  document.getElementById('topheadlines-row').innerHTML=`
		<div class="col-md-4 mx-auto">
		   <div class="form-group">
			   <select class="custom-select rounded categories">
				 <option value="">Select Category</option>
				 <option value="business">Business</option>
				 <option value="entertainment">Entertainment</option>
				 <option value="general">General</option>
				 <option value="health">Health</option>
				 <option value="science">Science</option>
				 <option value="sports">Sports</option>
				 <option value="technology">Technology</option>
			   </select>
		   </div>
		   <button class="btn btn-info w-100 mb-2" type="submit" id="submit-btn">Get News</button>
	   </div>
	  `;
	}
  
	//UI for Everything
	showEverything(){
	  document.getElementById('topheadlines-row').innerHTML=``;
	  document.getElementById('everything-row').innerHTML=`
	  <div class="col-md-4 mx-auto">
		<div class="form-group">
		  <input type="text" class="form-control" placeholder="Search for" id="search">
		</div>
		<button class="btn btn-info w-100 mb-2" type="submit" id="submit-btn">Get News</button>
	  </div>
	  `;
	}
  
	//Show alert
	showAlert(message,className){
	  //Clear any remaining alerts
	  this.clearAlert();
	  const div = document.createElement('div');
	  div.className = className+' col-md-4 mx-auto mt-2 text-center w-25';
  
	  div.appendChild(document.createTextNode(message));
  
	  const parent= document.querySelector('.searchContainer');
	  const row = document.querySelector('.searchtypeRow');
  
	  parent.insertBefore(div,row);
	  
	  setTimeout(() =>{
		this.clearAlert()
	  },3000);
	} 
  
	//Clear alert message
	clearAlert(){
	  const alert = document.querySelector('.alert');
	  if(alert)
		alert.remove();
	}
  
	showNews(data){
	  const newsDiv = document.getElementById('displayNews');
	  if(data.totalResults == 0){
		newsDiv.className='col-md-4 mx-auto';
		newsDiv.innerHTML=`<img src='no_news.png' class="img-fluid mt-2">
		<h2>Sorry no news for now.<br>Type something else</h2>`;
		document.getElementById('search').value='';
	  }
	  else{
		newsDiv.className='';
		const newsArray = data.articles;
		let output ='';
		console.log(newsArray);
		newsArray.forEach((news) => {
		  const smallDesp = this.generateSmallDescription(news.description);
		  output +=`
		   <div class="card card-body mb-3">
			<div class="row">
			  <div class="col-md-4">
			   <figure>
				<img src=${news.urlToImage} alt="urlImage" class="img-fluid">
			   </figure>
			  </div>
			  <div class="col-md-8">
				<h6>${news.source.name}</h6>
				<h3>${news.title}</h3>
				<h5>${smallDesp}</h5>
				<a href=${news.url} target="_blank">Read more</a>
			  </div>
			</div>
		   </div>
		  `;
		});
		newsDiv.innerHTML = output;
	  }    
	}
  
	//Limits the number of characters in description 
	generateSmallDescription(text){
	  if(text){
		if(text.length > 120){
		  text= text.slice(0,120) + '...';
		  return text;
		}
		else{
		  return text;
		}
	  }
	}
  }
  
 //Init news object
const news = new News();
//Init UI object
const ui=new UI();
//Loading Animation
const loadingAnimation=`<div class="d-flex justify-content-center col-md-4 mx-auto">
<div class="spinner-border text-primary" style="width: 5rem; height: 5rem;" role="status">
  <span class="sr-only">Loading...</span>
</div>
</div>`;

const newsType = document.getElementById('news-type');
newsType.addEventListener('change', displayOptions);

let param1;

//Selecting news type
function displayOptions(e){
  const type=e.target.value;
  if(type == 1){
   ui.showTopHeadlines();
   const btn= document.getElementById('submit-btn');
   btn.addEventListener('click',showNews);
    function showNews(){
      const genre = document.querySelector('.categories').value;
      if(genre.length > 0){
        param1=genre;
        console.log(genre);
        //Load animation while fetching results
        document.getElementById('displayNews').innerHTML=loadingAnimation;
        news.fetchNews('topheadlines',param1).then(data => {
          ui.showNews(data);
        });
      }
      else{
        ui.showAlert('Select  A Category','alert alert-danger');
      }
    }
    
  }
  else if(type == 2){
    ui.showEverything();
    const btn= document.getElementById('submit-btn');
    btn.addEventListener('click',showNews);
    function showNews(){
      const query = document.querySelector('#search').value;
      if(query.length > 0){
        param1=query;
        console.log(query);
        document.getElementById('displayNews').innerHTML=loadingAnimation;
        news.fetchNews('everything',param1).then(data => {
          ui.showNews(data);
        });
      }
      else{
       ui.showAlert('Type a keyword','alert alert-info');
      }
    }
  }
  else{
    document.getElementById('topheadlines-row').innerHTML=``;
    document.getElementById('everything-row').innerHTML=``;
  }
}





 