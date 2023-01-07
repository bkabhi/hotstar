var element = JSON.parse(localStorage.getItem("movie"));
document.getElementById("contentDivLeftImg").src = `https://image.tmdb.org/t/p/w500${element.poster_path}`
document.getElementById("name").innerText = `${element.title || element.original_title || element.name}`
document.getElementById("year").innerText = `Release Date: ${element.release_date}`
document.getElementById("rating").innerText = `Rating: ${element.vote_average}`
document.getElementById("overview").innerText = `${element.overview}`

showCast();
async function showCast(params) {
    var urlCast = `https://api.themoviedb.org/3/movie/${element.id}/credits?api_key=${API_KEY}&language=en-US`
    try {
        var res = await fetch(urlCast)
        var res2 = await res.json()
        console.log(res2.cast);
        var xyz = document.querySelector(".contentCastDiv");
        xyz.innerHTML = null
        res2.cast.forEach(element => {
            xyz.innerHTML +=
                `<li class="castBox">
                <img class="castBoxImg" src="https://image.tmdb.org/t/p/w500${element.profile_path}" alt="">
                <div>
                    <h3>${element.original_name || element.name}</h3>
                    <p>${element.character}</p>
                </div>
            </li>`
        });

    } catch (err) {
        console.log(err, "err");
    }
}