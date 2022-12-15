var API_KEY = "5e9e07c99c39fc2ae00eb88b3212ea61";
var url_1 = `https://api.themoviedb.org/3/movie/157336?api_key=${API_KEY}`
// var url_2 = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=thor`
// var url_3 = `https://api.themoviedb.org/3/trending/all/day?api_key=5e9e07c99c39fc2ae00eb88b3212ea61`

var cast = "https://api.themoviedb.org/3/movie/616037/credits?api_key=5e9e07c99c39fc2ae00eb88b3212ea61&language=en-US";
var voting = "https://api.themoviedb.org/3/movie/616037?api_key=5e9e07c99c39fc2ae00eb88b3212ea61&language=en-US"

var genera_id =  "https://api.themoviedb.org/3/genre/movie/list?api_key=5e9e07c99c39fc2ae00eb88b3212ea61&language=en-US"


var showData = debouncing(fn, 1000);

function debouncing(fn, delay) {
    var timerId;
    return function(){
        clearTimeout(timerId)
        timerId = setTimeout(function(){
            fn();
        }, delay)
    }
}

function fn(){
    var searched = document.getElementById("searchField").value;
    console.log(searched);
    test()
    async function test(){
        try{
            var url_2 = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searched}`
            var res = await fetch(url_2)
            var res2 = await res.json()
            console.log(res2.results, "search");
            showmovielist(res2.results)
        }catch(err){
            console.log(err,"something err");
        }
    }
}

function showmovielist(data) {
    var resultHolder = document.getElementById("resultHolder")
    resultHolder.style.transform = "scale(1)";
    resultHolder.innerHTML = null
    data.forEach( function(element,index) {
        var a = document.createElement("a")
        a.href = "./pages/movie.html"
        if(index<5){
            a.innerHTML+=
            `<div class="result-holderDiv">
                <div class="result-holderDivImgDiv">
                    <img class="result-holderDivImg" src="https://image.tmdb.org/t/p/w500${element.backdrop_path}" alt="">
                </div>
                <div>
                    <h2>${element.original_title}</h2>
                    <p>${element.id +" "+ element.original_language }</p>
                </div>
            </div>`
            resultHolder.append(a);
            a.addEventListener("click", function(){
                console.log(element," clicked ");
                localStorage.setItem("movie", JSON.stringify(element));
            })
        }
    });
    
}


document.querySelector("body").addEventListener("click", function(e){
    console.log(e, "even");
    console.log(e.target," et");
    if(e.target.id!="searchField"){
        var resultHolder = document.getElementById("resultHolder")
        resultHolder.style.transform = "scale(0)";
        document.getElementById("searchField").value = "";
    }
})


{/* <a href="movie.html">
    <div class="result-holderDiv">
        <div class="result-holderDivImgDiv">
            <img class="result-holderDivImg" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_2_5x/sources/r1/cms/prod/4595/674595-h" alt="">
        </div>
        <div>
            <h2>Thor</h2>
            <p>desc</p>
        </div>
    </div>
</a> */}



// trending movies 

var url_3 = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
    getData();
    async function getData(){
        try{
            var res = await fetch(url_3)
            var res2 = await res.json()
            console.log(res2.results, " trending");
            showtrandingData(res2.results)
        }catch(err){
            console.log(err,"Something is wrong");
        }
    }
    function showtrandingData(data) {
        var content = document.getElementById("main__content");
        // content.innerHTML=null
        data.forEach(element => {
            let div = document.createElement("div")
            // console.log(element, " trending");
            div.innerHTML+=
            `
                <img src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="">
                
                    <h3>${element.title || element.original_title || element.name} </h3>
                
                <h5>Rating: ${element.vote_average}</h5>
            `
            div.addEventListener("click", function(){
                console.log(element," clicked ");
                localStorage.setItem("movie", JSON.stringify(element));
                location.href = "./pages/movie.html"
            })
            content.append(div);
        });
    }