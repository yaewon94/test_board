$(document).ready(function(){
	// 전역변수
	var isEmptyWriteForm = true;
	var isCheckedSelectBoardAll = false;
	// 게시판 목록 불러오기
	getBoardList();
		
/*
 * #btn-writeBoard 클릭 : 게시물 작성 form 보여주기 / 숨기기
 */
	$('#btn-writeBoard').click(function(){
		if(isEmptyWriteForm){
			showWriteBoardForm();
			isEmptyWriteForm = false;
		}else{
			$('#output-display').empty();
			isEmptyWriteForm = true;
		}
	});
	
/*
 * #form-writeBoard.submit : 게시물 작성 form submit
 * 동적 요소일 때 써야하는 함수 : $(document).on(이벤트종류, 속성의 아이디 또는 클래스명, 함수)
 */
	$(document).on('submit', '#form-writeBoard', function(event){
		// input 값 유효성 체크
		if(!isValidForm()){
			return false;
		}
		// form 내용 받아오기
		var data = $(this).serialize();
		// ajax
		$.ajax({
			type:'post',
			data:data,
			url:'writeBoardAjax',
			dataType:'json',
			cache:false,
			timeout:30000,
			success:function(data){
				if(data.result == 'success'){
					console.log('게시물 등록 완료');
					// 해당 html 태그 내용물 삭제
					$('#output-display').empty();
					// 게시물 목록 새로 불러오기
					getBoardList();
				}else{
					console.log('게시물 등록 실패');
				}
			},
			error:function(){
				alert('네트워크 오류');
			}
		});
		// 기본 이벤트 제거
		event.preventDefault();
	});
	
/*
 * 게시물 삭제
 * 동적 요소일 때 써야하는 함수 : $(document).on(이벤트종류, 속성의 아이디 또는 클래스명, 함수)
 */
	$(document).on('click', '#btn-deleteBoard', function(){
		if(confirm('삭제하시겠습니까?') == true){
			// 게시물 번호 받아오기
			var board_num = $(this).attr('data-num');
			// ajax
			$.ajax({
				type:'get',
				data:{board_num:board_num},
				url:'deleteBoardAjax',
				dataType:'json',
				cache:false,
				timeout:30000,
				success:function(data){
					if(data.result == 'success'){
						console.log('게시물 삭제 완료');
						getBoardList();
					}else{
						console.log('게시물 삭제 실패');
					}
				},
				error:function(){
					alert('네트워크 오류');
				}
			});
		}
	});

/*
 * #href-board 클릭 : 게시물 상세 보기
 * 동적 요소일 때 써야하는 함수 : $(document).on(이벤트종류, 속성의 아이디 또는 클래스명, 함수)
 */
	$(document).on('click', '#href-board', function(){
		// 게시물 번호 가져오기
		var board_num = $(this).attr('data-num');
		// ajax
		$.ajax({
			type:'get',
			data:{board_num:board_num},
			url:'boardDetailAjax',
			dataType:'json',
			cache:false,
			timeout:30000,
			success:function(data){
				if(data.result == 'fail'){
					alert('해당 게시물이 존재하지 않습니다.');
				}else{
					showBoardDetail(data.board);
				}
			},
			error:function(){
				alert('네트워크 오류');
			}
		});
	});
	
/*
 * #btn-closeBoardDetail 클릭 : 게시물 상세 닫기
 * 동적 요소일 때 써야하는 함수 : $(document).on(이벤트종류, 속성의 아이디 또는 클래스명, 함수)
 */
	$(document).on('click', '#btn-closeBoardDetail', function(){
		// 태그 안의 내용물 초기화
		$('#output-display').empty();
	});
	
/*
 * #check-selectBoardAll 클릭 : 게시물 전체 선택
 * 동적 요소일 때 써야하는 함수 : $(document).on(이벤트종류, 속성의 아이디 또는 클래스명, 함수)
 */
	$(document).on('click', '#check-selectBoardAll', function(){
		if(!isCheckedSelectBoardAll){
			$('.table-boardEach input[type="checkbox"]').prop('checked', true);
			isCheckedSelectBoardAll = true;
		}else{
			$('.table-boardEach input[type="checkbox"]').prop('checked', false);
			isCheckedSelectBoardAll = false;
		}
	});
	
/*
 * #btn-deleteSelectedBoard 클릭 : 선택한 게시물 삭제
 * 동적 요소일 때 써야하는 함수 : $(document).on(이벤트종류, 속성의 아이디 또는 클래스명, 함수)
 */
	$(document).on('click', '#btn-deleteSelectedBoard', function(){
		// 선택된 게시물의 게시물 번호 받기
		var selectedBoardList = $('.table-boardEach input[type="checkbox"]:checked');
		var boardNumArr = new Array();
		$(selectedBoardList).each(function(index,item){
			boardNumArr.push($(item).attr('data-num'));
		});
		// 선택한 게시물이 없는 경우
		if(boardNumArr.length == 0){
			alert('삭제할 대상을 체크하여 주십시오.');
			return;
		}
		// 선택한 게시물 번호 alert
		// ajax
		$.ajax({
			type:'post',
			data:{boardNumArr:boardNumArr},
			url:'deleteBoardsAjax',
			dataType:'json',
			cache:false,
			timeout:30000,
			success:function(data){
				if(data.result == 'success'){
					console.log('게시물 삭제 성공');
					getBoardList();
				}
			},
			error:function(){
				alert('네트워크 오류');
			}
		});
	});
});

//	$(document).on('click', '#form', function(){
//		// form 내용 받아오기
////		var data = $("#form-writeBoard").serializeJSON();
//		var data = $("#form-writeBoard").serializeObject();
//		console.log(JSON.stringify(data));
//		// ajax
//		$.ajax({
//			type:'post',
//			data:data,
//			url:'writeBoardAjax',
//			dataType:'json',
//			cache:false,
//			timeout:30000,
////			contentType : "application/json; charset=UTF-8",
//			success:function(data){
//				if(data.result == 'success'){
//					console.log('게시물 등록 완료');
//					// 해당 html 태그 내용물 삭제
//					$('#output-display').empty();
//					// 게시물 목록 새로 불러오기
//					getBoardList();
//				}else{
//					console.log('게시물 등록 실패');
//				}
//			},
//			error:function(){
//				alert('네트워크 오류');
//			}
//		});		
//	});

/*
 * 게시판 목록 호출
 */
function getBoardList(){
	// 게시판 목록 초기화
	$('#output-boardList').empty();
	// ajax
	$.ajax({
		type:'get',
		url:'boardhomeAjax',
		dataType:'json',
		cache:false,
		timeout:30000,
		success:function(data){
			var boardList = data.boardList;
			var output = '';
			output += '<table class="table table-striped">';
			output += 	'<thead>';
			output += 		'<tr>';
			output += 			'<th><input type="checkbox" id="check-selectBoardAll">전체선택</th>';
			output += 			'<th>번호</th>';
			output += 			'<th>제목</th>';
			output += 			'<th>작성자</th>';
			output += 			'<th>날짜</th>';
			output += 		'</tr>';
			output += 	'</thead>';
			output += 	'<tbody>';
			output += 		'<tr>';
			output += 			'<td><button type="button" class="btn btn-danger" id="btn-deleteSelectedBoard">선택삭제</button></td>'
			output += 		'</tr>';
			$(boardList).each(function(index,item){
				output += '<tr class="table-boardEach">';
				output += 	'<td><input type="checkbox" data-num="' + item.board_num + '"></td>'
				output += 	'<td>' + item.board_num + '</td>';
				output += 	'<td><a id="href-board" data-num="' + item.board_num + '">' + item.board_title + '</a></td>';
				output += 	'<td>' + item.board_writer + '</td>';
				output += 	'<td>' + item.board_date + ' <button type="button" class="btn btn-danger" id="btn-deleteBoard" data-num="' + item.board_num + '">삭제</button></td>';
				output += '</tr>';
			});
			output += 	'</tbody>'
			output += '</table>';
			$('#output-boardList').append(output);
		},
		error:function(){
			alert('네트워크 오류');
		}
	});
}

/*
 * 게시물 작성 form 호출
 */
function showWriteBoardForm(){
	// 태그 안의 내용물 초기화
	$('#output-display').empty();
	// html append
	var output = '';
	output += '<p>';
	output += 	'<form id="form-writeBoard">';
	output += 		'<div class="form-group">';
	output += 			'<label for="board_title">제목</label>';
	output += 			'<input type="text" class="form-control" placeholder="제목을 입력하세요." id="board_title" name="board_title">';
	output += 		'</div>';
	output += 		'<div class="form-group">';
	output += 			'<label for="board_writer">작성자</label>';
	output += 			'<input type="text" class="form-control" placeholder="작성자를 입력하세요." id="board_writer" name="board_writer">';
	output += 		'</div>';
	output += 		'<div class="form-group">';
	output += 			'<label for="board_writer">내용</label>';
	output += 			'<div>';
	output += 				'<textarea class="form-control" rows="3" placeholder="내용을 입력하세요." id="board_content" name="board_content"></textarea>';
	output += 			'</div>';
	output += 		'</div>';
	output += 		'<button type="submit" class="btn btn-info">작성</button>';
	output += 	'</form>';
	// output += 		'<button id="form" class="btn btn-info">작성</button>';
	output += '</p>';
	$('#output-display').append(output);
}

/*
 * 게시물 form input 값 유효성 체크
 */
function isValidForm(){
	if($.trim($("#board_title").val()) == ''){
		alert("제목을 입력하세요");
		return false;
	} else if($.trim($("#board_writer").val()) == ''){
		alert("작성자를 입력하세요");
		return false;
	} else if($.trim($("#board_content").val()) == ''){
		alert("내용을 입력하세요");
		return false;
	} else{
		return true;
	}
}

/*
 * 게시물 상세 내용 보여주기
 */
function showBoardDetail(board){
	// 태그 안의 내용물 초기화
	$('#output-display').empty();
	// html append
	var output = '';
	output += '<p>';
	output += 	'<ul id="board-detail">';
	output += 		'<li>';
	output += 			'<span>번호 </span>';
	output += 			board.board_num;
	output += 		'</li>';
	output += 		'<li>';
	output += 			'<span>제목 </span>';
	output += 			board.board_title;
	output += 		'</li>';
	output += 		'<li>';
	output += 			'<span>작성자 </span>';
	output += 			board.board_writer;
	output += 		'</li>';
	output += 		'<li>';
	output += 			'<span>내용 </span>';
	output += 			'<p>';
	output += 				board.board_content;
	output += 			'</p>';
	output += 		'</li>';
	output += 		'<li>';
	output += 			'<button type="button" class="btn btn-primary" id="btn-closeBoardDetail">닫기</button>';
	output += 		'</li>';
	output += 	'</ul>';
	output += '</p>';
	$('#output-display').append(output);
}
