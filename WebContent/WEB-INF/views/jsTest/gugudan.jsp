<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 위 3개의 메타 태그는 *반드시* head 태그의 처음에 와야합니다; 어떤 다른 콘텐츠들은 반드시 이 태그들 *다음에* 와야 합니다 -->
    <title>구구단 테스트</title>
    <!-- 부트스트랩 -->
    <link href="${pageContext.request.contextPath}/resources/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
	<!-- include menu -->
	<jsp:include page="${pageContext.request.contextPath}/WEB-INF/views/menu.jsp" flush="true"/>
	<!-- 자바스크립트 include -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jsTest.js"></script>
	
	<div id="layout-body">
		<h1>구구단 테스트</h1>
		<select id="select-num">
			<option value="1">1단</option>
			<option value="2">2단</option>
			<option value="3">3단</option>
			<option value="4">4단</option>
			<option value="5">5단</option>
			<option value="6">6단</option>
			<option value="7">7단</option>
			<option value="8">8단</option>
			<option value="9">9단</option>
		</select>
		<input type="button" value="계산" onclick="gugudan();">
		<p id="output-gugudan"></p>
	</div>
</body>
