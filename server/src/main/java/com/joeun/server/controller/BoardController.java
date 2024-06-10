package com.joeun.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.joeun.server.dto.Board;
import com.joeun.server.service.BoardService;

import lombok.extern.slf4j.Slf4j;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@Slf4j
@RestController
@RequestMapping("/board")
public class BoardController {
    
    @Autowired
    private BoardService boardService;

    @GetMapping("/list")
    public ResponseEntity<?> boardList() throws Exception {

        List<Board> boardList = boardService.selectBoardList();

        // log.info("boardList : " + boardList.toString());
        
                // 인증된 사용자 정보 
        if( boardList != null )
            return new ResponseEntity<>(boardList, HttpStatus.OK);

        // 인증 되지 않음
        return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("createContents")
    public ResponseEntity<?> createContents(@RequestBody Board boardContent) throws Exception {

        log.info("test"+boardContent.toString());
        log.info("성공적인 통신");

        int successCode = boardService.insertBoardContents(boardContent);

        log.info(Integer.toString(successCode));

        return new ResponseEntity<>(successCode, HttpStatus.OK);
    }

    @PostMapping("removeContents")
    public ResponseEntity<?> removeContents(@RequestBody Board boardContent) throws Exception {

        log.info("성공적인 통신");
        log.info("test : " + boardContent.toString());

        int successCode = boardService.deleteBoardContents(boardContent);
        
        return new ResponseEntity<>(successCode, HttpStatus.OK);
    }

    @PostMapping("updateContents")
    public ResponseEntity<?> updateContents(@RequestBody Board boardContent) throws Exception {

        log.info("test"+boardContent.toString());
        log.info("성공적인 통신");

        int successCode = boardService.modifyBoardContents(boardContent);

        log.info(Integer.toString(successCode));

        return new ResponseEntity<>(successCode, HttpStatus.OK);
    }
    
    
    
    
}
