package woo.edu.c.controller;

import java.sql.SQLException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import woo.edu.c.service.CalendarService;
import woo.edu.c.vo.calendarVo;

@Controller
public class CalendarController
{
	@Inject
	private CalendarService calendarService;
/*
 * calender.jsp 페이지 불러오기
 */
	@RequestMapping(value="/calendar")
	public String calender() {
		return "/calendar/calendar";
	}
	
/*
 * 날짜(년, 월 가져오기)
 */
	@RequestMapping(value="/calendar/getDateAjax")
	@ResponseBody
	public Map<String, Integer> getDate(@RequestParam int year, @RequestParam int month){
		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("year", year);
		map.put("month", month);
		return map;
	}
	
/*
 * 달력 변경 (년-월)
 */
	@RequestMapping(value="/calendar/getCalendarAjax")
	@ResponseBody
	public Map<String, String> getCalendar(@RequestParam int calYear, @RequestParam int calMonth){
		// month : 1월(0) ~ 12월(11)
		Calendar calendar = Calendar.getInstance();
		calendar.set(calYear, calMonth, 1);
		// 해당 월의 시작 요일 (일요일(1)~토요일(7))
		final int START_DAY_WEEK = calendar.get(Calendar.DAY_OF_WEEK);
		// 해당 월의 마지막 날짜
		final int LAST_DAY = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
		// 해당 월의 마지막 주
		calendar.set(calYear, calMonth, LAST_DAY);
		// 달력의 최대 행,열
		final int ROW = calendar.get(Calendar.WEEK_OF_MONTH);
		final int COLUMN = 7;
		// 해당 년월의 스케줄이 있는 날 리스트, 카운트용 리스트 인덱스
		calendarVo vo = new calendarVo();
		vo.setCalYear(calYear);
		vo.setCalMonth(calMonth);
		List<Integer> scheduleDayList = calendarService.selectDayList(vo);
		System.out.println("스케줄 있는 날짜 개수===="+scheduleDayList.size());
		int indexCount = 0;
		scheduleDayList.add(-1); // IndexOutOfBoundsException 방지
		// 날짜 카운트용 숫자
		int dayCount = 1;
		// html에 출력할 스트링
		String output = "";
		// loop
		for(int row=0; row<ROW; row++){
			output += "<tr>";
			for(int column=1; column<=COLUMN; column++){
				System.out.println("dayCount=="+dayCount+", indexCount"+indexCount);
				// 해당 월의 시작 요일부터 dayCount 출력 후 증가
				if(dayCount==1 && column == START_DAY_WEEK) {
					if(dayCount == scheduleDayList.get(indexCount)) {
						output += setBgrColor();
						indexCount++;
					}else {
						output += setBgrColor(column);
					}
					output += dayCount++;
				}
				else if(dayCount>1 && dayCount <= LAST_DAY){
					if(dayCount == scheduleDayList.get(indexCount)) {
						output += setBgrColor();
						indexCount++;
					}else {
						output += setBgrColor(column);
					}
					output += dayCount++;
				}
				else {
					output += "<td>";
				}
				output += "</td>";
			}
			output += "</tr>";
		}
		Map<String, String> map = new HashMap<String, String>();
		map.put("output", output);
		return map;
	}
	
/*
 * 스케줄 리스트 가져오기
 */
	@RequestMapping(value="/calendar/getScheduleListAjax")
	@ResponseBody
	public Map<String, String> getScheduleList(calendarVo vo){
		System.out.println("컨트롤러======"+vo);
		Map<String, String> map = new HashMap<String, String>();
		// 스케줄 리스트 가져오기
		try {
			List<calendarVo> scheduleList = calendarService.selectScheduleList(vo);
			// html 스트링 만들어서 리턴
			String output = "";
			for(calendarVo item : scheduleList) {
				output += "<tr>";
				output += 	"<td>" + item.getCalTime() + "</td>";
				output += 	"<td>" + item.getCalContents() + "</td>";
				if(item.getCalReq() == 1) {
					output += "<td style='color:red;'> ★ </td>";
				}else {
					output += "<td></td>";
				}
				output += 	"<td style='color:blue;' class='btn-deleteSchedule' data-num='" + item.getCalNo() + "'> x </td>";
				output += "</tr>";
				map.put("output", output);
			}
			System.out.println(output);
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return map;
	}
	
/*
 * 스케줄 등록
 */
	@RequestMapping(value="/calendar/insertScheduleAjax")
	@ResponseBody
	public Map<String, Boolean> insertSchedule(calendarVo vo){
		Map<String, Boolean> map = new HashMap<String, Boolean>();
		try {
			calendarService.insertSchedule(vo);
			map.put("result", true);
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return map;
	}
	
/*
 * 스케줄 삭제
 */
	@RequestMapping(value="/calendar/deleteScheduleAjax")
	@ResponseBody
	public Map<String, Boolean> deleteSchedule(@RequestParam int calNo){
		Map<String, Boolean> map = new HashMap<String, Boolean>();
		try {
			calendarService.deleteSchedule(calNo);
			map.put("result", true);
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return map;
	}
	
/*
 * 달력 토요일, 일요일 배경색 지정
 */
	private String setBgrColor() {
		// 스케줄 있는 날인 경우
		return "<td style='background-color:#2a9c44' class='btn-schedule'>";
	}
	
	private String setBgrColor(int dayWeek) {
		// 일요일
		if(dayWeek == 1) {
			return "<td style='background-color:#f5426f' class='btn-schedule'>";
		}
		// 토요일
		else if(dayWeek == 7) {
			return "<td style='background-color:#42a1f5' class='btn-schedule'>";
		}
		// 평일
		return "<td class='btn-schedule'>";
	}
}
