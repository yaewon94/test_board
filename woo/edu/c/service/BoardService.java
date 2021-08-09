package woo.edu.c.service;

import java.util.List;

import woo.edu.c.vo.boardVo;

public interface BoardService
{
	// 게시물 리스트 가져오기
	List<boardVo> selectBoardList();
	
	// 게시물 상세
	boardVo selectBoard(int board_num);
	
	// 게시물 작성, 수정
	void updateBoard(boardVo vo);
	
	// 게시물 삭제
	void deleteBoard(int board_num);
}
