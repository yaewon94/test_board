$(document).ready(function(){
	// 게시물 작성, 수정 폼 제출
	$("#form_board").submit(function(){
		if($.trim($("#board_title").val()) == ''){
			alert("제목을 입력하세요");
			return false;
		}
		else if($.trim($("#board_writer").val()) == ''){
			alert("작성자를 입력하세요");
			return false;
		}
		else if($.trim($("#board_content").val()) == ''){
			alert("내용을 입력하세요");
			return false;
		}
	})
})