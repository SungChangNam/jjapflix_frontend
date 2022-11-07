window.onload = async function loadMovieRefresh(){

    let User_payload = JSON.parse(localStorage.getItem('payload'))

    		if (User_payload === undefined ||  User_payload === null){





        location.href="http://127.0.0.1:5500/login.html";
        
        
    } else {
    


    movies = await getMovieRefresh()
    const movie_list = document.getElementById("movies")

    movies.forEach(movie =>{
        const newMovie = document.createElement("div");

        const movieImage = document.createElement("img")

        movieImage.setAttribute("src", `${TmdbApiImageUrl}${movie.image}`)


        newMovie.onclick=function() {
            location.href = `home.html?movie=${movie.movie_id}&id=${movie.id}`
        }

        newMovie.appendChild(movieImage)
        movie_list.appendChild(newMovie)
    });
}
}