<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 위 3개의 메타 태그는 *반드시* head 태그의 처음에 와야합니다; 어떤 다른 콘텐츠들은 반드시 이 태그들 *다음에* 와야 합니다 -->
    <title>계산기</title>
    <!-- 부트스트랩 -->
    <link href="${pageContext.request.contextPath}/resources/css/bootstrap.min.css" rel="stylesheet">
    <!-- css -->
    <style type="text/css">
    	table tr td{
    		width:25%;
    	}
    	button{
    		text-align:left;
    		width:100%; height:100%;
    		transition-duration:0.1s;
    		border:0;
    		background-color:transparent;
    	}
    	button:active{
    		background-color:gray;
    	}
    	#display-calc{
    		text-align:right;
    	}
    </style>
</head>

<body>
	<!-- include menu -->
	<jsp:include page="${pageContext.request.contextPath}/WEB-INF/views/menu.jsp" flush="true"/>
	<!-- 자바스크립트 -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/calc.js"></script>
	
	<div id="layout-body">
		<h1>계산기</h1>
		<div>
			<input type="text" class="form-control" id="display-calc" readonly>
		</div>
		<table class="table table-bordered">
			<tr>
				<td><button class="num">7</button></td>
				<td><button class="num">8</button></td>
				<td><button class="num">9</button></td>
				<td><button class="btn-operator">*</button></td>
			</tr>
			<tr>
				<td><button class="num">4</button></td>
				<td><button class="num">5</button></td>
				<td><button class="num">6</button></td>
				<td><button class="btn-operator">-</button></td>
			</tr>
			<tr>
				<td><button class="num">1</button></td>
				<td><button class="num">2</button></td>
				<td><button class="num">3</button></td>
				<td><button class="btn-operator">+</button></td>
			</tr>
			<tr>
				<td><button id="btn-delete">Del</button></td>
				<td><button class="num">0</button></td>
				<td><button class="num">.</button></td>
				<td><button id="btn-result">=</button></td>
			</tr>
		</table>
	</div>
</body>
</html>
