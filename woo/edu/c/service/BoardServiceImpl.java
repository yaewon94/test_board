package woo.edu.c.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import woo.edu.c.dao.BoardDao;
import woo.edu.c.vo.boardVo;

@Service
public class BoardServiceImpl implements BoardService
{
	@Resource
	private BoardDao boardDao;

	// 게시물 리스트 가져오기
	@Override
	public List<boardVo> selectBoardList(){
		return boardDao.selectBoardList();
	}
	
	// 게시물 상세
	@Override
	public boardVo selectBoard(int board_num) {
		return boardDao.selectBoard(board_num);
	}
	
	// 게시물 작성, 수정
	@Override
	public void updateBoard(boardVo vo) {
		boardDao.updateBoard(vo);
	}
	
	// 게시물 삭제
	@Override
	public void deleteBoard(int board_num) {
		boardDao.deleteBoard(board_num);
	}
}
