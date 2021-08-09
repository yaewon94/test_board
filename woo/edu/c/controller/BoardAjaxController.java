package woo.edu.c.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import woo.edu.c.service.BoardService;
import woo.edu.c.vo.boardVo;

@Controller
public class BoardAjaxController
{
	@Inject
	private BoardService boardService;
	
	private static final Logger logger = LoggerFactory.getLogger(BoardAjaxController.class);
	
/*
 * 게시판 홈
 */
	@RequestMapping(value = "/board/boardhomeAjax")
	@ResponseBody
	public Map<String, Object> boardhome() throws SQLException{
		// 게시물 목록 가져오기
		List<boardVo> boardList = boardService.selectBoardList();
		if(boardList == null) {
			boardList = new ArrayList<boardVo>();
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardList", boardList);
		return map;
	}
	
/*
 * 게시물 작성
 */
	@RequestMapping(value = "/board/writeBoardAjax")
	@ResponseBody
	public Map<String, String> writeBoard(boardVo vo) throws SQLException{
		// 게시물 등록 처리
		boardService.updateBoard(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("result", "success");
		return map;
	}

/*
 * 게시물 상세 내용 가져오기
 */
	@RequestMapping(value = "/board/boardDetailAjax")
	@ResponseBody
	public Map<String, Object> boardDetail(@RequestParam int board_num) throws SQLException{
		// 게시물 정보 가져오기
		boardVo board = boardService.selectBoard(board_num);
		Map<String, Object> map = new HashMap<String, Object>();
		if(board == null) {
			map.put("result", "fail");
			return map;
		}
		map.put("board", board);
		return map;
	}
	
/*
 * 게시물 삭제
 */
	// 단일 게시물 삭제
	@RequestMapping(value = "/board/deleteBoardAjax")
	@ResponseBody
	public Map<String, String> deleteBoard(@RequestParam int board_num) throws SQLException{
		// 게시물 삭제 처리
		boardService.deleteBoard(board_num);
		Map<String, String> map = new HashMap<String, String>();
		map.put("result", "success");
		return map;
	}
	
	// 선택한 게시물 삭제
	@RequestMapping(value = "/board/deleteBoardsAjax")
	@ResponseBody
	public Map<String, String> deleteBoards(@RequestParam(value="boardNumArr[]") List<Integer> boardNumArr) throws SQLException{
		// 게시물 삭제 처리
		for(Integer val : boardNumArr) {
			boardService.deleteBoard(val);
		}
		Map<String, String> map = new HashMap<String, String>();
		map.put("result", "success");
		return map;
	}
}
