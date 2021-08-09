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
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import woo.edu.c.service.BoardService;
import woo.edu.c.vo.boardVo;

@Controller
public class BoardController
{
	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
	
	@Inject
	private BoardService boardService;
	
/*
 * 게시판 홈
 */
	@RequestMapping(value = "/board/boardhome")
	public ModelAndView boardhome() throws SQLException{
		// 게시물 목록 가져오기
		List<boardVo> boardList = boardService.selectBoardList();
		if(boardList == null) {
			boardList = new ArrayList<boardVo>();
		}
		// jsp에 정보 넘기기
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/board/boardhome");
		mav.addObject("boardList", boardList);
		return mav;
	}
	
	@RequestMapping(value="/board/boardhome2")
	public String boardhome2() {
		return "/board/boardhome2";
	}
	
/*
 * 게시물 쓰기
 */
	@RequestMapping(value="/board/write", method=RequestMethod.GET)
	public String boardWriteForm() {
		return "/board/write";
	}
	
	@RequestMapping(value="/board/write", method=RequestMethod.POST)
	public ModelAndView boardWriteSubmit(boardVo boardVo) throws SQLException{
		// 게시물 등록 처리
		boardService.updateBoard(boardVo);
		// 게시물 홈으로 이동
		return boardhome();
	}
	
/*
 * 게시물 상세
 */
	@RequestMapping(value="/board/detail")
	public String boardDetail(@RequestParam int board_num, Model model) throws SQLException{
		// 게시물 정보 가져오기
		boardVo board = boardService.selectBoard(board_num);
		model.addAttribute("board", board);
		return "/board/detail";
	}
	
/*
 * 게시물 수정
 */
	@RequestMapping(value="/board/modify", method=RequestMethod.GET)
	public String boardModifyForm(@RequestParam int board_num, Model model) throws SQLException{
		// 해당 번호의 게시물 정보 가져오기
		boardVo board = boardService.selectBoard(board_num);
		model.addAttribute("board", board);
		// 수정 폼 jsp 호출
		return "/board/modify";
	}
	
	@RequestMapping(value="/board/modify", method=RequestMethod.POST)
	public ModelAndView boardModifySubmit(boardVo boardVo) throws SQLException{
		// 게시물 수정 처리
		boardService.updateBoard(boardVo);
		// 게시물 홈으로 이동
		return boardhome();
	}
	
/*
 * 게시물 삭제
 */
	@RequestMapping(value="/board/delete")
	public ModelAndView boardDelete(@RequestParam int board_num) throws SQLException{
		// 게시물 삭제 처리
		boardService.deleteBoard(board_num);
		// 게시물 홈으로 이동
		return boardhome();
	}
}
