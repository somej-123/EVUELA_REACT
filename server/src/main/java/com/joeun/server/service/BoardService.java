package com.joeun.server.service;
import java.util.List;

import com.joeun.server.dto.Board;

public interface BoardService {
    public List<Board> selectBoardList() throws Exception;

    public int insertBoardContents(Board boardContents) throws Exception;

    public int deleteBoardContents(Board boardIdx) throws Exception;

    public int modifyBoardContents(Board boardContents) throws Exception;
}
