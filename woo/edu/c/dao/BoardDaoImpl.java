package woo.edu.c.dao;

import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;

import org.springframework.stereotype.Repository;

import woo.edu.c.vo.boardVo;

@Repository
public class BoardDaoImpl implements BoardDao
{
	// mybatis
	@Inject
	private SqlSession sql;
	
	private static String namespace = "boardMapper";

	// 게시물 리스트 가져오기
	@Override
	public List<boardVo> selectBoardList(){
		return sql.selectList(namespace + ".selectBoardList");
	}
	
	// 게시물 상세
	@Override
	public boardVo selectBoard(int board_num) {
		return sql.selectOne(namespace + ".selectBoard", board_num);
	}
	
	// 게시물 작성,수정
	@Override
	public void updateBoard(boardVo vo) {
		sql.update(namespace + ".updateBoard", vo);
	}
	
	// 게시물 삭제
	@Override
	public void deleteBoard(int board_num) {
		sql.delete(namespace + ".deleteBoard", board_num);
	}
}
