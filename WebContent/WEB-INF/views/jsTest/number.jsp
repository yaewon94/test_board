<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 위 3개의 메타 태그는 *반드시* head 태그의 처음에 와야합니다; 어떤 다른 콘텐츠들은 반드시 이 태그들 *다음에* 와야 합니다 -->
    <title>숫자</title>
    <!-- 부트스트랩 -->
    <link href="${pageContext.request.contextPath}/resources/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
	<!-- include menu -->
	<jsp:include page="${pageContext.request.contextPath}/WEB-INF/views/menu.jsp" flush="true"/>
	<!-- 자바스크립트 include -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jsTest.js"></script>
	
	<div id="layout-body">
		<input type="number" id="num">
		<input type="button" value="선택" onclick="drawNumber();">
		<div id="output-number"></div>
	</div>
</body>
</html>
