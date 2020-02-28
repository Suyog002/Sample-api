    (function AJAX() {
        // let api_key = '89dc14a0f40f4974856a11e1b6fb2575';
        let api_key = 'f069b2caf2d14283a9fefe8dcd7c7bf4';
        let country = 'us';
        let headline = 'top-headlines';
       let technology= 'general';
        // let technology='general';
        // let technology= 'science';
        
        let api;
    
        if (sessionStorage.getItem('api') == null) {
            api = `https://newsapi.org/v2/${headline}?country=${country}&category=${technology}&apiKey=${api_key}`;
        } 
    
        var xhr = new XMLHttpRequest();
        xhr.open('GET', api, true);
    
        xhr.onreadystatechange = function () {
            let DONE = 4;
            let OK = 200;
            if (this.readyState === DONE) {
                if (this.status === OK) {
                    console.log("Success");
                    let data = JSON.parse(this.responseText);
                    updateCarousel(data);
                    updateCard(data);
                }
                 
                else {
                    console.log('Error: ' + this.status);
                }
            }
        };
    
        xhr.send();
    }());

    function updateCarousel(data) {
        for (let index = 0; index < 3; index++) {
            let carouselElemParent = document.querySelector("#carous-el .carousel-inner");
            let elem = document.createElement('div');

            if (index == 0)
                elem.className = 'carousel-item active';
            else
                elem.className = 'carousel-item';

            elem.innerHTML = `
            <div class="card mb-3">
                <div class="row no-gutters">
                    <div class="col-md-7">
                        <img src="${data['articles'][index].urlToImage}"
                            class="card-img">
                    </div>
                    <div class="col-md-5">
                        <div class="card-body">
                            <p class="text-muted">${data['articles'][index].publishedAt}</p>
                            <h5 class="card-title">${data['articles'][index].title}</h5>
                            <p class="card-text">${data['articles'][index].content}</p>
                            <a href="${data['articles'][index].url}"><button>Read More<i class="fa fa-arrow-circle-right"></i></button></a>
                        </div>
                    </div>
                </div>
            </div>`;

            carouselElemParent.appendChild(elem);
        }
}

    function updateCard(data) {
        for (let index = 3; index < data['articles'].length; index++) {
            let card_parent_elem = document.querySelector("#news");
            let elem = document.createElement("div");
            // elem.className = "col-lg-8"
            elem.innerHTML = `
            

          <div class="card card-body mb-3">
          <div class="row">
            <div class="col-md-4">
             <figure>
              <img src=${data['articles'][index].urlToImage} alt="urlImage" class="img-fluid">
             </figure>
            </div>
            <div class="col-md-8">
              <h6>${data['articles'][index].source.name}</h6>
              <h3>${data['articles'][index].title}</h3>
              <h5>${data['articles'][index].description}</h5>
              <a href="${data['articles'][index].url}" target="_blank" class="btn btn-primary btn-sm">Read more</a>
            </div> 
          </div>
         </div>
            `;
            card_parent_elem.appendChild(elem);
        }
    }

    // function updateCard(data) {
    //     for (let index = 3; index < data['articles'].length; index++) {
    //         let card_parent_elem = document.querySelector("#news");
    //         let elem = document.createElement("div");
    //         // elem.className = "col-lg-8"
    //         elem.innerHTML = `
    //         <div class="card hover">
    //         <div class="card-img" style="background-image:src="${data['articles'][index].urlToImage}">
    //             <div class="overlay">
    //                 <div class="overlay-content">
    //                     <a class="hover" href="'${data['articles'][index].url}' target='_blank'">View Project</a>
    //                 </div>
    //             </div>
    //         </div>
            
    //         <div class="card-content">
    //             <a href="'${data['articles'][index].url}' target='_blank'">
    //                 <h2>${data['articles'][index].title}</h2>
    //                 <p>${data['articles'][index].content}</p>
    //             </a>
    //         </div>
    //     </div>

    //         `;
    //         card_parent_elem.appendChild(elem);
    //     }
    // }
    
{/* 

 */}

{/* <div class="container no-padding">
		<div class="row small-gutters">
            <div class="col-lg-8 top-post-left">
            <div class="feature-image-thumb relative">
                <div class="overlay overlay-bg"></div>
                <img class="img-fluid" src="${data['articles'][index].urlToImage}" alt="">
            </div>
            <div class="top-post-details">
                <ul class="tags">
                    <li><a href="${data['articles'][index].url} target='_blank'">${data['articles'][index].title}</a></li>
                </ul>
                <a href="image-post.html">
                    <h3>${data['articles'][index].description}</h3>
                </a>
                <ul class="meta">
                    <li><a href="#"><span class="lnr lnr-user"></span>Mark wiens</a></li>
                    <li><a href="#"><span class="lnr lnr-calendar-full"></span>03 April, 2018</a></li>
                    <li><a href="#"><span class="lnr lnr-bubble"></span>06 Comments</a></li>
                </ul>
            </div>
        </div>
        <div class="col-lg-4 top-post-right">
            <div class="single-top-post">
                <div class="feature-image-thumb relative">
                    <div class="overlay overlay-bg"></div>
                    <img class="img-fluid" src="${data['articles'][index].urlToImage}" alt="">
                </div>
                <div class="top-post-details">
                    <ul class="tags">
                        <li><a href="${data['articles'][index].url} target='_blank'">${data['articles'][index].title}</a></li>
                    </ul>
                    <a href="image-post.html">
                        <h4>${data['articles'][index].description}</h4>
                    </a>
                    <ul class="meta">
                        <li><a href="#"><span class="lnr lnr-user"></span>Mark wiens</a></li>
                        <li><a href="#"><span class="lnr lnr-calendar-full"></span>03 April, 2018</a></li>
                        <li><a href="#"><span class="lnr lnr-bubble"></span>06 Comments</a></li>
                    </ul>
                </div>
            </div>
            <div class="single-top-post mt-10">
                <div class="feature-image-thumb relative">
                    <div class="overlay overlay-bg"></div>
                    <img class="img-fluid" src="${data['articles'][index].urlToImage}" alt="">
                </div>
                <div class="top-post-details">
                    <ul class="tags">
                        <li><a href="${data['articles'][index].url} target='_blank'">${data['articles'][index].title}</a></li>
                    </ul>
                    <a href="image-post.html">
                        <h4>${data['articles'][index].description}</h4>
                    </a>
                    <ul class="meta">
                        <li><a href="#"><span class="lnr lnr-user"></span>Mark wiens</a></li>
                        <li><a href="#"><span class="lnr lnr-calendar-full"></span>03 April, 2018</a></li>
                        <li><a href="#"><span class="lnr lnr-bubble"></span>06 Comments</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="news-tracker-wrap">
                <h6><span>Breaking News:</span>   <a href="#">Astronomy Binoculars A Great Alternative</a></h6>
            </div>
        </div> 
        </div>
	</div> */}