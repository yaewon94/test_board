$(document).ready(function(){
/*
 * 전역 변수
 */
	// 오늘 날짜
	const today = new Date();
	// 년, 월, 일 분리
	var year = today.getFullYear();
	var month = today.getMonth();
	var day;
	// 날짜, 달력 변경
	getDate();
	getCalendar();
	
/*
 * 월(month) 이동 버튼 클릭
 * month는 0부터 시작 !!
 */
	$('.btn-moveMonth').click(function(){
		// 이전
		if($(this).text() == '<'){
			if(month == 0){
				month = 11;
				year = year-1;
			}else{
				month = month - 1;
			}
		}
		// 다음
		else{
			if(month == 11){
				month = 0;
				year = year + 1;
			}else{
				month = month + 1;
			}
		}
		// 날짜, 달력 변경
		getDate();
		getCalendar();
	});
	
/*
 * 년-월 가져오기
 */
	function getDate(){
		$('#output-year').text(year);
		$('#output-month').text(month+1);
//		$.ajax({
//			type:'get',
//			data:{calYear:year,calMonth:month},
//			url:'/calendar/getDateAjax',
//			dataType:'json',
//			cache:false,
//			timeout:30000,
//			success:function(data){
//				// 가져온 년,월 html 출력
//				$('#output-year').text(data.year);
//				$('#output-month').text(data.month + 1);
//			},
//			error:function(){
//				alert('네트워크 오류 : 캘린더 년-월 가져오기');
//			}
//		});
	}
	
/*
 * 달력 변경
 */
 	function getCalendar(){
 		$.ajax({
 			type:'get',
			data:{calYear:year, calMonth:month},
			url:'/calendar/getCalendarAjax',
			dataType:'json',
			cache:false,
			timeout:30000,
			success:function(data){
				$('#output-calendar').empty();
		 		$('#output-calendar').append(data.output);
		 		// 날짜 버튼에 모달 트리거 추가
		 		$('[class="btn-schedule"]').attr('data-toggle','modal');
		 		$('[class="btn-schedule"]').attr('data-target','#modal-schedule');
			},
			error:function(){
				alert('네트워크 오류 : 달력 변경');
			}
 		});
 	}
 	
 /*
  * 날짜 버튼 클릭 이벤트 추가
  */
 	$(document).on('click', '.btn-schedule', function(){
 		// 클릭한 날짜 받아오기
 		day = $(this).text();
 		// 스케줄 모달에 데이터 전달
 		// 선택한 날짜
 		var dateFormat = year + "년 " + (month+1) + "월 " + day + "일";
 		$('#output-schedule-date').text(dateFormat);
 		// 스케줄 리스트 가져오기
 		getScheduleList();
 	});
 	
 /*
  * 스케줄 리스트 가져오기
  */
 	function getScheduleList(){
 		console.log("getScheduleList() 호출됨");
 		console.log(year + "년 " + (month+1) + "월 " + day + "일");
 		// 모달 input field 초기화
 		setInitializeForm();
 		// ajax
 		$.ajax({
 			type:'get',
 			data:{calYear:year, calMonth:month, calDay:day},
 			url:'/calendar/getScheduleListAjax',
 			dataType:'json',
 			cache:false,
 			timeout:30000,
 			success:function(data){
 				$('#output-schedule-list').empty();
 		 		$('#output-schedule-list').append(data.output);
 			},
 			error:function(){
 				alert('네트워크 오류 : 스케줄 리스트 가져오기');
 			}
 		});
 	}
 	
 /*
  * 스케줄 저장
  */
 	$('#btn-insertSchedule').click(function(){
 		// 정보 받아오기
 		var calTime = $('#input-schedule-time').val();
 		var calContents = $('#input-schedule-contents').val();
 		if($('#input-schedule-req').is(':checked') == true){
 			var calReq = 1;
 		}else{
 			var calReq = 0;
 		}
 		// 입력 폼 유효성 체크
 		if($.trim(calTime) == ''){
 			alert("시간을 선택하세요.");
 			return;
 		}else if($.trim(calContents) == ''){
 			alert("내용을 입력하세요.");
 			return;
 		}
 		// ajax
 		$.ajax({
 			type:'post',
 			data:{
 				calYear:year,
 				calMonth:month,
 				calDay:day,
 				calTime:calTime,
 				calContents:calContents,
 				calReq:calReq
 			},
 			url:'/calendar/insertScheduleAjax',
 			dataType:'json',
 			cache:false,
 			timeout:30000,
 			success:function(data){
 				if(data.result){
 					console.log('스케줄 등록 성공');
 					getScheduleList();
 					getCalendar();
 				}else{
 					console.log('스케줄 등록 실패');
 				}
 			},
 			error:function(){
 				alert('네트워크 오류 : 스케줄 등록');
 			}
 		});
 	});
 	
 /*
  * 스케줄 삭제
  */
 	$(document).on('click', '.btn-deleteSchedule', function(){
 		// 해당 스케줄 번호 가져오기
 		var calNo = $(this).attr('data-num');
 		alert("스케줄 삭제=="+calNo);
 		// ajax
 		$.ajax({
 			type:'get',
 			data:{calNo:calNo},
 			url:'/calendar/deleteScheduleAjax',
 			dataType:'json',
 			cache:false,
 			timeout:30000,
 			success:function(data){
 				if(data.result){
 					console.log('스케줄 삭제 성공');
 					getScheduleList();
 					getCalendar();
 				}else{
 					console.log('스케줄 삭제 실패');
 				}
 			},
 			error:function(){
 				alert('네트워크 오류 : 스케줄 삭제');
 			}
 		});
 	});
 	
 /*
  * 스케줄 설정 모달 폼 초기화
  */
 	function setInitializeForm(){
 		$('#input-schedule-time').val('');
 		$('#input-schedule-contents').val('');
 		$('#input-schedule-req').prop('checked', false);
 	}
});
