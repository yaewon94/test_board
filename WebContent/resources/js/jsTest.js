/*
 * 구구단 계산
 */
function gugudan(){
	// 결과 html 초기화
	$('#output-gugudan').empty();
	// 선택 값 받아오기
	var num = $('#select-num').val();
	// ajax
	$.ajax({
		type:'get',
		data:{num:num},
		url:'gugudanAjax',
		dataType:'json',
		cache:false,
		timeout:30000,
		success:function(data){
			var list = data.result;
			var output = '';
			$(list).each(function(index,item){
				output += num + " * " + (index+1) + " = " + item + "<br>";
			});
			$('#output-gugudan').append(output);
		},
		error:function(){
			alert('네트워크 오류');
		}
	});
}

/*
 * 색상 변경
 */
function colorPicker(){
	// 선택 값 받아오기
	var index = $('#select-index').val();
	var colorIndex = $('#select-color').val();
	// ajax
	$.ajax({
		type:'get',
		data:{index:index, colorIndex:colorIndex},
		url:'colorPickerAjax',
		dataType:'json',
		cache:false,
		timeout:30000,
		success:function(data){
			if(data.result == 'fail'){
				alert('변경할 색상을 선택해 주세요.');
			}else{
				// 색상 초기화
				$('#result-color').children().removeAttr('style');
				// 전체 선택
				if(index == 0){
					$('li[data-num]').attr('style', 'color:' + data.color);
				}
				// 각 색상 선택
				else{
					$('li[data-num=' + index + ']').attr('style', 'color:' + data.color);
				}
			}
		},
		error:function(){
			alert('네트워크 오류');
		}
	});
}

/*
 * 숫자
 */
function drawNumber(){
	// 입력한 숫자 값 받아오기
	var num = $('#num').val();
	$('#output-number').empty();
	// 테이블 줄 수
	var row = 0; 
	// 숫자 0이 아닌 경우
	if(num != 0){
//		row = (num/4);
//		var output = '';
//		output += '<table style="border:1px solid black">';
//		for(var i=0; i<row; i++){
//			output += '<tr>';
//			for(var j=1; j<=4; j++){
//				if((4*i + j) > num){
//					output += '<td> x	</td>';
//				}else{
//					output += '<td> ' + (4*i + j) + '	</td>';
//				}
//			}
//			output += '</tr>';
//		}
		row = (num/4) + 1;
		var output = '';
		output += '<table style="border:1px solid black">';
		for(var i=1; i<(row*4); i++){
			if(i%4 == 1) output += '<tr>';
			if(i > num){
				output += '<td> x </td>';
			}else{
				output += '<td> ' +  i  + ' </td>';
			}
			if(i%4 == 0) output += '</tr>';
		}
		output += '</table>';
		$('#output-number').append(output);
	}
}
