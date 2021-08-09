<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 위 3개의 메타 태그는 *반드시* head 태그의 처음에 와야합니다; 어떤 다른 콘텐츠들은 반드시 이 태그들 *다음에* 와야 합니다 -->
    <title>색상변경</title>
    <!-- 부트스트랩 -->
    <link href="${pageContext.request.contextPath}/resources/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
	<!-- include menu -->
	<jsp:include page="${pageContext.request.contextPath}/WEB-INF/views/menu.jsp" flush="true"/>
	<!-- 자바스크립트 include -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jsTest.js"></script>
	
	<div id="layout-body">
		<h1>색상변경</h1>
		<div>
			<ul id="result-color">
				<li data-num="1">첫번째</li>
				<li data-num="2">두번째</li>
				<li data-num="3">세번째</li>
				<li data-num="4">네번째</li>
			</ul>
		</div>
		<select id="select-index">
			<option value="0">전체</option>
			<option value="1">첫번째</option>
			<option value="2">두번째</option>
			<option value="3">세번째</option>
			<option value="4">네번째</option>
		</select>
		<select id="select-color">
			<option value="">선택</option>
			<option value="0">빨강</option>
			<option value="1">파랑</option>
			<option value="2">노랑</option>
			<option value="3">초록</option>
		</select>
		<input type="button" value="변경" onclick="colorPicker();">
	</div>
</body>
</html>
