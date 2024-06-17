package com.joeun.server.dto;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class Board {
    
    private int boardIdx;
    private String title;
    private String contents;
    private int hitCnt;
    private String creatorId;
    private String createdDatetime;
    private String updaterId;
    private String deletedYn;
}