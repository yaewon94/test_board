$(document).ready(function(){
/*
 * 전역변수
 */
	// 출력 용도
	var output = $('#display-calc').val();
	// 입력된 숫자 값 스트링
	var strValue = '';
	// = 을 사용했는지 여부
	var isUsedEqual = false;
	
/*
 * 숫자 클릭 이벤트 리스너 추가
 */
	var numArr = $('[class="num"]');
	$(numArr).each(function(index,item){
		$(item).click(function(){
			// = 을 누른 직후
			if(isUsedEqual){
				output = '';
				isUsedEqual = false;
			}
			// 선택한 숫자 또는 소수점
			var num = $(item).text();
			// 입력된 값들의 마지막 문자
			var lastChar = output.charAt(output.length-1);
			// 소수점 존재 여부
			var hasDecimalPoint = strValue.indexOf('.');
			// 이상한 입력 방지
			// 1) 05 이런 식으로 입력되었을 경우 05=>5 로 변환하여 출력
			if(lastChar==0 && num!='.' && strValue==0 && hasDecimalPoint==-1){
				output = output.slice(0, -1);
			}
			// 2) 소수점 두 번 이상 입력되지 않게 방지 ex)0.532.555
			if(num == '.' && hasDecimalPoint!=-1){
				return;
			}
			strValue += num;
			output += num;
			$('#display-calc').val(output);
		});
	});
	
/*
 * 뒤에서부터 한 글자씩 지우기
 */
	$('#btn-delete').click(function(){
		output = output.slice(0, -1);
		$('#display-calc').val(output);
	});
	
/*
 * 연산 기호 클릭
 */
	$('.btn-operator').click(function(){
		// 앞에 숫자가 있을 경우만 연산자가 입력되게 함
		var lastChar = output.charAt(output.length-1);
		console.log("lastChar=" + lastChar);
		if(output!='' && !isNaN(lastChar)){
			// 마지막 문자가 0.90 이런 형식인 경우 0을 지워서 0.9 로 만듦
			if(strValue.indexOf(lastChar)!=-1 && lastChar==0){
				output = output.slice(0, -1);
			}
			// 입력된 숫자 값 스트링 초기화
			strValue = '';
			output += $(this).text();
			console.log("연산자=" + $(this).text());
			console.log("output=" + output);
			$('#display-calc').val(output);
		}
	});
	
/*
 * 결과 출력
 */
	$('#btn-result').click(function(){
		$.ajax({
			type:'get',
			data:{output:output},
			url:'/calc/calcAjax',
			dataType:'json',
			cache:false,
			timeout:30000,
			success:function(data){
				$('#display-calc').val(data.result);
				isUsedEqual = true;
			},
			error:function(){
				alert('네트워크 오류');
			}
		});
	});
});
