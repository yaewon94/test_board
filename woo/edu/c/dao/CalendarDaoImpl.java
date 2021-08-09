package woo.edu.c.dao;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;

import org.springframework.stereotype.Repository;

import woo.edu.c.vo.calendarVo;

@Repository
public class CalendarDaoImpl implements CalendarDao
{
	// mybatis
	@Inject
	private SqlSession sql;
	
	private static String namespace = "calendarMapper";
	
	// 해당 월의 스케줄이 있는 날짜들 가져오기
	@Override
	public List<Integer> selectDayList(calendarVo vo) {
		return sql.selectList(namespace + ".selectDayList", vo);
	}

	// 스케줄 리스트 가져오기
	@Override
	public List<calendarVo> selectScheduleList(calendarVo vo) {
		return sql.selectList(namespace + ".selectScheduleList", vo);
	}

	// 스케줄 등록
	@Override
	public void insertSchedule(calendarVo vo) {
		System.out.println("dao===="+vo);
		sql.insert(namespace + ".insertSchedule", vo);
	}

	// 스케줄 삭제
	@Override
	public void deleteSchedule(int calNo) {
		sql.delete(namespace + ".deleteSchedule", calNo);
	}
}
