package woo.edu.c.dao;

import java.util.List;
import java.util.Map;

import woo.edu.c.vo.calendarVo;

public interface CalendarDao
{
	// 해당 월의 스케줄이 있는 날짜들 가져오기
	List<Integer> selectDayList(calendarVo vo);
	
	// 해당 날짜의 스케줄 리스트 가져오기
	List<calendarVo> selectScheduleList(calendarVo vo);
	
	// 스케줄 등록
	void insertSchedule(calendarVo vo);
	
	// 스케줄 삭제
	void deleteSchedule(int calNo);
}
