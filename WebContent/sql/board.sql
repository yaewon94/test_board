CREATE TABLE BOARD(
	BOARD_NUM NUMBER PRIMARY KEY,
	BOARD_TITLE VARCHAR(2) NOT NULL,
	BOARD_WRITER VARCHAR(2) NOT NULL,
	BOARD_CONTENT CLOB NOT NULL,
	BOARD_DATE DATE DEFAULT SYSDATE NOT NULL
);

CREATE SEQUENCE BOARD_SEQ;

COMMENT ON COLUMN BOARD.BOARD_NUM IS '번호';
COMMENT ON COLUMN BOARD.BOARD_TITLE IS '제목';
COMMENT ON COLUMN BOARD.BOARD_WRITER IS '작성자';
COMMENT ON COLUMN BOARD.BOARD_CONTENT IS '내용';
COMMENT ON COLUMN BOARD.BOARD_DATE IS '작성날짜';