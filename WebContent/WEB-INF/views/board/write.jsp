<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 위 3개의 메타 태그는 *반드시* head 태그의 처음에 와야합니다; 어떤 다른 콘텐츠들은 반드시 이 태그들 *다음에* 와야 합니다 -->
    <title>우리 ICT - 게시판</title>
    <!-- 부트스트랩 -->
    <link href="${pageContext.request.contextPath}/resources/css/bootstrap.min.css" rel="stylesheet">
    <!-- 자바스크립트 -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/board.js"></script>
</head>

<body>
	<!-- include menu -->
	<jsp:include page="${pageContext.request.contextPath}/WEB-INF/views/menu.jsp" flush="true"/>
	
	<!-- board write -->
	<div id="layout-body">	
		<form action="write" method="post" id="form_board">
			<h1>게시글 작성</h1>
			<div class="form-group">
    			<label for="board_title">제목</label>
    			<input type="text" class="form-control" placeholder="제목을 입력하세요." id="board_title" name="board_title">
 			</div>
 			<div class="form-group">
    			<label for="board_writer">작성자</label>
    			<input type="text" class="form-control" placeholder="작성자를 입력하세요." id="board_writer" name="board_writer">
 			</div>
 			<div class="form-group">
    			<label for="board_content">내용</label>
    			<div>
    				<textarea class="form-control" rows="3" placeholder="내용을 입력하세요." id="board_content" name="board_content"></textarea>
    			</div>
 			</div>
 			<button type="submit" class="btn btn-info">작성</button>
 			<button type="button" class="btn btn-primary" onclick="location.href='boardhome'">목록</button>
		</form>
	</div>
</body>
</html>