package woo.edu.c.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CalcController
{
	@RequestMapping(value = "/calc")
	public String calcPage() {
		return "/calc/calculator";
	}
	
	@RequestMapping(value = "/calc/calcAjax")
	@ResponseBody
	public Map<String, Double> calcResult(@RequestParam String output){
		System.out.println("data = " + output);
		// 숫자
		double num = 0;
		char operator = 0;
		// 결과값
		double result = 0;
		// Str => char[] 변환
		char[] charArr = output.toCharArray();
		// char 누적시켜서 만들 숫자 스트링
		String strValue = "";
		for(char c : charArr) {
			// 숫자char일 경우 계속 연결해서 숫자 스트링으로 만들기
			// if(!Double.isNaN(c) || c=='.') : char형인 c는 int값으로 변환 가능해서 무조건 isNaN(c) == false 나오게 됨
			// c 아스키코드 값
			if((c>47&&c<58) || c=='.'){
				strValue += c;
				System.out.println("strValue = " + strValue);
			}
			// 연산자일 경우
			else {
				// 그동안 누적시킨 숫자스트링 double값으로 변환
				num = Double.parseDouble(strValue);
				System.out.println("숫자스트링 변환 = " + num);
				// 값 스트링 초기화
				strValue = "";
				// 계산
				if(operator == 0) {
					result = num;
				}else {
					System.out.println("연산자 = " + (char)operator);
					result = calc(operator, result, num);
				}
				// 새로운 연산자 종류 대입
				operator = c;
			}
		}
		// 최종 결과
		num = Double.parseDouble(strValue);
		result = calc(operator, result, num);
		// map
		Map<String, Double> map = new HashMap<String, Double>();
		map.put("result", result);
		return map;
	}
	
	private double calc(char operator, double num1, double num2) {
		double result;
		switch(operator) {
			case '+' :
				result =  num1 + num2;
				break;
			case '-' :
				result =  num1 - num2;
				break;
			default :
				result =  num1 * num2;
		}
		System.out.println("num1=" + num1 + ", num2=" + num2 + ", operator=" + (char)operator + ", result=" + result);
		return result;
	}
}
