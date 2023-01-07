var url_3 = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
getData();
async function getData() {
    try {
        var res = await fetch(url_3)
        var res2 = await res.json()
        console.log(res2.results);
        showtrandingData(res2.results)
    } catch (err) {
        console.log(err, "Something is wrong");
    }
}
function showtrandingData(data) {
    var content = document.getElementById("content");
    data.forEach(element => {
        content.innerHTML +=
            `<div>
                <img src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="">
                <h2>${element.title || element.original_title || element.name} </h2>
                <h4>Rating: ${element.vote_average}</h4>
            </div>`
    });
}