package woo.edu.c.service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import woo.edu.c.dao.CalendarDao;
import woo.edu.c.vo.calendarVo;

@Service
public class CalendarServiceImpl implements CalendarService
{
	@Resource
	private CalendarDao calendarDao;
	
	// 해당 년월의 스케줄이 있는 날짜 가져오기
	@Override
	public List<Integer> selectDayList(calendarVo vo) {
		return calendarDao.selectDayList(vo);
	}

	// 해당 날짜의 스케줄 리스트 가져오기
	@Override
	public List<calendarVo> selectScheduleList(calendarVo vo) throws SQLException{
		return calendarDao.selectScheduleList(vo);
	}

	// 스케줄 등록
	@Override
	public void insertSchedule(calendarVo vo) throws SQLException {
		int calMonth = vo.getCalMonth();
		int calDay = vo.getCalDay();
		// 년-월-일-시간 스트링으로 변환 해서 calDate 필드에 추가
		String calDate = "";
		calDate += vo.getCalYear();
		// 월 : 8 => 08 형식으로 변환
		if(calMonth < 9) {
			calDate += "0" + (calMonth+1);
		}else {
			calDate += (calMonth+1);
		}
		// 일 : 1 => 01 형식으로 전환
		if(calDay < 10) {
			calDate += "0" + calDay;
		}else {
			calDate += calDay;
		}
		// 시간 : 12:34 => 1234 형식으로 변환
		calDate += vo.getCalTime().replace(":", "");
		vo.setCalDate(calDate);
		System.out.println("service======"+calDate);
		calendarDao.insertSchedule(vo);
	}

	// 스케줄 삭제
	@Override
	public void deleteSchedule(int calNo) throws SQLException {
		calendarDao.deleteSchedule(calNo);
	}
}
