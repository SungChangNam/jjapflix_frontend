
window.onload = async function loadArticle(){
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    if (User_payload === undefined ||  User_payload === null){
        location.href="http://127.0.0.1:5500/login.html";
        
        
    } else {
    

    console.log(location);
    //가공
    const movie_id = location.search.replace("?", "")
    //fetch
    articles = await getMovieDetail(movie_id)
    //console.log(articles)
    articles_ht = document.getElementById("article")
    comment_list = document.getElementById("comment_list")
    comment_list.classList.add("commentlist")


    const ImageMovie = document.createElement("div");
    const movieImage = document.createElement("img");
    movieImage.classList.add("detailImage");
    
    const newRating = document.createElement("div");
    const newTitle = document.createElement("div");
    const newDesc = document.createElement("div");
    const newRelease = document.createElement("div");
    newTitle.classList.add("movie_title")
    
    
    movieImage.setAttribute("src", `${TmdbApiImageOgUrl}${articles.image}`)
    newTitle.innerText = `제목 : ${articles.title}`
    newRating.innerText = `평점 : ${articles.rating}`
    newRelease.innerText = `개봉일 : ${articles.release_year}`
    newDesc.innerText = `줄거리 : ${articles.description}`
    

    ImageMovie.appendChild(movieImage)
    articles_ht.appendChild(ImageMovie)
    articles_ht.appendChild(newTitle)
    articles_ht.appendChild(newRating)
    articles_ht.appendChild(newRelease)
    articles_ht.appendChild(newDesc)
    

    articles.movie_comment.forEach(comment => {

        const newCommentBox = document.createElement("div");
        const newUser = document.createElement("div");
        const newContent = document.createElement("div");
        const newRating = document.createElement("div");
        const newButton = document.createElement("button");
        newCommentBox.classList.add("comment_CommentBox")
        newUser.classList.add("comment_user")
        newContent.classList.add("comment_content")
        newRating.classList.add("comment_rating")
        newButton.classList.add("comment_button")

        newButton.innerText = "삭제"

        newButton.onclick=function(){MovieCommentDelete(comment,movie_id);}

        newUser.innerText = comment.user
        newContent.innerText = comment.content
        newRating.innerText = comment.rating
        
        newCommentBox.appendChild(newUser)
        newCommentBox.appendChild(newContent)
        newCommentBox.appendChild(newRating)
        newCommentBox.appendChild(newButton)
        comment_list.appendChild(newCommentBox)
        });

        const btnSubmit = document.getElementById("btn_submit");
        btnSubmit.onclick=function() {
            handlePost(movie_id);
        };

    
    };

    

}
