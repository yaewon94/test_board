<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 위 3개의 메타 태그는 *반드시* head 태그의 처음에 와야합니다; 어떤 다른 콘텐츠들은 반드시 이 태그들 *다음에* 와야 합니다 -->
    <title>캘린더</title>
    <!-- 부트스트랩 -->
    <link href="${pageContext.request.contextPath}/resources/css/bootstrap.min.css" rel="stylesheet">
    <!-- css -->
    <style type="text/css">
    	.btn-moveMonth{
    		background-color:transparent;
    		color:blue;
    		border:0;
    	}
    	table tr td{
    		text-align:left;
    	}
    	.modal-header, .modal-body{
    		text-align:left;
    	}
    </style>
</head>

<body>
	<!-- include menu -->
	<jsp:include page="${pageContext.request.contextPath}/WEB-INF/views/menu.jsp" flush="true"/>
	<!-- 자바스크립트 -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/calendar.js"></script>
	
	<!-- calender -->
	<div id="layout-body" style="text-align:center">
		<!-- 연도, 월 버튼 -->
		<header>
			<h1 id="output-year"></h1>
			<h1>
				<button class="btn-moveMonth">&lt;</button>
				<span id="output-month"></span>
				<button class="btn-moveMonth">&gt;</button>
			</h1>
		</header>
		<!-- 달력 -->
		<div>
			<table class="table table-striped">
				<thead>
					<tr>
						<th>일</th>
						<th>월</th>
						<th>화</th>
						<th>수</th>
						<th>목</th>
						<th>금</th>
						<th>토</th>
					</tr>
				</thead>
				<tbody id="output-calendar"></tbody>
			</table>
		</div>
		<!-- 스케줄 모달 -->
		<div class="modal fade" id="modal-schedule" tabindex="-1" role="dialog" aria-labelledby="modal-label-schedule" aria-hidden="true">
			<div class="modal-dialog">
				 <div class="modal-content">
				 	<!-- header -->
				 	<div class="modal-header">
				 		<h4>스케줄 입력</h4>
				 		<h5 id="output-schedule-date"></h5>
				 	</div>
				 	<!-- body -->
				 	<div class="modal-body">
				 		<!-- 스케줄 목록 테이블 -->
				 		<table class="table">
				 			<thead>
				 				<tr>
				 					<th>시간</th>
				 					<th>내용</th>
				 					<th>중요</th>
				 					<th>삭제</th>
				 				</tr>
				 			</thead>
				 			<tbody id="output-schedule-list"></tbody>
				 		</table>
				 		<!-- 시간 선택 -->
				 		<div class="form-group">
				 			<div>
				 				<label>시간</label>
				 			</div>
				 			<input type="time" id="input-schedule-time">
				 		</div>
				 		<!-- 내용 입력 -->
				 		<div class="form-group">
				 			<div>
				 				<label>내용</label>
				 			</div>
				 			<input type="text" id="input-schedule-contents">
				 		</div>
				 		<!-- 중요 스케줄 표시 -->
				 		<div>
				 			<input type="checkbox" id="input-schedule-req"> 중요 스케줄(체크시 <span style="color:red;">*</span>표시 됩니다.)
				 		</div>
				 	</div>
				 	<!-- footer -->
				 	<div class="modal-footer">
				 		<button type="button" class="btn btn-default" data-dismiss="modal">취소</button>
        				<button type="button" class="btn btn-primary" id="btn-insertSchedule">저장</button>
				 	</div>
				 </div>
			</div>
		</div>
	</div>
</body>
</html>
