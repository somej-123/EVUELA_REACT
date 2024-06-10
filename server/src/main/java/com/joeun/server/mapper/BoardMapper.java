package com.joeun.server.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.joeun.server.dto.Board;

import java.util.List;

@Mapper
public interface BoardMapper {
    public List<Board> selectBoardList() throws Exception;

    public int insertBoardContents(Board boardContents) throws Exception;

    public int deleteBoardContents(Board boardIdx) throws Exception;

    public int modifyBoardContents(Board BoardContents) throws Exception;
}
