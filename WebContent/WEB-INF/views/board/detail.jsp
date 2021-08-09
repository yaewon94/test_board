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
</head>

<body>
	<!-- include menu -->
	<jsp:include page="${pageContext.request.contextPath}/WEB-INF/views/menu.jsp" flush="true"/>
	
	<!-- board detail -->
	<div id="layout-body">
		<ul id="board-detail">
			<li>
				<h1>게시글 상세</h1>
			</li>
			<li>
				<span>번호 </span>
				${board.board_num}
			</li>
			<li>
				<span>제목 </span>
				${board.board_title}
			</li>
			<li>
				<span>작성자 </span>
				${board.board_writer}
			</li>
			<li>
				<span>내용 </span>
				<p>
					${board.board_content}
				</p>
			</li>
			<li>
				<button type="button" class="btn btn-info" onclick="location.href='modify?board_num=${board.board_num}'">수정</button>
				<button type="button" class="btn btn-danger" onclick="location.href='delete?board_num=${board.board_num}'">삭제</button>
				<button type="button" class="btn btn-primary" onclick="location.href='boardhome'">목록</button>
			</li>
		</ul>
	</div>
</body>
</html>