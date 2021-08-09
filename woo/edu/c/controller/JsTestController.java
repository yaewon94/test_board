package woo.edu.c.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class JsTestController
{
/*
 * 구구단 테스트
 */
	@RequestMapping(value = "/jsTest/gugudan")
	public String gugudan() {
		return "/jsTest/gugudan";
	}
	
	@RequestMapping(value = "/jsTest/gugudanAjax")
	@ResponseBody
	public Map<String, Object> gugudanResult(@RequestParam int num) {
		Map<String, Object> map = new HashMap<String, Object>();
		int[] result = new int[9];
		for(int i=0; i<9; i++) {
			result[i] = num * (i+1);
		}
		map.put("result", result);
		return map;
	}
	
/*
 * 색상 변경
 */
	@RequestMapping(value = "/jsTest/colorPicker")
	public String colorPicker() {
		return "/jsTest/colorPicker";
	}
	
	@RequestMapping(value = "/jsTest/colorPickerAjax")
	@ResponseBody
	public Map<String, Object> colorResult(@RequestParam int index, @RequestParam String colorIndex) {
		Map<String, Object> map = new HashMap<String, Object>();
		// 선택한 색상이 없을 경우
		if(colorIndex == "") {
			map.put("result", "fail");
			return map;
		}
		// 색상 결정
		int color = Integer.parseInt(colorIndex);
		switch(color)
		{
			case 0 :
				map.put("color", "red");
				break;
			case 1 :
				map.put("color", "blue");
				break;
			case 2 :
				map.put("color", "yellow");
				break;
			default :
				map.put("color", "green");
		}
		return map;
	}
	
/*
 * 숫자 입력
 */
	@RequestMapping(value = "/jsTest/number")
	public String drawNumber() {
		return "/jsTest/number";
	}	
}
