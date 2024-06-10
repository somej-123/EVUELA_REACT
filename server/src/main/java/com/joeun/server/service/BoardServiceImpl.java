package com.joeun.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joeun.server.dto.Board;
import com.joeun.server.mapper.BoardMapper;

import java.util.List;


@Service
public class BoardServiceImpl implements BoardService{

    @Autowired
    BoardMapper boardMapper;

    @Override
    public List<Board> selectBoardList() throws Exception{
        return boardMapper.selectBoardList();
    }

    @Override
    public int insertBoardContents(Board boardContents) throws Exception{
        return boardMapper.insertBoardContents(boardContents);
    }

    @Override
    public int deleteBoardContents(Board boardIdx) throws Exception{
        return boardMapper.deleteBoardContents(boardIdx);
    }

    @Override
    public int modifyBoardContents(Board boardCoents) throws Exception{
        return boardMapper.modifyBoardContents(boardCoents);
    }
}
