# Jjapflix (넷플릭스 클론코딩 기반 영화 추천 서비스)

## 프로젝트


### Jjapflix

시연 영상 :

[https://www.youtube.com/watch?v=CdffUWraIU8/](https://www.youtube.com/watch?v=CdffUWraIU8/)

프로젝트 일정 : 2022.11.02 ~ 2022.11.08

프론트엔드 Repository : [https://github.com/devjunseok/jjapflix_frontend](https://github.com/devjunseok/jjapflix_frontend)

백엔드  Repository :[https://github.com/devjunseok/jjapflix_backend](https://github.com/devjunseok/jjapflix_backend)

S.A 링크 : [B-1팀 영화추천서비스](https://iodized-justice-c7c.notion.site/B1-90233db02b124d57a2e82318b93e2074)

## 1. 프로젝트 주제

### 넷플릭스 클론코딩을 기반으로 한 사용자 Needs에 맞는 영화 추천 서비스

나에게 맞는 영화를 추천받고, 영화 정보를 공유하는 사이트

## 2. 기술 스택

- 백엔드
    - Python 3.10
    - Django 4.1.3
    - Django Rest Framework 3.14
    - Django Rest Framework simple-jwt 5.2.2
- 프론트엔드
    - HTML5
    - Javascript
    - JQuery
    - CSS

## 3. 싸지방 팀 팀원 및 역할

### 박준석 - [devjunseok - Overview](https://github.com/devjunseok)

팀장 / 프로젝트 기획 / tbdm 데이터 크롤링 / user 기능/ DB 모델링 / 머신러닝, 딥러닝 코드 작성

### 노우석 - [WooSeok-Nho - Overview](https://github.com/WooSeok-Nho/)

팀원 / 프로젝트 기획 / 검색기능 추가 / API연결을 위한 각종 조회 로직 작성 / 영화리뷰작성기능추가

### 성창남 - [SungChangNam - Overview](https://github.com/SungChangNam)

팀원 / 프론트엔드 회원가입 / 로그인 / 리뷰업로드

### 양기철 - [hanmariyang - Overview](https://github.com/hanmariyang)

팀원 / 프로젝트 기획 / contents 기능 / DB 모델링 / 프론트엔드 API 연결 / TMDB_API 연결 및 영화 DB 저장

### 이태겸 - [poro625 - Overview](https://github.com/poro625)

팀원 / 회원가입 및 로그인 관리 구축 / csv파일 생성 / 추천시스템 구축/ API 연결

## 4. 프로젝트 기능

### User 기능(회원가입/로그인 - simple jwt 사용)

- dj-rest-auth 이용 회원가입, 로그인 기능 구현 (이메일 인증 포함)
- extra_kwargs 처리로 에러 메세지 세분화 처리
- 회원정보 CRUD 기능
- 팔로우, 팔로워

### articles 기능 (게시글, 댓글, 사물인식, 유화제작)

- 영화 후기 CRUD 기능
- 영화 검색 기능

### recommend 기능 (영화 추천)

- tmdb 데이터, 사용자 영화 선호 데이터를 기반으로 아이템 협업 필터링 사용하여 사용자에게 영화 추천
- tmdb_api.py에 크롤링 코드 작성, 크롤링하여 db에 저장

 
## 4-1. 트러블 슈팅

### 박준석

**문제 : 아이템 기반 협업 필터링으로 추천받은 영화를 DB에 접근해서 가져오지 못하는 상황 발생**

**원인 : 협업 필터링은 단순히 csv파일을 기준으로 영화를 추천해주기 때문에 db에 있는 영화와 연동을 하지 못하는 것이 원인**

**해결 : 리스트 축약식을 사용하여 추천된 영화를 장고 ORM에 적용하여 db에서 추출하여 해결 (recommend/views.py/TasteView)** 


### 양기철

**문제 : TMDB 영화 데이터를 가져오면서 작성했던 tmdb_api.py 사용시 모듈을 찾을 수 없다고 에러가 발생 하였다.**

**해결 : 장고 프로젝트에서 명시된 app에 파일이 아니기때문에 별도로 장고 셋업을 import 해줘야하는데 이 경우에 .env 파일을 사용하고있으면 django.setup() 아래에 import dotenv 도 같이 해줌으로서 해결 하였다.**
### 노우석

**문제 : 검색기능을 작성하던 도중 카테고리 필드가 검색이 되지 않음**

**원인 : 검색기능을 사용하는 django search_fields에서는 manytomany필드 일 경우 __를 붙여주고 필드안에 name같이 원하는 부분을 지정해줘야 했다**

**해결 : search_fields = ['title','description','category__name'] 으로 바꿔주니 제대로 카테고리 이름을 검색할 수 있었다.**

### 이태겸

**문제 : 천 시스템을 구축 시 기존에 csv파일을 가지고는 로그인 후 사용자에게 추천할 수 있는 임의의 데이터가 없음**

**해결 :가상의 데이터를 하나 구축하여 API 데이터를 가지고 온 것과 병합 시켜서 추천 시스템을 구축함**

### 성창남

**문제 : 영화 리뷰 작성시 평점이 보이지 않는 문제가 발생하였다.**

**해결 : ForEach 를 사용하여 const newRating = document.createElement(“div”); 추가하여 문제해결하였다.**


## 5. 와이어프레임

[https://www.figma.com/file/hgtTToRaWbfP87GfNvHaMa/Off_the_Outfit?node-id=0%3A1&t=xw7FNe87Jr8IecaC-1](https://www.figma.com/file/hgtTToRaWbfP87GfNvHaMa/Off_the_Outfit?node-id=0%3A1&t=xw7FNe87Jr8IecaC-1)

![https://user-images.githubusercontent.com/111295065/207312359-91bb78a9-c108-4897-8cc3-e0cbb1f00cd0.png](https://user-images.githubusercontent.com/111295065/207312359-91bb78a9-c108-4897-8cc3-e0cbb1f00cd0.png)

## 6. API 명세서

[off_the_outfit (getpostman.com)](https://documenter.getpostman.com/view/24913558/2s8YzWRfo4)

## 7. DB 설계 ERD

![https://user-images.githubusercontent.com/111295065/207309475-759e6e8d-8265-4c49-8c8f-9f83478c329d.png](https://user-images.githubusercontent.com/111295065/207309475-759e6e8d-8265-4c49-8c8f-9f83478c329d.png)
