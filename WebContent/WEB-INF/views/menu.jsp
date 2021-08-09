<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!-- jQuery (부트스트랩의 자바스크립트 플러그인을 위해 필요합니다) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<!-- 모든 컴파일된 플러그인을 포함합니다 (아래), 원하지 않는다면 필요한 각각의 파일을 포함하세요 -->
<script src="${pageContext.request.contextPath}/resources/js/bootstrap.min.js"></script>
<!-- 공용 파일 링크 -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/board.css">
<script src="//code.jquery.com/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/boardCss.js"></script>

<!-- html 부분 -->
<div id="layout-menu">
	<ul class="nav nav-tabs">
		<li role="presentation" class="home"><a href="${pageContext.request.contextPath}/">Home</a></li>
		<li role="presentation" class="board dropdown">
			<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
				게시판 <span class="caret"></span>
			</a>
			<ul class="dropdown-menu" role="menu">
				<li>
					<a href="${pageContext.request.contextPath}/board/boardhome">게시판 목록</a>
				</li>
				<li>
					<a href="${pageContext.request.contextPath}/board/boardhome2">게시판 목록 Ajax</a>
				</li>
			</ul>
		</li>
		<li role="presentation" class="jsTest dropdown">
			<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
				js테스트 <span class="caret"></span>
			</a>
			<ul class="dropdown-menu" role="menu">
				<li>
					<a href="${pageContext.request.contextPath}/jsTest/gugudan">구구단</a>
				</li>
				<li>
					<a href="${pageContext.request.contextPath}/jsTest/colorPicker">색상변경</a>
				</li>
				<li>
					<a href="${pageContext.request.contextPath}/jsTest/number">숫자</a>
				</li>
			</ul>
		</li>
		<li role="presentation" class="calc"><a href="${pageContext.request.contextPath}/calc">계산기</a></li>
		<li role="presentation" class="calendar"><a href="${pageContext.request.contextPath}/calendar">캘린더</a></li>
	</ul>
</div>