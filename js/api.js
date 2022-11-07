const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"
const TmdbApiImageUrl = "https://www.themoviedb.org/t/p/w220_and_h330_face"
const TmdbApiImageOgUrl = "https://www.themoviedb.org/t/p/original/"

window.onload = () => {
    console.log('로딩되었음')
}

async function handleSignup() {
    const email = document.getElementById("email").value
    const nickname = document.getElementById("nickname").value
    const password1 = document.getElementById("password1").value
    const password2 = document.getElementById("password2").value
    console.log(email, nickname, password1, password2)

    const response = await fetch('http://127.0.0.1:8000/users/dj-rest-auth/registration/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "nickname": nickname,
            "password1": password1,
            "password2": password2
        })
    })

    const response_json = await response.json()

    console.log(response)
    if (response.status == 201){
        alert(response_json["detail"])
            window.location.replace(`${frontEndBaseUrl}/login.html`);
    }else {
        alert(response_json["email"])
        alert(response_json["password1"])

    }
}

async function handleLogin() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(email, password)


    const response = await fetch('http://127.0.0.1:8000/users/dj-rest-auth/login/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })

    const response_json = await response.json()    // responser 값을 json 화

    console.log(response_json)
    if (response.status == 200){
        localStorage.setItem("access", response_json.access_token);  // 로컬스토리지안에 access값 저장
        localStorage.setItem("refresh", response_json.refresh_token); // 로컬스토리지안에 refresh값 저장

        const base64Url = response_json.access_token.split('.')[1];  // 로컬스토리지에 JWT값 저장
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);

        alert("로그인 성공!")
            window.location.replace(`${frontEndBaseUrl}/refresh.html`);

    }else {
        //로그인 실패시
        alert(response_json["non_field_errors"])
        // window.location.reload();
    }
}


async function handleLogout(){
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    alert("로그아웃 성공!")
        window.location.replace(`${frontEndBaseUrl}/login.html`);
}

async function handleDelete(){   //mock 함수
    const response = await fetch('http://127.0.0.1:8000/users/delete/',{
        headers:{
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'DELETE',
    })

    if (response.status ==204){
        alert("회원탈퇴 완료!")
        window.location.replace(`${frontEndBaseUrl}/login.html`);
    }

    console.log(response)
}

async function getMovie(){
    const response = await fetch(`${backEndBaseUrl}/articles/`,{
        method:'GET',
    })

    response_json = await response.json()
    return response_json
}


async function getMovieDetail(movie_id){
    const response = await fetch(`${backEndBaseUrl}/articles/${movie_id}`,{
        method:'GET',
    })
    response_json = await response.json()
    return response_json
}


async function handlePost(movie_id) {
    const content = document.getElementById("content").value
    const rating = document.getElementById("rating").value
    console.log(content, rating)

    const response = await fetch(`http://127.0.0.1:8000/articles/${movie_id}/comment/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'POST',
        body: JSON.stringify({
            "content": content,
            "rating": rating
        })
    })
    if (response.status ==200){
        window.location.reload();
    }
}



async function MovieCommentDelete(comment,movie_id) {


    const response = await fetch(`http://127.0.0.1:8000/articles/${movie_id}/comment/${comment.id}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'DELETE',
    })
    if (response.status ==204){
        alert("리뷰가 삭제되었습니다!")
        window.location.reload();
    }
}



async function getMovieRefresh(){
    const response = await fetch(`${backEndBaseUrl}/recommend/refresh/`,{
        method:'GET',
    })

    response_json = await response.json()
    return response_json
}

async function getMovieRecommend(movie_id){
    const response = await fetch(`${backEndBaseUrl}/recommend/${movie_id}/`,{
        method:'GET',
    })

    response_json = await response.json()
    return response_json


}


async function getMovieMainImage(id){
    const response = await fetch(`${backEndBaseUrl}/articles/${movie_id}`,{
        method:'GET',
    })

    response_json = await response.json()
    return response_json


}

//검색함수
async function searchButton(){
    const search_id = document.getElementById("search").value
    
    location.href = `search.html?${search_id}`
    
}


async function getMovieSearch(search_id){
    const response = await fetch(`${backEndBaseUrl}/articles/search/?search=${search_id}`,{
        method:'GET',
    })
    

    response_json = await response.json()
    return response_json
    

}


async function getMovieCategoryOne(){
    const category_id_name = [
        {"id":"12", "name":"모험"},
        {"id":"14", "name":"판타지"},
        {"id":"16", "name":"애니메이션"},
        {"id":"18", "name":"드라마"},
        {"id":"27", "name":"공포"},
        {"id":"28", "name":"액션"},
        {"id":"35", "name":"코미디"},
        {"id":"36", "name":"역사"},
        {"id":"37", "name":"서부"},
        {"id":"53", "name":"스릴러"},
        {"id":"80", "name":"범죄"},
        {"id":"99", "name":"다큐멘터리"},
        {"id":"878", "name":"SF"},
        {"id":"9648", "name":"미스터리"},
        {"id":"10402", "name":"음악"},
        {"id":"10749", "name":"로맨스"},
        {"id":"10751", "name":"가족"},
        {"id":"10752", "name":"전쟁"},
        {"id":"10770", "name":"TV 영화"}
    ]
    const randomValue = category_id_name[Math.floor(Math.random() * category_id_name.length)];
    const response = await fetch(`${backEndBaseUrl}/articles/category/${randomValue.id}`,{
        method:'GET',
    })
    
    response_json = await response.json()
    return response_json
}

async function getMovieCategoryTwo(){
    const category_id_name = [
        {"id":"12", "name":"모험"},
        {"id":"14", "name":"판타지"},
        {"id":"16", "name":"애니메이션"},
        {"id":"18", "name":"드라마"},
        {"id":"27", "name":"공포"},
        {"id":"28", "name":"액션"},
        {"id":"35", "name":"코미디"},
        {"id":"36", "name":"역사"},
        {"id":"37", "name":"서부"},
        {"id":"53", "name":"스릴러"},
        {"id":"80", "name":"범죄"},
        {"id":"99", "name":"다큐멘터리"},
        {"id":"878", "name":"SF"},
        {"id":"9648", "name":"미스터리"},
        {"id":"10402", "name":"음악"},
        {"id":"10749", "name":"로맨스"},
        {"id":"10751", "name":"가족"},
        {"id":"10752", "name":"전쟁"},
        {"id":"10770", "name":"TV 영화"}
    ]
    const randomValue = category_id_name[Math.floor(Math.random() * category_id_name.length)];
    const response = await fetch(`${backEndBaseUrl}/articles/category/${randomValue.id}`,{
        method:'GET',
    })
    
    response_json = await response.json()
    return response_json
}