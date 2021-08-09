$(document).ready(function() {
   console.log("[네비게이션바] 적용 jsp");
   // location.pathname : 현재 경로 확인
   // string 객체.split(구분 문자열)
   var path = location.pathname.split("/");
   // var loc = location.pathname.split("/")[2];
   // console.log("loc => "+loc);
   // 해당 페이지에 맞는 네비게이션바 강조 옵션 적용
   // string 객체.indexOf(문자열) : 주어진 값과 일치하는 첫 번째 인덱스를 반환. 일치하는 값이 없으면 -1을 반환
   if(path[1].indexOf("board") > -1 && path[2].indexOf("boardhome") > -1){
	  console.log("게시판 호출");
      $(".board").addClass("active");
   }else if(path[1].indexOf("jsTest") > -1){
	   console.log("자바스크립트 테스트 호출");
	   $(".jsTest").addClass("active");
   }
   else if(path[1].indexOf("calc") > -1){
	   console.log("계산기 호출");
	   $(".calc").addClass("active");
   }else if(path[1].indexOf("calendar") > -1){
	   console.log("캘린더 호출");
	   $(".calendar").addClass("active");}
   else{
	   console.log("홈 호출");
	   $(".home").addClass("active");
   }
});